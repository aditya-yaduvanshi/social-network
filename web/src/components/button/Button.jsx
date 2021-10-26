import React from "react";
import "./Button.scss";

class Button extends React.Component {
  render() {
    return (
      <>
        <div className="mt-3 field">
          <button
            type={this.props.type}
            onClick={this.props.onClick}
            className={`field-button ${this.props.className}`}
            {...this.props}
          >
            {this.props.children}
          </button>
        </div>
      </>
    );
  }
}

export default Button;
