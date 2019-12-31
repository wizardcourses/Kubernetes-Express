import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  SIGNUP_USER,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  API_KEY_ENTRY,
  URL_ENTRY,
  FETCH_METRICS_SUCCESS,
  FETCH_METICS_FAIL,
  FETCH_METRICS,
} from './actionTypes';
import * as firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const signupUser = ({email, password}) => {
  return dispatch => {
    dispatch({type: SIGNUP_USER});
    console.log(email);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => signupUserSuccess(dispatch, user))
      .catch(error => {
        signupUserFail(dispatch, error);
      });
  };
};

export const signupUserSuccess = (dispatch, user) => {
  dispatch({type: SIGNUP_USER_SUCCESS, payload: user});
  Actions.main();
};

export const signupUserFail = (dispatch, error) => {
  dispatch({type: SIGNUP_USER_FAIL, error: error.message});
};

export const loginUser = ({email, password}) => {
  return dispatch => {
    dispatch({type: LOGIN_USER});
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => loginUserFail(dispatch, error));
  };
};

export const loginUserFail = (dispatch, error) => {
  dispatch({type: LOGIN_USER_FAIL, error: error.message});
};

export const loginUserSuccess = (dispatch, user) => {
  dispatch({type: LOGIN_USER_SUCCESS, payload: user});

  Actions.main();
};

// Cluster Data Authentication

export const apiEntry = text => {
  return {
    type: API_KEY_ENTRY,
    payload: text,
  };
};

export const urlEntry = text => {
  return {
    type: URL_ENTRY,
    payload: text,
  };
};

export const fetchMetricsFail = dispatch => {
  dispatch({type: FETCH_METICS_FAIL});
};

export const fetchMetricsSuccess = (dispatch, data) => {
  dispatch({type: FETCH_METRICS_SUCCESS, payload: data});
};

export const fetchMetrics = ({apiKey, url}) => {
  return dispatch => {
    dispatch({type: FETCH_METRICS});

    const api = apiKey;
    const grafanaUrl = `http://${url}/api/datasources/proxy/1/api/v1/query_range?`;
    const startTime = Math.floor(Date.now() / 1000 - 3600 * 6);
    const endTime = Math.floor(Date.now() / 1000);
    const step = 30;

    const queryCpu =
      'sum(rate(node_cpu{mode!="idle",mode!="iowait",mode!~"^(?:guest.*)$"}[5m])) BY (instance)';
    const urlValCpu = `${grafanaUrl}query=${queryCpu}&start=${startTime}&end=${endTime}&step=${step}`;

    const queryMem =
      '1 - sum(node_memory_MemAvailable) by (node) / sum(node_memory_MemTotal) by (node)';
    const urlValMem = `${grafanaUrl}query=${queryMem}&start=${startTime}&end=${endTime}&step=${step}`;

    const queryNetwork = 'sum(rate(node_network_receive_bytes[5m])) by (node)';
    const urlValNetwork = `${grafanaUrl}query=${queryNetwork}&start=${startTime}&end=${endTime}&step=${step}`;

    const querySat =
      'sum(node_load1) by (node) / count(node_cpu{mode="system"}) by (node) * 100';
    const urlValSat = `${grafanaUrl}query=${querySat}&start=${startTime}&end=${endTime}&step=${step}`;

    let dataFetch = [
      fetch(urlValCpu, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${api}`,
        },
      })
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = {x: val[0], y: Number(val[1] * 100000)};
            dataArray.push(val);
          });

          return dataArray;
        })
        .catch(error => console.log(error)),
      fetch(urlValMem, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${api}`,
        },
      })
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = {x: val[0], y: Number(val[1])};
            dataArray.push(val);
          });

          return dataArray;
        })
        .catch(error => console.log(error)),
      fetch(urlValNetwork, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${api}`,
        },
      })
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = {x: val[0], y: Number(val[1])};
            dataArray.push(val);
          });

          return dataArray;
        })
        .catch(error => console.log(error)),
      fetch(urlValSat, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${api}`,
        },
      })
        .then(data => data.json())
        .then(json => {
          let dataArray = [];
          json.data.result[0].values.forEach(val => {
            val = {x: val[0], y: Number(val[1])};
            dataArray.push(val);
          });

          return dataArray;
        })
        .catch(error => console.log(error)),
    ];

    Promise.all(dataFetch)
      .then(data => {
        fetchMetricsSuccess(dispatch, data);
        console.log('SUCCESS');
        Actions.main();
      })
      .catch(error => {
        console.log(error);
        return fetchMetricsFail(dispatch);
      });
  };
};
