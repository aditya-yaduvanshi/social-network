const initialState = {
  token: localStorage.getItem("token"),
  loggedin: localStorage.getItem("token") ? true : false,
  loading: false,
  user: localStorage.getItem("user") ? localStorage.getItem("user") : ''
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.access);
      localStorage.setItem("user", action.payload.user)
      return {
        ...state,
        loggedin: true,
        loading: true,
        token: action.payload.access,
        user: action.payload.user
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        loggedin: false,
        loading: true,
      };
    case "SIGNUP_FAIL":
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        loggedin: false,
        loading: false,
        user: ''
      };
    default:
      return state;
  }
};

export default auth;
