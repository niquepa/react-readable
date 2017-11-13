import { combineReducers } from 'redux';
import {
  DELETE_COMMENT,
  DELETE_POST, RECEIVE_CATEGORIES, RECEIVE_COMMENTS, RECEIVE_POST,
  RECEIVE_POSTS, RECEIVE_COMMENT, UPDATE_POST, UPDATE_COMMENT, ADD_SNACK, DELETE_SNACK,
} from '../actions/index';


const initialState = {
  categories: [],
  posts: [],
  comments: [],
};

const global = (state = initialState, action) => {
  const {
    comment, comments, post, posts, snack,
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
        post,
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
    case ADD_SNACK:
      return {
        ...state,
        snack,
      };
    case DELETE_SNACK:
      return {
        ...state,
        snack: '',
      };
    default:
      return state;
  }
};

export default combineReducers({
  global,
});
