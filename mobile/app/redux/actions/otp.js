import axios from "axios";

const sendOtp = (cred) => {
  return async (dispatch) => {
    dispatch({type: "OTP_LOADING"})
    return axios
      .get(`accounts/otp?email=${cred.email}`)
      .then(res => {
        dispatch({
          type: "OTP_SENT_SUCCESS",
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({type: "OTP_SENT_FAIL"})
      })
  }
}

const verifyOtp = (cred) => {
  return async (dispatch) => {
    dispatch({type: "OTP_LOADING"})
    return axios
      .post("accounts/otp", JSON.stringify(cred))
      .then(res => {
        dispatch({
          type: "OTP_VERIFY_SUCCESS",
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({type: "OTP_VERIFY_FAIL"})
      })
  }
}

export {sendOtp, verifyOtp}