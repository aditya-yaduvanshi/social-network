import {v4 as uuid} from "uuid";

const setAlert =
  (msg, type, timeout = 5000) =>
  (dispatch) => {
    const id = uuid();
    dispatch({
      type: "SET",
      payload: {msg, type, id},
    });
    setTimeout(dispatch({type: "REMOVE", payload: id}), timeout);
  };

export default setAlert;
