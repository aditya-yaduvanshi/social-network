import React from "react";
import {connect} from "react-redux";
import {login, oauth} from "../../redux/actions/auth";
import {Redirect, Link} from "react-router-dom";
import "./Login.scss";

// components
import InputField from "../../components/input-field/InputField";
import Button from "../../components/button/Button";
import OAuth from "../../components/oauth/OAuth";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login({
      username: this.state.username,
      password: this.state.password,
    });
  }

  handleOAuth(res) {
    this.props.oauth(res)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    if (this.props.loggedin) return <Redirect to="/" />;

    return (
      <>
        <div className="login">
          <div className="login-wrap">
            <h1 className="text-center">Account Login</h1>
            <form onSubmit={this.handleSubmit.bind(this)} className="form">
              <InputField
                className="form-control"
                type="text"
                name="username"
                autoComplete="current-username"
                placeholder="Username, Phone or Email."
                onChange={this.handleChange.bind(this)}
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
                required
                key="login-password"
              />
              <Button type="submit" className="btn btn-primary w-100">
                Log In
              </Button>
            </form>
            <h6 className="d-flex mt-3">
              Don't have an account?
              <Link to="/signup"> Sign Up </Link>
            </h6>
            <OAuth onOAuth={this.handleOAuth.bind(this)} />
          </div>
        </div>
      </>
    );
  }
}

/*
Login.propTypes = {
  login: PropTypes.func.isRequired,
  loggedin: PropTypes.bool,
};
*/

const mapStateToProps = (state) => ({
  loggedin: state.auth.loggedin,
});

export default connect(mapStateToProps, {login, oauth})(Login);
