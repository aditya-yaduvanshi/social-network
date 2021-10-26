import React from "react"
import {connect} from "react-redux"
import setAlert from "../../redux/actions/alerts"
import "./Alert.scss"

class Alert extends React.Component {
  render(){
    return (
      <>
        <div className={`alert alert-${this.props.active ? "active" : "none"}${this.props.success ? " alert-success" : " alert-error"}`}>
          <p className="alert-message">{this.props.message}</p>
          <div className="alert-indicator"></div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  active: state.alert.active,
  success: state.alert.success,
  message: state.alert.message
})

export default connect(mapStateToProps, {setAlert})(Alert)