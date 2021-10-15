import axios from "axios";
//import setAlert from "./alerts"

const login = (user) => {
  return async (dispatch) => {
    return axios
      .get(`accounts/auth?username=${user.username}&password=${user.password}`)
      .then((res) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {...res.data, user: user.username},
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "LOGIN_FAIL",
        });
      });
  };
};

const signup = (user) => {
  return async (dispatch) => {
    console.log("dispatched")
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
        console.log(err);
        dispatch({
          type: "SIGNUP_FAIL",
        });
      });
  };
};

const oauth = (user) => {
  return async (dispatch) => {
    return axios
      .post("accounts/oauth", JSON.stringify(user))
      .then((res) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "LOGIN_FAIL",
        });
      });
  };
};

const logout = () => ({type: "LOGOUT"});

export {logout, login, signup, oauth};
