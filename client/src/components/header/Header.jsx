import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../redux/actions/auth";
import "./Header.scss";

class Header extends React.Component {
  constructor() {
    super();
  }
  handleClick() {
    this.props.logout();
  }

  render() {
    return (
      <>
        <header className="container-fluid bg-primary sticky-top">
          <nav className="navbar">
            <div className="navbar-brand">
              <NavLink to="/" className="navbar-brand text-white">
                Social Network
              </NavLink>
            </div>
            <div className="navbar">
              <NavLink to="/" className="nav-link active text-white">
                Home
              </NavLink>
              {this.props.loggedin ? (
                <>
                  <NavLink 
                    to="/"
                    className="nav-link text-white"
                  > { this.props.user.split("@", 10)[0] } </NavLink>
                  <NavLink
                    to="#!"
                    className="btn btn-danger nav-link text-white"
                    onClick={this.handleClick.bind(this)}
                  > Logout </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="nav-link text-white">
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="nav-link text-white">
                    Signup
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </header>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedin: state.auth.loggedin,
  user: state.auth.user
});

export default connect(mapStateToProps, {logout})(Header);
