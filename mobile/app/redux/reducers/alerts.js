const initialState = [];
const alert = (state = initialState, action) => {
  switch (action.type) {
    case "ALERT_SET":
      return [...state, action.payload];
    case "ALERT_REMOVE":
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default alert;
