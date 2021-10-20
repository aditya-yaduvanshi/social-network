import React from "react";
import Alert from "../../components/alert/Alert";
import "./Home.scss";

class Home extends React.Component {
  render() {
    return (
      <>
        <h1 className="text-center">Welcome To Socio!</h1>
        <Alert/>
      </>
    );
  }
}

export default Home;
