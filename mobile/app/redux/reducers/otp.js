const initialState = {
  verified: false,
  sent: false,
  loading: false,
};
const otp = (state = initialState, action) => {
  switch (action.type) {
    case "OTP_SENT_SUCCESS":
      return {
        ...state,
        sent: true,
        loading: false,
      };
    case "OTP_VERIFY_SUCCESS":
      return {
        ...state,
        verified: true,
        loading: false,
      };
    case "OTP_SENT_FAIL":
      return {
        ...state,
        sent: false,
        loading: false,
      };
    case "OTP_VERIFY_FAIL":
      return {
        ...state,
        verified: false,
        loading: false,
      };
    case "OTP_LOADING":
      return {
        ...state,
        loading: true
      }
    case "OTP_CLEAR":
      return {
        ...state,
        verified: false,
        sent: false,
        loading: false,
      }
    default:
      return {
        ...state,
      };
  }
};

export default otp;
