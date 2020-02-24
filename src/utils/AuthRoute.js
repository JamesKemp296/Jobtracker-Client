import React from 'react'
import { Route, Redirect } from 'react-router-dom'
const AuthRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuth ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  )
}

export default AuthRoute
