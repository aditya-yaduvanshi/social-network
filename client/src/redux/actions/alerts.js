import { v4 as uuid } from "uuid"

class Alerts {
  static set = (msg, type, timeout=5000) => (dispatch) => {
    const id = uuid()
    dispatch({
      type: "SET",
      payload: {msg, type, id}
    })
    setTimeout(dispatch({type: "REMOVE",payload: id}), timeout)
  }
}
export default Alerts