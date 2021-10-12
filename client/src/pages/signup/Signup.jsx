import React from "react"
import { signup } from "../../redux/actions/auth"
import "./Signup.scss"

// components
import InputField from "../../components/input-field/InputField"
import Button from "../../components/button/Button"
import { Link } from "react-router-dom"


class Signup extends React.Component {
  constructor({signup, loggedin}){
    super({signup, loggedin})
    this.state = {
      formData: {
        name: '',
        email: '',
        phone: '',
        password: '',
        password2: ''
      }
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    signup(
      this.state.formData.name,
      this.state.formData.email,
      this.state.formData.phone,
      this.state.formData.password,
      this.state.formData.password2,
    )
  }

  handleChange (event) {
    this.setState({
      ...this.state.formData,
      [event.target.name]: event.target.value
    })
  }

  render(){
    
    return (
      <>
        <div className="signup">
          <div className="signup-wrap">
            <h1 className="text-center">
              Create Account
            </h1>
            <form 
              onSubmit={this.handleSubmit.bind(this)}
              className="form"
            >
              <InputField 
                className="form-control"
                type="text"
                name="name"
                autoComplete="fullname"
                placeholder="Your Full Name."
                value={this.state.formData.name}
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
                value={this.state.formData.email}
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
                value={this.state.formData.phone}
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
                value={this.state.formData.password}
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
                value={this.state.formData.password2}
                onChange={this.handleChange.bind(this)}
                required
                key="signup-password2"
              />
              <Button 
                className="btn btn-success w-100"
                type="submit"
              > Sign Up </Button>
            </form>
            <h6 className="d-flex mt-3">
              Already have an account? 
              <Link to="/login"> Log In </Link>
            </h6>
            <div className="oauth">
              <Button
                type="button"
                className="btn btn-danger w-100"
              > Google </Button>
              <Button
                type="button"
                className="btn btn-primary w-100"
              > Facebook </Button>
            </div>
          </div>
        </div>
      </>
    )
  }
}


export default Signup