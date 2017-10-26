const api = 'http://localhost:3001';
const token = 'niquepa';

const headers = {
  'Content-type': 'application/json',
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
    .then(data => data)
);

export const fetchComments = postId => (
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
);

export const votePost = (postId, body) => (
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'post',
    body: JSON.stringify(body),
  })
    .then(res => res.json())
);
