import React from "react"
import { Route } from "react-router-dom"

class ProtectedRoute extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <>
        <Route {...props} render={
          () => {
            isAuth ? <Component/> : <Login/>
          }
        } />
      </>
    )
  } 
}

export default ProtectedRoute