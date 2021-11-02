import React from "react";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-native";

const ProRoute = ({loggedin, component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        loggedin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  loggedin: state.auth.loggedin,
});

export default connect(mapStateToProps, {})(ProRoute);
