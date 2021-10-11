
class Auth {
  static initialState = {
    token: localStorage.getItem('token'),
    loggedin: localStorage.getItem('token') ? true : false,
    loading: false
  }

  static async auth (state=Auth.initialState, action) {
    switch(action.type){
      case 'LOGIN_SUCCESS':
        localStorage.setItem('token',action.payload.access)
        return {
          ...state,
          loggedin: true,
          loading: true,
          token: action.payload.access
        }
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          loggedin: false,
          loading: true
        }
      case 'SIGNUP_FAIL':
      case 'LOGIN_FAIL':
      case 'LOGOUT':
        localStorage.removeItem('token')
        return {
          ...state,
          token: null,
          loggedin: false,
          loading: false
        }
      default:
        return state
    }
  }
}


export default Auth