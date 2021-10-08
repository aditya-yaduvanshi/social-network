import React from 'react'
import { Link } from 'react-router-dom'
import { SignupForm } from '../../components/auth-form/AuthForm'
import OAuth from '../../components/oauth/OAuth'
import './UserAuth.scss'


class Signup extends React.Component {
  constructor(props){
    super(props)
  }

  handleChange = async (event) => {
    //
  }

  createAccount = async (event) => {
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
                className="user-auth-header-link login"
              > LogIn </Link>
              <Link 
                to="/signup" 
                className="user-auth-header-link active signup"
              > SignUp </Link>
            </div>
            <div className="user-auth-main">
              <SignupForm/>
              <OAuth/>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Signup