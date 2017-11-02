import { combineReducers } from 'redux';
import {
  DELETE_COMMENT,
  DELETE_POST, RECEIVE_CATEGORIES, RECEIVE_COMMENTS, RECEIVE_POST,
  RECEIVE_POSTS, RECEIVE_COMMENT, UPDATE_POST, UPDATE_COMMENT,
} from '../actions/index';

const global = (state = {}, action) => {
  const {
    comment, comments, post, posts,
  } = action;

  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action;
      return {
        ...state,
        categories,
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        posts,
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== post.id).concat(post),
      };
    case RECEIVE_POST:
      return {
        ...state,
        post,
      };
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments,
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(item => item.id !== comment.id).concat(comment),
      };
    case RECEIVE_COMMENT:
      return {
        ...state,
        comment,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(item => item.id !== comment),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== post),
      };
    default:
      return state;
  }
};

export default combineReducers({
  global,
});

//
// function posts(state = {}, action) {
//   switch (action.type) {
//     case ADD_POST:
//       const { recipe } = action;
//
//       return {
//         ...state,
//         [recipe.label]: recipe,
//       };
//     default:
//       return state;
//   }
// }
//
// function comments(state = {}, action) {
//   switch (action.type) {
//     case ADD_COMMENT:
//       const { recipe } = action;
//
//       return {
//         ...state,
//         [recipe.label]: recipe,
//       };
//     default:
//       return state;
//   }
// }
