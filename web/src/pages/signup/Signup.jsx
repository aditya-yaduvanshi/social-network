import React from "react";
import {connect} from "react-redux";
import {signup} from "../../redux/actions/auth";
import "./Signup.scss";
import Loader from "../../components/loader/Loader";

// components
import InputField from "../../components/input-field/InputField";
import Button from "../../components/button/Button";
//import OAuth from "../../components/oauth/OAuth";
import {Link, Redirect} from "react-router-dom";
import Loading from "../../components/loading/Loading";

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    password2: "",
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.signup({
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
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
    if (this.props.loading) return <Loading />;

    if (this.props.loggedin) return <Redirect to="/" />;
    else if (this.props.signedup)
      return (
        <Redirect
          to={{
            pathname: "/email-verification",
            state: {email: this.state.email},
          }}
        />
      );
    else
      return (
        <>
          <div className="signup">
            <div className="signup-wrap">
              <h1 className="text-center">Create Account</h1>
              <form onSubmit={this.handleSubmit.bind(this)} className="form">
                <InputField
                  className="form-control"
                  type="email"
                  name="email"
                  autoComplete="new-email"
                  placeholder="Your Email Address."
                  onChange={this.handleChange.bind(this)}
                  value={this.state.email}
                  required
                  key="signup-email"
                />
                <InputField
                  className="form-control"
                  type="password"
                  minLength="6"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Set New Password."
                  onChange={this.handleChange.bind(this)}
                  value={this.state.password}
                  required
                  key="signup-password"
                />
                <InputField
                  className="form-control"
                  type="password"
                  minLength="6"
                  name="password2"
                  autoComplete="confirm-password"
                  placeholder="Confirm Password."
                  onChange={this.handleChange.bind(this)}
                  value={this.state.password2}
                  required
                  key="signup-password2"
                />
                <Button
                  className={`btn btn-primary w-100${
                    this.props.loading ? " field-button-disabled" : ""
                  }`}
                  type="submit"
                  key="signup-button"
                >
                  {this.props.loading ? (
                    <Loader width="20" height="20" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
              <div className="auth-links">
                <Link to="/login"> Login To Account </Link>
                <Link to="/email-verification"> Verify Account </Link>
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
  signedup: state.auth.signedup,
  verified: state.auth.verified,
});

export default connect(mapStateToProps, {signup})(Signup);
