import * as readableAPI from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_POST = 'RECEIVE_POST';
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

export const receivePost = post => ({
  type: RECEIVE_POST,
  post,
});

export const fetchCategories = () => dispatch => (
  readableAPI
    .getCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

export const fetchPosts = category => dispatch => (
  readableAPI
    .getPosts(category)
    .then(posts => dispatch(receivePosts(posts)))
);

export const fetchComments = postId => dispatch => (
  readableAPI
    .getComments(postId)
    .then(comments => dispatch(receiveComments(comments, postId)))
);

// export const fetchPostAndComments = () => (dispatch, getState) => (
//   dispatch(fetchPosts())
//     .then(() => {
//       getState().global.posts.map(post => dispatch(fetchComments(post.id)));
//     })
// );

export const votePost = (postId, vote) => dispatch => (
  readableAPI
    .votePost(postId, vote)
    .then(post => dispatch(receivePost(post)))
);
