import { combineReducers } from "redux"
import Auth from "./auth"

const auth = Auth.auth
const allReducers = combineReducers({
  auth
})

export default allReducers