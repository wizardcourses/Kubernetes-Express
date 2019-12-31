import {
  FETCH_METICS_FAIL,
  FETCH_METRICS,
  FETCH_METRICS_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  cpuUsage: null,
  memUsage: null,
  networkTraffic: null,
  saturation: null,
  isLoading: null,
  isLoggedIn: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_METICS_FAIL:
      return {...state, isLoading: true};
    case FETCH_METRICS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_METRICS_SUCCESS:
      console.log('PAYLOAD', action.payload);
      return {
        ...state,
        cpuUsage: action.payload[0],
        memUsage: action.payload[1],
        networkTraffic: action.payload[2],
        saturation: action.payload[3],
        isLoading: false,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};
