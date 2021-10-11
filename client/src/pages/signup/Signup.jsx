import React from "react"
import Auth from "../../redux/actions/auth"
import "./Signup.scss"

// components
import InputField from "../../components/input-field/InputField"
import Button from "../../components/button/Button"


class Signup extends React.Component {
  constructor(){
    super()
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
    Auth.signup(...this.state.formData)
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
              Create A New Account
            </h1>
            <form 
              onSubmit={this.handleSubmit}
              className="form"
            >
              <InputField 
                className="form-control"
                type="text"
                name="name"
                autoComplete="fullname"
                placeholder="your full name..."
                onChange={this.handleChange}
                required
                key="signup-fname"
              />
              <InputField 
                className="form-control"
                type="email"
                name="email"
                autoComplete="new-email"
                placeholder="your email address..."
                onChange={this.handleChange}
                required
                key="signup-email"
              />
              <InputField 
                className="form-control"
                type="number"
                name="phone"
                autoComplete="new-phone"
                placeholder="your phone number..."
                onChange={this.handleChange}
                required
                key="signup-phone"
              />
              <InputField 
                className="form-control"
                type="password"
                minLength="6"
                name="password"
                autoComplete="new-password"
                placeholder="set new password..."
                onChange={this.handleChange}
                required
                key="signup-password"
              />
              <InputField 
                className="form-control"
                type="password"
                minLength="6"
                name="password2"
                autoComplete="confirm-password"
                placeholder="confirm password..."
                onChange={this.handleChange}
                required
                key="signup-password2"
              />
              <Button 
                className="btn btn-success w-100"
                type="submit"
              > Sign Up </Button>
            </form>
          </div>
        </div>
      </>
    )
  }
}


export default Signup