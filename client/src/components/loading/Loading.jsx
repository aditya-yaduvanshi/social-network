import React from "react";
import loading from "../../assets/img/loading-buffering.gif"
import "./Loading.scss";

class Loading extends React.Component {
  render() {
    return (
      <>
        <div className="loading">
          <div className="loading-wrap text-center">
            <img src={loading} alt="loading" />
            <h1>LOADING</h1>
          </div>
        </div>
      </>
    );
  }
}

export default Loading;
