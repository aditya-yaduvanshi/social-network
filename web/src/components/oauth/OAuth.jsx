import React from "react";
import Button from "../button/Button";

class OAuth extends React.Component {

  render() {
    return (
      <>
        <div className="oauth">
          <Button type="button" className="btn btn-danger w-100" key="google-button">
            Google
          </Button>
          <Button type="button" className="btn btn-primary w-100" key="fb-button">
            Facebook
          </Button>
        </div>
      </>
    );
  }
}

export default OAuth;
