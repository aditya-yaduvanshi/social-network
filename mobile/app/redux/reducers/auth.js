import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  access: AsyncStorage.getItem("access")
    .then((access) => access)
    .catch((err) => {})
    ? AsyncStorage.getItem("access")
        .then((access) => access)
        .catch((err) => {})
    : null,
  refresh: AsyncStorage.getItem("refresh")
    .then((refresh) => refresh)
    .catch((err) => {})
    ? AsyncStorage.getItem("refresh")
        .then((refresh) => refresh)
        .catch((err) => {})
    : null,
  loggedin: AsyncStorage.getItem("access")
    .then((access) => access)
    .catch((err) => {})
    ? true
    : false,
  loading: false,
  resetted: false,
  signedup: false,
  verified: false,
  user: AsyncStorage.getItem("user")
    .then((user) => user)
    .catch((err) => {})
    ? AsyncStorage.getItem("user")
        .then((user) => user)
        .catch((err) => {})
    : "",
};

const auth = async (state = initialState, action) => {
  let ok;
  switch (action.type) {
    case "LOGIN_SUCCESS":
      ok = await AsyncStorage.multiSet[
        (["access", action.payload.access],
        ["refresh", action.payload.refresh],
        ["user", action.payload.user])
      ];
      if (ok)
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
      ok = await AsyncStorage.multiRemove(["access", "refresh", "user"]);
      if (ok)
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
