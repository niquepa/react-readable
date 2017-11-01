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

export const getPost = postId => (
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    // .then(data => data);
);

export const newPost = (body) => (
  fetch(`${api}/posts`, {
    headers,
    method: 'post',
    body: JSON.stringify(body),
  })
    .then(res => res.json())
);

export const editPost = (postId, body) => (
  fetch(`${api}/posts/${postId}`, {
    headers,
    method: 'put',
    body: JSON.stringify(body),
  })
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
);

export const getComments = postId => (
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
);

export const getComment = commentId => (
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
);

export const voteComment = (commentId, body) => (
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'post',
    body: JSON.stringify(body),
  })
    .then(res => res.json())
);

export const newComment = (body) => (
  fetch(`${api}/comments`, {
    headers,
    method: 'post',
    body: JSON.stringify(body),
  })
    .then(res => res.json())
);

export const editComment = (commentId, body) => (
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'put',
    body: JSON.stringify(body),
  })
    .then(res => res.json())
);

export const deleteComment = commentId => (
  fetch(`${api}/comments/${commentId}`, {
    headers,
    method: 'delete',
  })
    .then(res => res.json())
);
