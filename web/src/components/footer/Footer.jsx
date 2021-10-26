import React from "react";
import "./Footer.scss";

class Footer extends React.Component {
  render() {
    return (
      <>
        <footer className="bg-primary text-white p-3">
          <h5 className="text-center">&copy; Socio. All Rights Reserved. </h5>
        </footer>
      </>
    );
  }
}

export default Footer;
