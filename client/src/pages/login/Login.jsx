import React from "react";
import {connect} from "react-redux";
import {login} from "../../redux/actions/auth";
import {Redirect, Link} from "react-router-dom";
import "./Login.scss";
import Loader from "../../components/loader/Loader";
import Loading from "../../components/loading/Loading";

// components
import InputField from "../../components/input-field/InputField";
import Button from "../../components/button/Button";
import Verification from "../verification/Verification";
//import OAuth from "../../components/oauth/OAuth";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  }

  //handleOAuth(res) {
  //  this.props.oauth(res);
  //}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    if (this.props.loggedin) return <Redirect to="/" />;

    if (this.props.loading) return <Loading />;

    if(this.props.verifyError) return <Verification/>

    return (
      <>
        <div className="login">
          <div className="login-wrap">
            <h1 className="text-center">Login To Account</h1>
            <form onSubmit={this.handleSubmit.bind(this)} className="form">
              <InputField
                className="form-control"
                type="email"
                name="email"
                autoComplete="current-email"
                placeholder="Current Email Address."
                onChange={this.handleChange.bind(this)}
                value={this.state.email}
                required
                key="login-username"
              />
              <InputField
                className="form-control"
                type="password"
                minLength="6"
                name="password"
                autoComplete="current-password"
                placeholder="Current Login Password."
                onChange={this.handleChange.bind(this)}
                value={this.state.password}
                required
                key="login-password"
              />
              <Button
                type="submit"
                className={`btn btn-primary w-100${
                  this.props.loading ? " field-button-disabled" : ""
                }`}
                key="login-button"
              >
                {this.props.loading ? (
                  <Loader width="20" height="20" />
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
            <div className="auth-links">
              <Link to="/signup"> Create Account </Link>
              <Link to="/reset-password"> Reset Password </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedin: state.auth.loggedin,
  loading: state.auth.loading,
  verifyError: state.auth.verifyError
});

export default connect(mapStateToProps, {login})(Login);
