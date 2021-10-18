import React from "react";
import "./InputField.scss";

class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className={`field ${this.props.fieldClass}`}>
          <input
            className={`field-input ${this.props.className} ${this.props.inputClass}`}
            type={this.props.type}
            name={this.props.name}
            minLength={this.props.minLength}
            autoComplete={this.props.autoComplete}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            required
          />
          <label className={`field-label ${this.props.labelClass}`} htmlFor={this.props.name}>
            {this.props.placeholder}
          </label>
          {this.props.children}
        </div>
      </>
    );
  }
}

export default InputField;
