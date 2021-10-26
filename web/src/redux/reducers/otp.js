const initialState = {
  verified: false,
  sent: false,
  loading: false,
};
const otp = (state = initialState, action) => {
  switch (action.type) {
    case "OTP_SENT_SUCCESS":
      localStorage.setItem("sent", true);
      return {
        ...state,
        sent: true,
        loading: false,
      };
    case "OTP_VERIFY_SUCCESS":
      localStorage.setItem("verified", true);
      return {
        ...state,
        verified: true,
        loading: false,
      };
    case "OTP_SENT_FAIL":
      localStorage.removeItem("sent");
      return {
        ...state,
        sent: false,
        loading: false,
      };
    case "OTP_VERIFY_FAIL":
      localStorage.removeItem("verified");
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
    default:
      return {
        ...state,
      };
  }
};

export default otp;
