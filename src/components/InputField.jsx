import React from "react"


class InputField extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <>
        <div 
          className={`field`} 
          style={fieldStyle}
        >
          <label 
            className={`form-label`}
            htmlFor={this.props.name}
            style={labelStyle}
          >{this.props.placeholder}</label>
          <input 
            className={`field-input ${this.props.className}`}
            type={this.props.type}
            name={this.props.name}
            minLength={this.props.minLength}
            autoComplete={this.props.autoComplete}
            onChange={this.props.handleChange}
            required
            style={inputStyle}
          />
          { this.props.children }
        </div>
      </>
    )
  }
}

const fieldStyle = {
  marginBottom: '3px',
  marginTop: '3px'
}
const labelStyle = {}
const inputStyle = {}


export default InputField