import axios from "axios";
import setAlert from "./alerts";

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
        dispatch(setAlert("OTP sent success.", "success"));
      })
      .catch(err => {
        dispatch({type: "OTP_SENT_FAIL"})
        dispatch(setAlert("OTP cannot be sent at the moment!", "error"));
      })
  }
}

const verifyOtp = (cred) => {
  return async (dispatch) => {
    dispatch({type: "OTP_LOADING"})
    return axios
      .post("accounts/otp", cred)
      .then(res => {
        if(res.status === 400){
          dispatch({type: "OTP_VERIFY_FAIL"})
          dispatch(setAlert("OTP expired or incorrect!", "error"));
        } else if (res.status === 500){
          dispatch({type: "OTP_VERIFY_FAIL"})
          dispatch(setAlert("OTP cannot be verified! something went wrong.", "error"));
        } else {
          if(cred.type === "email-verification"){
            dispatch({type: "EMAIL_VERIFY_SUCCESS"});
          }
          dispatch({
            type: "OTP_VERIFY_SUCCESS",
            payload: res.data
          })
          dispatch(setAlert("OTP confirm success.", "success"));
        }
      })
      .catch(err => {
        dispatch({type: "OTP_VERIFY_FAIL"})
        dispatch(setAlert("OTP request cannot be sent! Please try again later.", "error"));
      })
  }
}

export {sendOtp, verifyOtp}