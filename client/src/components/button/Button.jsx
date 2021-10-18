import React from "react";
import "./Button.scss";

class Button extends React.Component {

  render() {
    return (
      <>
        <div className="mt-3">
          <button
            type={this.props.type}
            onClick={this.props.onClick}
            className={this.props.className}
            {...this.props}
          >
            <b>{this.props.children}</b>
          </button>
        </div>
      </>
    );
  }
}

export default Button;
