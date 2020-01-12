import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGNUP_USER,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  password: '',
  loading: null,
  user: null,
  signupError: '',
  loginError: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload,
        signupError: '',
        loginError: '',
      };

    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload,
        signupError: '',
        loginError: '',
      };
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        email: '',
        password: '',
      };
    case SIGNUP_USER:
      return {
        ...state,
        loading: true,
        signupError: '',
      };
    case SIGNUP_USER_FAIL:
      return {
        ...state,
        loading: false,
        signupError: action.error,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        email: '',
        password: '',
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loginError: action.error,
        password: '',
        loading: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        loginError: '',
      };
    default:
      return state;
  }
};
