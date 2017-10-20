import { combineReducers } from 'redux';
import { RECEIVE_CATEGORIES, RECEIVE_POSTS } from '../actions/index';

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
    default:
      return state;
  }
};

// const posts = (state = {}, action) => {
//   switch (action.type) {
//     case RECEIVE_POSTS:
//       const { posts } = action;
//       return {
//         ...state,
//         posts,
//       };
//     default:
//       return state;
//   }
// };

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
