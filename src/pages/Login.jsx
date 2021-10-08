import React from "react"

// components
import InputField from "../components/InputField"
import Button from "../components/Button"


class Login extends React.Component {

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
        <div style={loginStyle}>
          <div style={loginWrapStyle}>
            <h1 className="text-center">
              Log In To Your Account
            </h1>
            <form 
              onSubmit={this.handleSubmit}
              className="form"
              style={formStyle}
            >
              <InputField 
                className="form-control"
                type="text"
                name="username"
                autoComplete="current-username"
                placeholder="username, phone or email..."
                onChange={this.handleChange}
                required
                key="login-username"
              />
              <InputField 
                className="form-control"
                type="password"
                minLength="6"
                name="login-password"
                autoComplete="current-password"
                placeholder="current login password..."
                onChange={this.handleChange}
                required
                key="login-password"
              />
              <Button 
                type="submit"
                className="btn btn-primary w-100"
              > Log In </Button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

const loginStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}
const loginWrapStyle = {
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

export default Login