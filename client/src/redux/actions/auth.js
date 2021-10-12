import axios from "axios"
import setAlert from "./alerts"

const login = (username, password) => async (dispatch) => {
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
    dispatch(setAlert("Logged In Successfully!", "SET"))
  } catch (err) {
    dispatch({
      type: "LOGIN_FAIL"
    })
  }
}

const signup = (name, email, phone, password, password2) => async (dispatch) => {
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
    dispatch(login(email, password))
  } catch (err) {
    console.log(err)
    dispatch({
      type: "SIGNUP_FAIL"
    })
    dispatch(setAlert("Signing Up Failed!"))
  }
}

const oauth = (data) => async (dispatch) => {
  const body = JSON.stringify(data)
  try {
    const res = await axios.post("accounts/oauth", body)
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export {
  login,
  signup,
  oauth
}