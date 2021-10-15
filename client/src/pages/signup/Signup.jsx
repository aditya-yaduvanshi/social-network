import React from "react";
import {connect} from "react-redux";
import {signup, oauth} from "../../redux/actions/auth";
//import PropTypes from "prop-types";
import "./Signup.scss";

// components
import InputField from "../../components/input-field/InputField";
import Button from "../../components/button/Button";
import OAuth from "../../components/oauth/OAuth";
import {Link, Redirect} from "react-router-dom";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      password2: "",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signup({
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      password2: this.state.password2,
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
        <div className="signup">
          <div className="signup-wrap">
            <h1 className="text-center">Create Account</h1>
            <form onSubmit={this.handleSubmit.bind(this)} className="form">
              <InputField
                className="form-control"
                type="text"
                name="name"
                autoComplete="fullname"
                placeholder="Your Full Name."
                onChange={this.handleChange.bind(this)}
                required
                key="signup-fname"
              />
              <InputField
                className="form-control"
                type="email"
                name="email"
                autoComplete="new-email"
                placeholder="Your Email Address."
                onChange={this.handleChange.bind(this)}
                required
                key="signup-email"
              />
              <InputField
                className="form-control"
                type="number"
                name="phone"
                autoComplete="new-phone"
                placeholder="Your Phone Number."
                onChange={this.handleChange.bind(this)}
                required
                key="signup-phone"
              />
              <InputField
                className="form-control"
                type="password"
                minLength="6"
                name="password"
                autoComplete="new-password"
                placeholder="Set New Password."
                onChange={this.handleChange.bind(this)}
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
                required
                key="signup-password2"
              />
              <Button className="btn btn-success w-100" type="submit">
                Sign Up
              </Button>
            </form>
            <h6 className="d-flex mt-3">
              Already have an account?
              <Link to="/login"> Log In </Link>
            </h6>
            <OAuth onOAuth={this.handleOAuth.bind(this)} />
          </div>
        </div>
      </>
    );
  }
}

/*
Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  oauth: PropTypes.func.isRequired,
  loggedin: PropTypes.bool,
};
*/
const mapStateToProps = (state) => ({
  loggedin: state.auth.loggedin,
});

export default connect(mapStateToProps, {signup, oauth})(Signup);
