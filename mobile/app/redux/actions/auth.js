import axios from "axios";
import setAlert from "./alerts";

const login = (user) => {
  return async (dispatch) => {
    dispatch({type: "AUTH_LOADING"});
    return axios
      .get(`accounts/auth?email=${user.email}&password=${user.password}`)
      .then((res) => {
        if (res.data.status === 400) {
          dispatch({
            type: "LOGIN_FAIL",
          });
          dispatch(setAlert(res.data.msg, "error"));
        } else if (res.data.status === 402) {
          dispatch({type: "VERIFY_ERROR"});
          dispatch(setAlert(res.data.msg, "error"));
        } else if (res.data.status === 200) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {...res.data, user: user.email},
          });
          dispatch(setAlert("Login Success!", "success"));
        }
      })
      .catch((err) => {
        dispatch({type: "LOGIN_FAIL"});
        dispatch(setAlert("Login cannot request please try later!", "error"));
      });
  };
};

const signup = (user) => {
  return async (dispatch) => {
    dispatch({type: "AUTH_LOADING"});
    return axios
      .post("accounts/auth", user)
      .then((res) => {
        if (res.data.status === 400) {
          dispatch({type: "SIGNUP_FAIL"});
          dispatch(setAlert(res.data.msg, "error"));
        } else if (res.data.status === 201) { 
          dispatch({type: "SIGNUP_SUCCESS"});
          dispatch({type: "OTP_SENT_SUCCESS"});
          dispatch(setAlert("Signup success! Please verify account.", "success"));
        } else if(res.data.status === 502){
          dispatch({type: "SIGNUP_SUCCESS"});
          dispatch({type: "OTP_SENT_FAIL"});
          dispatch(setAlert(res.data.msg, "success"));
        }
      })
      .catch((err) => {
        dispatch({type: "SIGNUP_FAIL"});
        dispatch(setAlert("Signup cannot request please try later!", "error"));
      });
  };
};

const oauth = (user) => {
  return async (dispatch) => {
    dispatch({type: "AUTH_LOADING"});
    return axios
      .post("accounts/oauth", user)
      .then((res) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_FAIL",
        });
      });
  };
};

const reset = (user) => {
  return async (dispatch) => {
    dispatch({type: "AUTH_LOADING"});
    return axios
      .put("accounts/auth", user)
      .then((res) => {
        if (res.data.status === 400) {
          dispatch({type: "RESET_FAIL"});
          dispatch(setAlert(res.data.msg, "error"));
        } else if (res.data.status === 204) {
          dispatch({type: "RESET_SUCCESS"});
          dispatch(setAlert("Password reset success!", "success"));
        } else if(res.data.status === 500){
          dispatch({type: "RESET_FAIL"});
          dispatch(setAlert(res.data.msg, "error"));
        }
      })
      .catch((err) => {
        dispatch({type: "RESET_FAIL"});
        dispatch(setAlert("Password reset cannot request please try later!", "error"));
      });
  };
};

const logout = () => {
  return async (dispatch) => {
    dispatch({type: "LOGOUT"});
    dispatch({type: "OTP_CLEAR"});
    dispatch(setAlert("Logout success!", "success"));
  };
};

export {logout, login, signup, reset, oauth};
