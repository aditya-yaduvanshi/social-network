import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunk from "redux-thunk"
import otp from "./reducers/otp";
import auth from "./reducers/auth";
import alert from "./reducers/alerts"

const allReducers = combineReducers({
  auth,
  otp,
  alert
});

const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension(): f => f
  ) 
);

export default store;
