import {
  formattedDate,
  formattedName,
  generateRandomColor,
  generateRandomId,
  getCurrentDateTime,
  renderElement,
} from '../utils/helper.js';
import { data } from '../assets/data/data.js';
import { comentarService } from '../services/comentarService.js';

export const wishas = () => {
  const wishasContainer = document.querySelector('.wishas');
  const [_, form] = wishasContainer.children[2].children;
  const [peopleComentar, ___, containerComentar] =
    wishasContainer.children[3].children;
  const buttonForm = form.children[6];
  const pageNumber = wishasContainer.querySelector('.page-number');
  const [prevButton, nextButton] = wishasContainer.querySelectorAll(
    '.button-grup button'
  );

  const listItemBank = (data) =>
    `  <figure data-aos="zoom-in" data-aos-duration="1000">
                <img src=${data.icon} alt="bank icon animation">
                <figcaption>No. Rekening ${data.rekening.slice(
                  0,
                  4
                )}xxxx <br>A.n ${data.name}</figcaption>
                <button data-rekening=${
                  data.rekening
                } aria-label="copy rekening">Salin No. Rekening</button>
           </figure>`;

  const initialBank = () => {
    const wishasBank = wishasContainer.children[1];
    const [_, __, containerBank] = wishasBank.children;

    renderElement(data.bank, containerBank, listItemBank);

    containerBank.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', async (e) => {
        const rekening = e.target.dataset.rekening;
        try {
          await navigator.clipboard.writeText(rekening);
          button.textContent = 'Berhasil menyalin';
        } catch (error) {
          console.log(`Error : ${error.message}`);
        } finally {
          setTimeout(() => {
            button.textContent = 'Salin No. Rekening';
          }, 2000);
        }
      });
    });
  };

  const listItemComentar = (data) => {
    const name = formattedName(data.name); // Pastikan fungsi formattedName tersedia
    const newDate = formattedDate(data.date); // Pastikan fungsi formattedDate tersedia
    let date = '';
    if (newDate.days < 1) {
      if (newDate.hours < 1) {
        date = `${newDate.minutes} menit yang lalu`;
      } else {
        date = `${newDate.hours} jam, ${newDate.minutes} menit yang lalu`;
      }
    } else {
      date = `${newDate.days} hari, ${newDate.hours} jam yang lalu`;
    }
    return ` <li data-aos="zoom-in" data-aos-duration="1000">
                 <div style="background-color: ${data.color}">${data.name
      .charAt(0)
      .toUpperCase()}</div>
                 <div>
                     <h4>${name}</h4>
                     <p>${date} <br>${data.status}</p>
                     <p>${data.message}</p>
                 </div>
             </li>`;
  };
  // Variabel global untuk pagination
  let currentPage = 1;
  let itemsPerPage = 4; // Jumlah row per halaman
  let totalCount = 0;
  // Fungsi untuk memperbarui konten halaman berdasarkan pagination
  const updatePageContent = async () => {
    containerComentar.innerHTML =
      '<h1 style="font-size: 1rem; margin: auto">Loading...</h1>'; // Pastikan containerComentar terdefinisi
    pageNumber.textContent = '..'; // Pastikan pageNumber terdefinisi
    prevButton.disabled = true; // Pastikan prevButton terdefinisi
    nextButton.disabled = true; // Pastikan nextButton terdefinisi
    try {
      const response = await comentarService.getComentar(
        currentPage,
        itemsPerPage
      );
      const { comentar, count, next, previous } = response;
      totalCount = count; // Total data dari Baserow
      comentar.reverse(); // Membalik urutan data (terbaru di atas)
      renderElement(comentar, containerComentar, listItemComentar); // Pastikan renderElement terdefinisi
      pageNumber.textContent = currentPage.toString();
      // Nonaktifkan tombol berdasarkan keberadaan next/previous
      prevButton.disabled = previous === null;
      nextButton.disabled = next === null;
    } catch (error) {
      console.error('Error updating page:', error);
      containerComentar.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  };
  // Event listener untuk tombol Next
  nextButton.addEventListener('click', async () => {
    currentPage++; // Pindah ke halaman berikutnya
    await updatePageContent();
  });
  // Event listener untuk tombol Previous
  prevButton.addEventListener('click', async () => {
    currentPage--; // Pindah ke halaman sebelumnya
    await updatePageContent();
  });
  // Fungsi untuk inisialisasi tampilan komentar
  const initialComentar = async () => {
    containerComentar.innerHTML = `<h1 style="font-size: 1rem; margin: auto">Loading...</h1>`;
    peopleComentar.textContent = '...'; // Pastikan peopleComentar terdefinisi
    pageNumber.textContent = '..';
    try {
      const response = await comentarService.getComentar(
        currentPage,
        itemsPerPage
      );
      const { comentar, count, next, previous } = response;
      totalCount = count; // Total data dari Baserow
      comentar.reverse(); // Membalik urutan data
      if (totalCount > 0) {
        peopleComentar.textContent = `${totalCount} Orang telah mengucapkan`;
      } else {
        peopleComentar.textContent = `Belum ada yang mengucapkan`;
      }
      pageNumber.textContent = currentPage.toString();
      renderElement(comentar, containerComentar, listItemComentar);
      // Nonaktifkan tombol berdasarkan keberadaan next/previous
      prevButton.disabled = previous === null;
      nextButton.disabled = next === null;
    } catch (error) {
      console.error('Error initializing comments:', error);
      containerComentar.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  };
  // Event listener untuk submit form
  form.addEventListener('submit', async (e) => {
    // Pastikan form terdefinisi
    e.preventDefault();
    buttonForm.textContent = 'Loading...'; // Pastikan buttonForm terdefinisi
    const comentar = {
      id: generateRandomId(), // Pastikan fungsi generateRandomId tersedia
      name: e.target.name.value,
      status: e.target.status.value === 'y' ? 'Hadir' : 'Tidak Hadir',
      message: e.target.message.value,
      date: getCurrentDateTime(), // Pastikan fungsi getCurrentDateTime tersedia
      color: generateRandomColor(), // Pastikan fungsi generateRandomColor tersedia
    };
    try {
      await comentarService.addComentar(comentar);
      currentPage = 1; // Kembali ke halaman pertama untuk menampilkan komentar terbaru
      await updatePageContent();
      peopleComentar.textContent = `${totalCount} Orang telah mengucapkan`;
    } catch (error) {
      console.error('Error adding comment:', error);
      alert(`Error: ${error.message}`);
    } finally {
      buttonForm.textContent = 'Kirim';
      form.reset();
    }
  });
  // Inisialisasi awal
  initialComentar().then();
  initialBank();
};
