import { combineReducers } from "redux"
import Auth from "./auth"
import Alerts from "./alerts"

const auth = Auth.auth
const alert = Alerts.alert
const allReducers = combineReducers({
  auth,
  alert
})

export default allReducers