import { data } from '../assets/data/data.js';

export const comentarService = {
  getComentar: async function (page = 1, size = 4) {
    try {
      const response = await fetch(
        `https://api.baserow.io/api/database/rows/table/569723/?user_field_names=true&page=${page}&size=${size}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${data.baserowToken}`,
          },
        }
      );
      const result = await response.json();
      return {
        comentar: result.results || [], // Data komentar dari hasil
        count: result.count || 0, // Total jumlah data
        next: result.next || null, // URL halaman berikutnya (jika ada)
        previous: result.previous || null, // URL halaman sebelumnya (jika ada)
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { error: error?.message };
    }
  },

  addComentar: async function ({ id, name, status, message, date, color }) {
    try {
      const response = await fetch(
        'https://api.baserow.io/api/database/rows/table/569723/?user_field_names=true',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${data.baserowToken}`,
          },
          body: JSON.stringify({
            comment_id: id, // Sesuaikan dengan nama kolom di Baserow
            name: name,
            status: status,
            message: message,
            date: date,
            color: color,
          }),
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Post error:', error);
      return { error: error.message };
    }
  },
};
