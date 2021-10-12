import axios from "axios"
import Alerts from "./alerts"

class Auth {
  static login = (username, password) => async (dispatch) => {
    const body = JSON.stringify({
      username,
      password
    })
    try {
      const res = await axios.get("accounts/auth", body)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data
      })
      dispatch(Alerts.set("Logged In Successfully!", "success"))
    } catch (err) {
      dispatch({
        type: "LOGIN_FAIL"
      })
    }
  }

  static signup = (name, email, phone, password, password2) => async (dispatch) => {
    const body = JSON.stringify({
      name,
      email,
      phone,
      password,
      password2
    })
    try {
      const res = await axios.post("accounts/auth", body)
      dispatch({
        type: "SIGNUP_SUCCESS",
        payload: res.data
      })
      dispatch(Auth.login(email, password))
    } catch (err) {
      console.log(err)
      dispatch({
        type: "SIGNUP_FAIL"
      })
      dispatch(Alerts.set("Signing Up Failed!"))
    }
  }

  static oauth = (data) => async (dispatch) => {
    const body = JSON.stringify(data)
    try {
      const res = await axios.post("accounts/oauth", body)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data
      })
    } catch (err) {}
  }
}

export default Auth