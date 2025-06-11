import { data } from '../assets/data/data.js';

export const comentarService = {
  getComentar: async function () {
    try {
      const response = await fetch(
        'https://api.baserow.io/api/database/rows/table/569723/?user_field_names=true',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${data.baserowToken}`,
          },
        }
      );
      const result = await response.json();
      // Baserow mengembalikan data dalam properti 'results'
      return { comentar: result.results || [] };
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
            comment_id: id,
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
