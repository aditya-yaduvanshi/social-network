import { combineReducers } from "redux"
import auth from "./auth"
import alert from "./alerts"


const allReducers = combineReducers({
  auth,
  alert
})

export default allReducers