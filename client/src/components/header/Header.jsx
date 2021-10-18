import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../redux/actions/auth";
import InputField from "../input-field/InputField"
import "./Header.scss";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      query: ''
    }
  }
  handleClick() {
    this.props.logout();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(event.target[0].value)
  }

  render() {
    return (
      <>
        <header className="container-fluid bg-primary sticky-top">
          <nav className="navbar">
            <div className="navbar-brand">
              <NavLink to="/" className="nav-link text-white">
                Socio
              </NavLink>
            </div>
            <form 
              onSubmit={this.handleSubmit.bind(this)}
              className="navbar-search"
            >
              <InputField
                fieldClass="m-0"
                labelClass="field-label-search"
                inputClass="field-input-search"
                type="text"
                name="query"
                placeholder="Search people, posts, keywords and more."
                autoComplete="search-query"
                onChange={this.handleChange.bind(this)}
                required
              />
            </form>
            <div className="navbar">
              <NavLink to="/" className="nav-link text-white">
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
                    className="btn btn-danger text-white"
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
