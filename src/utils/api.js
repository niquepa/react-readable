const api = 'http://localhost:3001';
const token = 'niquepa';

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const fetchCategories = () => (
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
);

export const fetchPosts = () => (
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
);

export const fetchComments = postId => (
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
);
