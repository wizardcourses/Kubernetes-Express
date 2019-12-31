import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ApiReducer from './ApiReducer';
import MetricsReducer from './MetricsReducer';
export default combineReducers({
  auth: AuthReducer,
  api: ApiReducer,
  metrics: MetricsReducer,
});
