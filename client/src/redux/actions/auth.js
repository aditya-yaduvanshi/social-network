import axios from "axios";
//import setAlert from "./alerts"

const login = (user) => {
  return async (dispatch) => {
    dispatch({type: "AUTH_LOADING"})
    return axios
      .get(`accounts/auth?username=${user.username}&password=${user.password}`)
      .then((res) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {...res.data, user: user.username},
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
        dispatch(
          login({
            username: user.email,
            password: user.password,
          })
        );
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
    return axios
      .put("accounts/auth", JSON.stringify(user))
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

const logout = () => ({type: "LOGOUT"});

export {logout, login, signup, reset, oauth};
