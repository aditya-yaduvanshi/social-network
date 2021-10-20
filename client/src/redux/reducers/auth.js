const initialState = {
  token: localStorage.getItem("token"),
  loggedin: localStorage.getItem("token") ? true : false,
  loading: false,
  resetted: false,
  verified: false,
  linkSent: false,
  signedup: false,
  verifyError: false,
  user: localStorage.getItem("user") ? localStorage.getItem("user") : '',
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
        loading: false,
        signedup: true
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
    case "RESET_SUCCESS":
      return {
        ...state,
        loading: false,
        resetted: true
      }
    case "RESET_FAIL":
      return {
        ...state,
        loading: false,
        resetted: false
      }
    case "AUTH_LOADING":
      return {
        ...state,
        loading: true
      }
    case "VERIFY_SUCCESS":
      return {
        ...state,
        loading: false,
        verified: true
      }
    case "VERIFY_FAIL":
      return {
        ...state,
        loading: false,
        verified: false
      }
    case "EMAIL_LINK_SUCCESS":
      return {
        ...state,
        laoding: false,
        linkSent: true
      }
    case "EMAIL_LINK_FAIL":
      return {
        ...state,
        loading: false,
        linkSent: false
      }
    case "VERIFY_ERROR":
      return {
        ...state,
        loading: false,
        verifyError: true
      }
    default:
      return state;
  }
};

export default auth;
