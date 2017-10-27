import * as readableAPI from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
// export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
// export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const receiveComments = (comments ) => ({
  type: RECEIVE_COMMENTS,
  comments,
});

export const receiveComment = (comment ) => ({
  type: RECEIVE_COMMENT,
  comment,
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post,
});

export const removePost = post => ({
  type: DELETE_POST,
  post,
});

export const removeComment = comment => ({
  type: DELETE_COMMENT,
  comment
})

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

export const votePost = (postId, vote) => dispatch => (
  readableAPI
    .votePost(postId, vote)
    .then(post => dispatch(receivePost(post)))
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

export const deleteComment = commentId => dispatch => (
  readableAPI
    .deleteComment(commentId)
    .then(comment => dispatch(removeComment(comment.id)))
);


export const voteComment = (commentId, vote) => dispatch => (
  readableAPI
    .voteComment(commentId, vote)
    .then(comment => dispatch(receiveComment(comment)))
);