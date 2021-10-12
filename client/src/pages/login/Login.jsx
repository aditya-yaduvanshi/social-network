import React from "react"
import { login } from "../../redux/actions/auth"
import { Redirect, Link } from "react-router-dom"
import "./Login.scss"

// components
import InputField from "../../components/input-field/InputField"
import Button from "../../components/button/Button"


class Login extends React.Component {
  constructor({login, loggedin}){
    super({login, loggedin})
    this.state = {
      formData: {
        username: '',
        password: ''
      }
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    login(
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
    if(this.props.loggedin)
      return <Redirect to="/"/>
    
    return (
      <>
        <div className="login">
          <div className="login-wrap">
            <h1 className="text-center">
              Account Login
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
                placeholder="Username, Phone or Email"
                value={this.state.formData.username}
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
                placeholder="Current Login Password"
                value={this.state.formData.password}
                onChange={this.handleChange.bind(this)}
                required
                key="login-password"
              />
              <Button 
                type="submit"
                className="btn btn-primary w-100"
              > Log In </Button>
            </form>
            <h6 className="d-flex mt-3">
              Don't have an account? 
              <Link to="/signup"> Sign Up </Link>
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


export default Login