import React from "react"

// components
import InputField from "../components/InputField"
import Button from "../components/Button"


class Signup extends React.Component {

  handleSubmit (event) {
    event.preventDefault()
    alert('form submitted')
  }

  handleChange (event) {
    event.preventDefault()
    console.log(event.target.value)
  }

  render(){
    
    return (
      <>
        <div style={signupStyle}>
          <div style={signupWrapStyle}>
            <h1 className="text-center">
              Create A New Account
            </h1>
            <form 
              onSubmit={this.handleSubmit}
              style={formStyle}
              className="row"
            >
              <InputField 
                className="form-control"
                type="text"
                name="fname"
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
                name="new-password"
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
                name="conf-password"
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

const signupStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}
const signupWrapStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  maxWidth: '512px',
  minWidth: '240px',
  border: '1px solid black',
  padding: '2rem 2rem 3rem',
  background: 'white'
}
const formStyle = {
  width: '100%'
}

export default Signup