import * as readableAPI from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const UPDATE_POST = 'UPDATE_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const DELETE_POST = 'DELETE_POST';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_SNACK = 'ADD_SNACK';
export const DELETE_SNACK = 'DELETE_SNACK';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post,
});

export const updatePost = post => ({
  type: UPDATE_POST,
  post,
});

export const removePost = post => ({
  type: DELETE_POST,
  post,
});

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments,
});

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment,
});

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment,
});

export const removeComment = comment => ({
  type: DELETE_COMMENT,
  comment,
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

export const fetchPost = postId => dispatch => (
  readableAPI
    .getPost(postId)
    .then(post => dispatch(receivePost(post)))
);

export const newPost = body => dispatch => (
  readableAPI
    .newPost(body)
    .then(post => dispatch(updatePost(post)))
);

export const editPost = (postId, body) => dispatch => (
  readableAPI
    .editPost(postId, body)
    .then(post => dispatch(receivePost(post)))
);

export const votePost = (postId, vote) => dispatch => (
  readableAPI
    .votePost(postId, vote)
    .then(post => dispatch(updatePost(post)))
);

export const deletePost = postId => dispatch => (
  readableAPI
    .deletePost(postId)
    .then(post => dispatch(removePost(post.id)))
);


export const fetchComments = postId => dispatch => (
  readableAPI
    .getComments(postId)
    .then(comments => dispatch(receiveComments(comments)))
);

export const fetchComment = commentId => dispatch => (
  readableAPI
    .getComment(commentId)
    .then(comment => dispatch(receiveComment(comment)))
);

export const newComment = body => dispatch => (
  readableAPI
    .newComment(body)
    .then(comment => dispatch(updateComment(comment)))
);

export const newCommentFetchPost = body => dispatch => (
  dispatch(newComment(body))
    .then(() => {
      dispatch(fetchPost(body.parentId));
    })
);

export const editComment = (commentId, body) => dispatch => (
  readableAPI
    .editComment(commentId, body)
    .then(comment => dispatch(updateComment(comment)))
);

export const voteComment = (commentId, vote) => dispatch => (
  readableAPI
    .voteComment(commentId, vote)
    .then(comment => dispatch(updateComment(comment)))
);

export const deleteComment = commentId => dispatch => (
  readableAPI
    .deleteComment(commentId)
    .then(comment => dispatch(removeComment(comment.id)))
);

export const deleteCommentFetchPost = comment => dispatch => (
  dispatch(deleteComment(comment.id))
    .then(() => {
      dispatch(fetchPost(comment.parentId));
    })
);

export const addSnack = (snack) => ({
  type: ADD_SNACK,
  snack
});

export const removeSnack = () => ({
  type: DELETE_SNACK,
});

// export const deleteSnack = () =>  dispatch => (
//
// )