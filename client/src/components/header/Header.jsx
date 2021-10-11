import React from "react"
import { NavLink } from "react-router-dom"
import "./Header.scss"


class Header extends React.Component {
  render(){
    return (
      <>
        <header className="container-fluid bg-white">
          <nav className="navbar">
            <div className="navbar-brand">
              <NavLink 
                to="/" 
                className="navbar-brand"
              > Social Network </NavLink>
            </div>
            <div className="navbar">
              <NavLink 
                to="/" 
                className="nav-link active"
              > Home </NavLink>
              <NavLink 
                to="/login" 
                className="nav-link"
              > Login </NavLink>
              <NavLink 
                to="/signup" 
                className="nav-link"
              > Signup </NavLink>
            </div>
          </nav>
        </header>
      </>
    )
  }
}


export default Header