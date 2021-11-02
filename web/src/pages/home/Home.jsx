import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./Home.scss";

class Home extends React.Component {
  render(){
    if(!this.props.loggedin)
      return <Redirect to="/login" />
    return (
      <>
        <h1 className="text-center">Welcome To Socio!</h1>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedin: state.auth.loggedin,
})

export default connect(mapStateToProps, {})(Home);
