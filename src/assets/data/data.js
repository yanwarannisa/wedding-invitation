export const data = {
  bride: {
    L: {
      id: 1,
      name: 'Yanwar Sarip, S.Kom.',
      child: 'Putra pertama',
      father: 'Abdurahmat (Almarhum)',
      mother: 'Yuyun Yuningsih',
      image: './src/assets/images/cowo.png',
    },
    P: {
      id: 2,
      name: 'Annisa Zulaikha Hayatin, A.Md.Keb.',
      child: 'Putri pertama',
      father: 'Enon Saepudinm (Almarhum)',
      mother: 'Enik Nurjanah',
      image: './src/assets/images/cewe.png',
    },

    couple: './src/assets/images/couple.png',
  },

  time: {
    marriage: {
      year: '2025',
      month: 'Juni',
      date: '29',
      day: 'Ahad',
      hours: {
        start: '08.00',
        finish: 'Selesai',
      },
    },
    reception: {
      year: '2025',
      month: 'Juni',
      date: '29',
      day: 'Ahad',
      hours: {
        start: '11.00',
        finish: 'Selesai',
      },
    },
    address:
      'Kp. Sudimara RT 003 RW 004 Desa Sukaratu Kec. Sukaresik Kab. Tasikmalaya, Jawa Barat',
  },

  link: {
    calendar: 'https://calendar.app.google/RpCMvhgH2wF1eGLa7',
    map: 'https://maps.app.goo.gl/ytWeHWdYpw3MALFZ6',
  },

  galeri: [
    {
      id: 1,
      image: './src/assets/images/1.png',
    },
    {
      id: 2,
      image: './src/assets/images/2.png',
    },
    {
      id: 3,
      image: './src/assets/images/3.png',
    },
    {
      id: 4,
      image: './src/assets/images/4.png',
    },
    {
      id: 5,
      image: './src/assets/images/5.png',
    },
  ],

  bank: [
    {
      id: 1,
      name: 'Lorem Ipsum',
      icon: './src/assets/images/bca.png',
      rekening: '12345678',
    },
    {
      id: 2,
      name: 'Ipsum Lorem',
      icon: './src/assets/images/bri.png',
      rekening: '12345678',
    },
  ],

  audio: './src/assets/audio/wedding.mp3',

  api: 'https://script.google.com/macros/s/AKfycbxLIzIm8eAVw2KhvFpOU30KckjOaZM6fxKvixBvWRAn90j2epUBOU48WppDSZKY_7hi/exec',

  navbar: [
    {
      id: 1,
      teks: 'Home',
      icon: 'bx bxs-home-heart',
      path: '#home',
    },
    {
      id: 2,
      teks: 'Mempelai',
      icon: 'bx bxs-group',
      path: '#bride',
    },
    {
      id: 3,
      teks: 'Tanggal',
      icon: 'bx bxs-calendar-check',
      path: '#time',
    },
    // {
    //   id: 4,
    //   teks: 'Galeri',
    //   icon: 'bx bxs-photo-album',
    //   path: '#galeri',
    // },
    {
      id: 5,
      teks: 'Ucapan',
      icon: 'bx bxs-message-rounded-dots',
      path: '#wishas',
    },
  ],
};
