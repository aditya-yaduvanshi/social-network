const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  loggedin: localStorage.getItem("access") ? true : false,
  loading: false,
  resetted: false,
  signedup: false,
  verified: false,
  user: localStorage.getItem("user") ? localStorage.getItem("user") : "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
      localStorage.setItem("user", action.payload.user);
      return {
        ...state,
        loggedin: true,
        loading: false,
        verified: true,
        signedup: true,
        access: action.payload.access,
        refresh: action.payload.refresh,
        user: action.payload.user,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        loading: false,
        signedup: true,
        verified: false,
      };
    case "SIGNUP_FAIL":
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      return {
        ...state,
        access: null,
        refresh: null,
        loggedin: false,
        loading: false,
        verified: false,
        user: "",
        signedup: false,
        resetted: false,
      };
    case "RESET_SUCCESS":
      return {
        ...state,
        loading: false,
        signedup: true,
        resetted: true,
        verified: true,
      };
    case "RESET_FAIL":
      return {
        ...state,
        loading: false,
        resetted: false,
      };
    case "AUTH_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "EMAIL_VERIFY_SUCCESS":
      return {
        ...state,
        verified: true,
      }
      case "EMAIL_VERIFY_FAIL":
        return {
          ...state,
          verified: false,
      }
    case "VERIFY_ERROR":
      return {
        ...state,
        verified: false,
        signedup: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default auth;
