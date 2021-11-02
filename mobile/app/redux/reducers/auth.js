import SyncStorage from "sync-storage";

const initialState = {
  access: SyncStorage.get("access")
    ? SyncStorage.get("access")
    : null,
  refresh: SyncStorage.get("refresh")
    ? SyncStorage.get("refresh")
    : null,
  loggedin: SyncStorage.get("access")
    ? true
    : false,
  loading: false,
  resetted: false,
  signedup: false,
  verified: false,
  user: SyncStorage.get("user")
    ? SyncStorage.get("user")
    : "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      SyncStorage.set("access", action.payload.access) 
      SyncStorage.set("refresh", action.payload.refresh) 
      SyncStorage.set("user", action.payload.user) 
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
      SyncStorage.remove("access") 
      SyncStorage.remove("refresh")
      SyncStorage.remove("user")
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
      };
    case "EMAIL_VERIFY_FAIL":
      return {
        ...state,
        verified: false,
      };
    case "VERIFY_ERROR":
      return {
        ...state,
        verified: false,
      };
    default:
      return state;
  }
};

export default auth;
