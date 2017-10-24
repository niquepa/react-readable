import * as readableAPI from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
// export const ADD_POST = 'ADD_POST';
// export const DELETE_POST = 'DELETE_POST';
// export const ADD_COMMENT = 'ADD_COMMENT';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const receiveComments = (comments, postId) => ({
  type: RECEIVE_COMMENTS,
  comments,
  postId,
});

export const fetchCategories = () => dispatch => (
  readableAPI
    .fetchCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

export const fetchPosts = () => dispatch => (
  readableAPI
    .fetchPosts()
    .then(posts => dispatch(receivePosts(posts)))
);

export const fetchComments = postId => dispatch => (
  readableAPI
    .fetchComments(postId)
    .then(comments => dispatch(receiveComments(comments, postId)))
);
