const api = 'http://localhost:3001';
const token = 'niquepa';

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
    // .catch((error) => { console.log(`ERROR: ${error.message}`); });
