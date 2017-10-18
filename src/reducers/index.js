import { combineReducers } from 'redux';
import { ADD_COMMENT, ADD_POST } from '../actions/index';

function posts(state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      const { recipe } = action;

      return {
        ...state,
        [recipe.label]: recipe,
      };
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      const { recipe } = action;

      return {
        ...state,
        [recipe.label]: recipe,
      };
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
});
