import {URL_ENTRY, API_KEY_ENTRY} from '../actions/actionTypes';

const INITIAL_STATE = {
  apiKey: '',
  url: '',
  loading: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_KEY_ENTRY:
      return {
        ...state,
        apiKey: action.payload,
      };
    case URL_ENTRY:
      return {
        ...state,
        url: action.payload,
      };
    default:
      return state;
  }
};
