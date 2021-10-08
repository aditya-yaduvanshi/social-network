import React from 'react'
import './AuthForm.scss'


export class LoginForm extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <>
        <form 
          className="auth-form"
          onSubmit={this.props.loginAccount}
        >
          <div className="auth-form-field">
            <label className="auth-form-field-label">Username</label>
            <input 
              className="auth-form-field-input" 
              type="text" 
              name="username"
              autoComplete="current-username"
              onChange={this.props.handleChange}
              required 
            />
          </div>
          <div className="auth-form-field">
            <label className="auth-form-field-label">Password</label>
            <input 
              className="auth-form-field-input" 
              type="password" 
              name="password"
              autoComplete="current-password"
              onChange={this.props.handleChange}
              minLength="6"
              required 
            />
            <button 
              className="auth-form-field-show"
              onClick={this.props.showInput}
            > Show </button>
          </div>
          <div className="auth-form-field">
            <button 
              className="auth-form-field-button" 
              type="submit" 
            > Log In </button>
          </div>
        </form>
      </>
    )
  }
}

export class SignupForm extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <>
        <form 
          className="auth-form"
          onSubmit={this.props.createAccount}
        >
          <div className="auth-form-field">
            <label className="auth-form-field-label">Full Name</label>
            <input 
              className="auth-form-field-input" 
              type="text" 
              name="fname"
              autoComplete="fullname"
              onChange={this.props.handleChange}
              required 
            />
          </div>
          <div className="auth-form-field">
            <label className="auth-form-field-label">Email Address</label>
            <input 
              className="auth-form-field-input" 
              type="email" 
              name="email"
              autoComplete="new-email"
              onChange={this.props.handleChange}
              required 
            />
          </div>
          <div className="auth-form-field">
            <label className="auth-form-field-label">Phone Number</label>
            <input 
              className="auth-form-field-input" 
              type="number" 
              name="phone"
              autoComplete="new-phone"
              onChange={this.props.handleChange}
              required 
            />
          </div>
          <div className="auth-form-field">
            <label className="auth-form-field-label">Password</label>
            <input 
              className="auth-form-field-input" 
              type="password" 
              name="new-password"
              autoComplete="new-password"
              onChange={this.props.handleChange}
              minLength="6"
              required 
            />
            <button 
              className="auth-form-field-show"
              onClick={this.props.showInput}
            > Show </button>
          </div>
          <div className="auth-form-field">
            <button 
              className="auth-form-field-button" 
              type="submit" 
            > Sign Up </button>
          </div>
        </form>
      </>
    )
  }
}


