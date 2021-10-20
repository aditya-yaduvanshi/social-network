import axios from "axios";
//import setAlert from "./alerts"

const login = (user) => {
  return async (dispatch) => {
    dispatch({type: "AUTH_LOADING"})
    return axios
      .get(`accounts/auth?email=${user.email}&password=${user.password}`)
      .then((res) => {
        if(res.data.status === 403){
          return dispatch({type: "VERIFY_ERROR"})
        }
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {...res.data, user: user.email},
        });
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_FAIL",
        });
      });
  };
};

const signup = (user) => {
  return async (dispatch) => {
    dispatch({type: "AUTH_LOADING"})
    return axios
      .post("accounts/auth", user)
      .then((res) => {
        dispatch({
          type: "SIGNUP_SUCCESS"
        });
        dispatch({
          type: "VERIFYING"
        })
      })
      .catch((err) => {
        dispatch({
          type: "SIGNUP_FAIL",
        });
      });
  };
};

const oauth = (user) => {
  return async (dispatch) => {
    dispatch({type: "AUTH_LOADING"})
    return axios
      .post("accounts/oauth", JSON.stringify(user))
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
    dispatch({type: "AUTH_LOADING"})
    let name = user.name,
    email = user.email,
    phone = user.phone,
    password = user.password,
    current_email = localStorage.getItem("user");
    return axios
      .put("accounts/auth", JSON.stringify({name, current_email, email, phone, password}))
      .then(res => {
        dispatch({
          type: "RESET_SUCCESS",
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({type: "RESET_FAIL"})
      })
  }
}

const verifyEmail = (cred) => {
  return async (dispatch) => {
    dispatch({type: "AUTH_LOADING"})
    return axios
      .put("accounts/verify-email", JSON.stringify(cred))
      .then(res => {
        dispatch({
          type: "VERIFY_SUCCESS",
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({type: "VERIFY_FAIL"})
      })
  }
}

const getEmailVerifyLink = (cred) => {
  return async (dispatch) => {
    dispatch({type: "AUTH_LOADING"})
    return axios
      .get(`/accounts/verify-email?email=${cred.email}`)
      .then(res => {
        dispatch({type: "EMAIL_LINK_SUCCESS"})
      })
      .catch(err => {
        console.log(err)
        dispatch({type: "EMAIL_LINK_FAIL"})
      })
  }
}

const logout = () => ({type: "LOGOUT"});

export {logout, login, signup, reset, verifyEmail, getEmailVerifyLink, oauth};
