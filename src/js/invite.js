// Pastikan invite.js terhubung dengan file invite.html

// Referensi elemen DOM
const invitationForm = document.getElementById('invitationForm');
const namaTamuInput = document.getElementById('namaTamu');
const nomorWAInput = document.getElementById('nomorWA');
const templatePesanTxt = document.getElementById('templatePesan');
const btnCopyLink = document.getElementById('btnCopyLink');
const btnKirimWA = document.getElementById('btnKirimWA');
const feedbackPara = document.getElementById('feedback');

// Base URL
const BASE_URL = 'https://yanwarannisa.github.io/wedding-invitation/?send=';

function generateLink(namaTamu) {
  // Encode nama tamu dengan base64
  const encodedName = btoa(namaTamu.trim());
  return BASE_URL + encodedName;
}

function copyToClipboard(text) {
  // Buat elemen textarea sementara untuk copy
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
}

btnCopyLink.addEventListener('click', () => {
  const namaTamu = namaTamuInput.value.trim();
  if (!namaTamu) {
    feedbackPara.innerText = 'Nama Tamu Undangan wajib diisi.';
    return;
  }
  const link = generateLink(namaTamu);
  copyToClipboard(link);
  feedbackPara.innerText = 'Link berhasil disalin!';
});

btnKirimWA.addEventListener('click', () => {
  const namaTamu = namaTamuInput.value.trim();
  if (!namaTamu) {
    feedbackPara.innerText = 'Nama Tamu Undangan wajib diisi.';
    return;
  }

  // Buat link undangan
  const linkUndangan = generateLink(namaTamu);

  // Dapatkan template pesan dan gantikan placeholder {link} dengan link undangan
  let templatePesan = templatePesanTxt.value;
  templatePesan = templatePesan.replace('{link}', linkUndangan);
  templatePesan = templatePesan.replace('{invited_guests}', namaTamu);

  // Nomor WA opsional
  let nomorWA = nomorWAInput.value.trim();
  if (nomorWA && !nomorWA.startsWith('62')) {
    // Jika tidak dimulai dengan '62', hapus nol di depan lalu tambahkan '62'
    nomorWA = nomorWA.replace(/^0/, '');
    nomorWA = '62' + nomorWA;
  }

  const formattedMsg = encodeURIComponent(templatePesan);

  // Buat link untuk WhatsApp
  let waURL = 'https://wa.me/';
  if (nomorWA) {
    waURL += nomorWA + '?text=' + formattedMsg;
  } else {
    // Jika Nomor WA kosong, arahkan ke WhatsApp "umum"
    waURL += '?text=' + formattedMsg;
  }

  window.open(waURL, '_blank');
  feedbackPara.innerText = 'Sedang menuju WhatsApp...';

  setTimeout(() => {
    feedbackPara.innerText = '';
  }, 3000);
});
