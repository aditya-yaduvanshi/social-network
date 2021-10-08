import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Nav.scss'

class Nav extends React.Component {
  render(){
    return (
      <>
        <nav >
          <div className="nav-brand">
            <Link 
              to="/" 
              className="nav-brand-link"
            >SocialNetwork</Link>
          </div>
          <div className="nav-links">
            <ul>
            <li className="nav-item">
                <NavLink 
                  to="/" 
                  className="nav-link"
                >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/login" 
                  className="nav-link"
                >Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/signup" 
                  className="nav-link"
                >Signup</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </>
    )
  }
}

export default Nav