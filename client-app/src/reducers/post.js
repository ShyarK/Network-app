import { GET_POSTS, POST_ERROR } from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};
console.log('reducer');

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
