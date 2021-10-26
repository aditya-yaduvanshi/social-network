import React from "react"
import {Redirect} from "react-router-dom"
import Loading from "../../components/loading/Loading"
import {connect} from "react-redux"
import {verifyEmail, getEmailVerifyLink} from "../../redux/actions/auth"
import Button from "../../components/button/Button"
import "./Verification.scss"
import InputField from "../../components/input-field/InputField"

class Verification extends React.Component {
  state = {
    email: "",
    urlId: ""
  }
  
  componentDidMount(){
    let query = new URLSearchParams(this.props.location.search)
    if(!this.props.verified && query.get("email") && query.get("urlId")){
      this.props.verifyEmail({
        email: query.get("email"),
        urlId: query.get("urlId")
      })
    }
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.getEmailVerifyLink({
      email: this.state.email
    })
  }

  handleChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  render(){ 
    if(this.props.verified) return <Redirect to="/login"/>;
    return (
      <>
        <div className="verify">
          {this.props.loading && <Loading msg={this.props.linkSent && "Verification link sent successfully! Please check your email."}/>}
          {!this.props.loading && !this.props.verified && (
            <>
              <div className="verify-wrap">
                <h2 className="text-center">Email Verification</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
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
                  <Button 
                    type="submit"
                    className="btn btn-primary w-100"
                  >Resend Verification Link</Button>
                </form>
              </div>
            </>
          )}
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  verified: state.auth.verified,
  loading: state.auth.loading,
  linkSent: state.auth.linkSent
})

export default connect(mapStateToProps, {verifyEmail, getEmailVerifyLink})(Verification)