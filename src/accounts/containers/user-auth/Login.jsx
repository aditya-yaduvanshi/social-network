import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../../components/auth-form/AuthForm'
import OAuth from '../../components/oauth/OAuth'
import './UserAuth.scss'


class Login extends React.Component {
  constructor(props){
    super(props)
  }

  handleChange = async (event) => {
    //
  }

  loginAccount = async (event) => {
    //
  }

  render(){
    return (
      <>
        <div className="user-auth">
          <div className="user-auth-wrap">
            <div className="user-auth-header">
              <Link 
                to="/login" 
                className="user-auth-header-link active login"
              > LogIn </Link>
              <Link 
                to="/signup" 
                className="user-auth-header-link signup"
              > SignUp </Link>
            </div>
            <div className="user-auth-main">
              <LoginForm/>
              <OAuth/>
            </div>
          </div>
        </div>
      </>
    )
  }
}


export default Login