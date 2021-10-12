import React from "react"
import Auth from "../../redux/actions/auth"
import "./Login.scss"

// components
import InputField from "../../components/input-field/InputField"
import Button from "../../components/button/Button"


class Login extends React.Component {
  constructor(){
    super()
    this.state = {
      formData: {
        username: '',
        password: ''
      }
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    Auth.login(
      this.state.formData.username,
      this.state.formData.password
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
        <div className="login">
          <div className="login-wrap">
            <h1 className="text-center">
              Log In To Your Account
            </h1>
            <form 
              onSubmit={this.handleSubmit.bind(this)}
              className="form"
            >
              <InputField 
                className="form-control"
                type="text"
                name="username"
                autoComplete="current-username"
                placeholder="username, phone or email..."
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
                placeholder="current login password..."
                onChange={this.handleChange.bind(this)}
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


export default Login