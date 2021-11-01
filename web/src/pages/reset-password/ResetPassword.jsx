import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import "./ResetPassword.scss";
import InputField from "../../components/input-field/InputField";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import Loading from "../../components/loading/Loading";
import {verifyOtp, sendOtp} from "../../redux/actions/otp";
import {reset} from "../../redux/actions/auth";

class ResetPassword extends React.Component {
  state = {
    otp: "",
    email: this.props.location.state ? this.props.location.state.email : "",
    password: "",
    password2: "",
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.otpSent && !this.props.otpVerified && !this.props.resetted) {
      this.props.verifyOtp({
        email: this.state.email,
        otp: this.state.otp,
        type: "reset-password",
      });
    } else if (
      this.props.otpVerified &&
      this.props.otpSent &&
      !this.props.resetted
    ) {
      this.props.reset({
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
      });
    } else if (
      !this.props.otpSent &&
      !this.props.otpVerified &&
      !this.props.resetted
    ) {
      this.props.sendOtp({
        email: this.state.email,
        type: "reset-password",
      });
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.props.sendOtp({
      email: this.state.email,
      type: "reset-password",
    });
  }

  render() {
    if (this.props.loadingOtp || this.props.loadingAuth) return <Loading />;

    if (this.props.resetted) return <Redirect to="/login" />;
    else
      return (
        <>
          <div className="reset">
            <div className="wrap">
              <h1 className="text-center">Reset Password</h1>
              <form onSubmit={this.handleSubmit.bind(this)}>
                {this.props.otpVerified && this.props.otpSent && (
                  <>
                    <InputField
                      className="form-control"
                      type="email"
                      name="email"
                      autoComplete="current-email"
                      placeholder="Current Email."
                      onChange={this.handleChange.bind(this)}
                      value={this.state.email}
                      required
                    />
                    <InputField
                      className="form-control"
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      placeholder="New Password."
                      onChange={this.handleChange.bind(this)}
                      value={this.state.password}
                      required
                    />
                    <InputField
                      className="form-control"
                      type="password"
                      name="password2"
                      autoComplete="confirm-password"
                      placeholder="Confirm Password."
                      onChange={this.handleChange.bind(this)}
                      value={this.state.password2}
                      required
                    />
                    <Button
                      className={`btn btn-primary w-100${
                        this.props.loadingAuth ? " field-button-disabled" : ""
                      }`}
                      type="submit"
                      key="reset-button"
                    >
                      {this.props.loadingAuth ? (
                        <Loader width="20" height="20" />
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </>
                )}
                {this.props.otpSent && !this.props.otpVerified && (
                  <>
                    <InputField
                      className="form-control"
                      type="number"
                      name="otp"
                      autoComplete="new-otp"
                      placeholder="Confirm OTP."
                      onChange={this.handleChange.bind(this)}
                      value={this.state.otp}
                      required
                    />
                    <Button
                      className={`btn btn-primary w-100${
                        this.props.loadingOtp ? " field-button-disabled" : ""
                      }`}
                      type="submit"
                      key="verify-button"
                    >
                      {this.props.loadingOtp ? (
                        <Loader width="20" height="20" />
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>
                    <p>Didn't recieved ?</p>
                    <Button
                      type="reset"
                      onClick={this.handleClick.bind(this)}
                      className="btn btn-primary w-100"
                      key="resend-otp"
                    >
                      Resend OTP
                    </Button>
                  </>
                )}
                {!this.props.otpVerified && !this.props.otpSent && (
                  <>
                    <InputField
                      className="form-control"
                      type="email"
                      name="email"
                      autoComplete="current-email"
                      placeholder="Current Email."
                      onChange={this.handleChange.bind(this)}
                      value={this.state.email}
                      required
                    />
                    <Button
                      className={`btn btn-primary w-100${
                        this.props.loadingOtp ? " field-button-disabled" : ""
                      }`}
                      type="submit"
                      key="send-button"
                    >
                      {this.props.loadingOtp ? (
                        <Loader width="20" height="20" />
                      ) : (
                        "Send OTP"
                      )}
                    </Button>
                  </>
                )}
              </form>
            </div>
          </div>
        </>
      );
  }
}

const mapStateToProps = (state) => ({
  loadingOtp: state.otp.loading,
  loadingAuth: state.auth.loading,
  resetted: state.auth.resetted,
  otpVerified: state.otp.verified,
  otpSent: state.otp.sent,
});

export default connect(mapStateToProps, {verifyOtp, sendOtp, reset})(
  ResetPassword
);
