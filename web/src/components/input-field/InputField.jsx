import React from "react";
import "./InputField.scss";
import show from "../../assets/img/1x/outline_visibility_black_24dp.png";
import hide from "../../assets/img/1x/outline_visibility_off_black_24dp.png";

class InputField extends React.Component {

  state = {
    icon: show,
    type: this.props.type,
    hidden: true,
  }

  handleClick(event){
    event.preventDefault();
    this.setState({
      hidden: !this.state.hidden,
      type: this.state.type === "text" ? "password" : "text",
      icon: this.state.icon === show ? hide : show
    })
  }

  render() {
    return (
      <>
        <div className={`field ${this.props.fieldClass}`}>
          <input
            className={`field-input ${this.props.className} ${this.props.inputClass}`}
            type={this.state.type}
            name={this.props.name}
            minLength={this.props.minLength}
            autoComplete={this.props.autoComplete}
            onChange={this.props.onChange}
            value={this.props.value}
            placeholder={this.props.placeholder}
            required
          />
          <label className={`field-label ${this.props.labelClass}`} htmlFor={this.props.name}>
            {this.props.placeholder}
          </label>
          { this.props.type === "password" && 
          <button type="button" className="field-show" onClick={this.handleClick.bind(this)}>
            <img src={this.state.icon} alt="" />
          </button>
          }
        </div>
      </>
    );
  }
}

export default InputField;
