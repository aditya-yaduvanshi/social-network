import React from "react"
import Button from "../button/Button"

class OAuth extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <>
        <div className="oauth">
          <Button
            type="button"
            className="btn btn-danger w-100"
          > Google </Button>
          <Button
            type="button"
            className="btn btn-primary w-100"
          > Facebook </Button>
        </div>
      </>
    )
  }
}

export default OAuth