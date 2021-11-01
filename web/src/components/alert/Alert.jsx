import React from "react";
import {connect} from "react-redux";
import "./Alert.scss";

const Alert = ({alerts}) =>
  alerts != null &&
  alerts.length > 0 &&
  alerts.map((alert) => {
    return (
      <>
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <p className="alert-message">{alert.msg}</p>
          <div className="alert-indicator"></div>
        </div>
      </>
    );
  });

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
