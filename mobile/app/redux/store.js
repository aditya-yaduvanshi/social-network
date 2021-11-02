import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import otp from "./reducers/otp";
import auth from "./reducers/auth";
import alert from "./reducers/alerts";

const allReducers = combineReducers({
  auth,
  otp,
  alert
});

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;
