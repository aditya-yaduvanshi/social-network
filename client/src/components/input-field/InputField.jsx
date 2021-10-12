import React from "react"
import "./InputField.scss"


class InputField extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <>
        <div 
          className={`field`} 
        >
          <input 
            className={`field-input ${this.props.className}`}
            type={this.props.type}
            name={this.props.name}
            minLength={this.props.minLength}
            autoComplete={this.props.autoComplete}
            value={this.props.value}
            onChange={this.props.handleChange}
            placeholder={this.props.placeholder}
            required
          />
          <label 
            className={`field-label form-label`}
            htmlFor={this.props.name}
          >{this.props.placeholder}</label>
          { this.props.children }
        </div>
      </>
    )
  }
}


export default InputField