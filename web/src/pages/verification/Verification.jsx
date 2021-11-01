import React from "react";
import {Redirect} from "react-router-dom";
import Loading from "../../components/loading/Loading";
import {connect} from "react-redux";
import {sendOtp, verifyOtp} from "../../redux/actions/otp";
import Button from "../../components/button/Button";
import "./Verification.scss";
import InputField from "../../components/input-field/InputField";

class Verification extends React.Component {
  state = {
    email: this.props.location.state ? this.props.location.state.email : "",
    otp: "",
  };

  handleSubmit(event) {
    event.preventDefault();
    if (!this.props.otpSent && !this.props.otpVerified) {
      this.props.sendOtp({
        email: this.state.email,
        type: "email-verification",
      });
    } else if (this.props.otpSent && !this.props.otpVerified) {
      this.props.verifyOtp({
        email: this.state.email,
        otp: this.state.otp,
        type: "email-verification",
      });
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.props.sendOtp({
      email: this.state.email,
      type: "email-verification",
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    if (this.props.loading) return <Loading />;
    if (this.props.authVerified) return <Redirect to="/login" />;
    else
      return (
        <>
          <div className="verify">
            <div className="verify-wrap">
              <h2 className="text-center">Email Verification</h2>
              <form onSubmit={this.handleSubmit.bind(this)}>
                {!this.props.otpSent && !this.props.otpVerified && (
                  <>
                    <InputField
                      type="email"
                      name="email"
                      className="form-control"
                      autoComplete="current-email"
                      placeholder="Current Email."
                      onChange={this.handleChange.bind(this)}
                      value={this.state.email}
                      required
                    />
                    <Button type="submit" className="btn btn-primary w-100">
                      Send Verification OTP
                    </Button>
                  </>
                )}
                {this.props.otpSent && !this.props.otpVerified && (
                  <>
                    <InputField
                      type="text"
                      name="otp"
                      className="form-control"
                      autoComplete="confirm-otp"
                      placeholder="Confirm OTP."
                      onChange={this.handleChange.bind(this)}
                      value={this.state.otp}
                      required
                    />
                    <Button type="submit" className="btn btn-primary w-100">
                      Verify OTP
                    </Button>
                    <p>Didn't recieved OTP?</p>
                    <Button
                      type="reset"
                      onClick={this.handleClick.bind(this)}
                      className="btn btn-primary w-100"
                    >
                      Resend OTP
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
  otpVerified: state.otp.verified,
  loading: state.otp.loading,
  otpSent: state.otp.sent,
  authVerified: state.auth.verified,
});

export default connect(mapStateToProps, {sendOtp, verifyOtp})(Verification);
