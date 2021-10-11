import React from "react"
import loadingGif from '../assets/loading.gif'
import "./Loading.scss"

class Loading extends React.Component {
  render(){
    return (
      <>
        <div className="container">
          <img src={loadingGif} alt="Loading" />
          <h1>Loading please wait ...</h1>
        </div>
      </>
    )
  }
}

export default Loading