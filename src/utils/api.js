const api = 'http://localhost:3001';
const token = 'niquepa';

const headers = {
  'Content-type': 'application/json',
  Authorization: token,
};

export const getCategories = () => (
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
);

export const getPosts = (category) => {
  if (category && category !== '/') {
    console.log(`API getPosts: ${category}`);
    return fetch(`${api}/${category}/posts`, { headers })
      .then(res => res.json())
      .then(data => data);
  }

  return fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);
};

export const getComments = postId => (
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

export const deletePost = postId => (
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'delete',
  })
    .then(res => res.json())
)
