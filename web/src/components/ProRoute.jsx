import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProRoute = ({component: Component, loggedin, ...rest}) => {
  return <Route {...rest} render={(props) => {
    loggedin ? <Component {...props} /> : <Redirect to="/login" />
  }} />
}

const mapStateToProps = (state) => ({
  loggedin: state.auth.loggedin,
})

export default connect(mapStateToProps, {})(ProRoute);