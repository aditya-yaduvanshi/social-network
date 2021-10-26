import {combineReducers} from "redux";
import auth from "./auth";
import alert from "./alerts";
import otp from "./otp";

const allReducers = combineReducers({
  auth,
  alert,
  otp
});

export default allReducers;
