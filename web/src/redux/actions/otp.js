import axios from "axios";
import setAlert from "./alerts";

const sendOtp = (cred) => {
  return async (dispatch) => {
    dispatch({type: "OTP_LOADING"})
    return axios
      .get(`accounts/otp?email=${cred.email}`)
      .then(res => {
        if(res.data.status === 200){
          dispatch({
            type: "OTP_SENT_SUCCESS",
            payload: res.data
          })
          dispatch(setAlert("OTP sent success.", "success"));
        } else {
          dispatch({
            type: "OTP_SENT_FAIL",
            payload: res.data
          })
          dispatch(setAlert(res.data.msg, "success"));
        }
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
        if(res.data.status === 400){
          dispatch({type: "OTP_VERIFY_FAIL"})
          dispatch(setAlert(res.data.msg, "error"));
        } else if (res.data.status === 500){
          dispatch({type: "OTP_VERIFY_FAIL"})
          dispatch(setAlert(res.data.msg, "error"));
        } else if(res.data.status === 200) {
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