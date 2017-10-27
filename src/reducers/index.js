import { combineReducers } from 'redux';
import {
  DELETE_COMMENT,
  DELETE_POST, RECEIVE_CATEGORIES, RECEIVE_COMMENTS, RECEIVE_POST,
  RECEIVE_POSTS, RECEIVE_COMMENT,
} from '../actions/index';

const global = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action;
      return {
        ...state,
        categories,
      };
    case RECEIVE_POSTS:
      const { posts } = action;
      return {
        ...state,
        posts,
      };
    case RECEIVE_POST:
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== action.post.id).concat(action.post),
        post: action.post,
      };
    case RECEIVE_COMMENTS:
      const { comments } = action;
      return {
        ...state,
        comments,
      };
    case RECEIVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(item => item.id !== action.comment.id).concat(action.comment),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(item => item.id !== action.comment),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== action.post),
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
