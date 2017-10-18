import * as readableAPI from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
// export const ADD_POST = 'ADD_POST';
// export const DELETE_POST = 'DELETE_POST';
// export const ADD_COMMENT = 'ADD_COMMENT';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const fetchCategories = () => dispatch => (
  readableAPI
    .fetchCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);