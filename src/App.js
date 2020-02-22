import React, { useEffect, useContext, useReducer } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles/'
import UserContext from './contexts/UserContext'
import jwtDecode from 'jwt-decode'

// utils
import reducer from './utils/reducer'
import themeFile from './utils/theme'
import AuthRoute from './utils/AuthRoute'

// Components
import NavBar from './components/NavBar'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import SignUp from './pages/SignUp'

const theme = createMuiTheme(themeFile)

// const token = localStorage.FBIdToken
// if (token) {
//   const decodedToken = jwtDecode(token)
//   if (decodedToken.exp * 1000 < Date.now()) {
//     window.location.href = '/login'
//   }
// }
const App = () => {
  const initialState = useContext(UserContext)
  const [state, dispatch] = useReducer(reducer, initialState)

  // keeps userContext authorized if signed in
  useEffect(
    _ => {
      const token = localStorage.FBIdToken
      if (token) {
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('FBIdToken')
          dispatch({ type: 'LOGOUT' })
        } else {
          dispatch({ type: 'LOGIN' })
        }
      }
    },
    [initialState.isAuth]
  )
  return (
    <MuiThemeProvider theme={theme}>
      <UserContext.Provider value={{ state, dispatch }}>
        <div className="App">
          <Router>
            <NavBar isAuth={state.isAuth} />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute
                  path="/login"
                  component={Login}
                  isAuth={state.isAuth}
                />
                <Route
                  path="/signup"
                  component={SignUp}
                  isAuth={state.isAuth}
                />
                <AuthRoute path="/admin" component={Admin} />
              </Switch>
            </div>
          </Router>
        </div>
      </UserContext.Provider>
    </MuiThemeProvider>
  )
}

export default App
