
class Alerts {
  static initialState=[]
  static alert = (state=Alerts.initialState, action) => {
    switch(action.type){
      case "SET":
        return [...state, action.payload]
      case "REMOVE":
        return state.filter(alert => alert.id !== action.payload)
      default:
        return state
    }
  }
}
export default Alerts