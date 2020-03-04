import React, { useEffect, useContext, useReducer } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles/'
import UserContext from './contexts/UserContext'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

// utils
import reducer from './utils/reducer'
import themeFile from './utils/theme'
import AuthRoute from './utils/AuthRoute'
import UnAuthRoute from './utils/UnAuthRoute'

// Components
import NavBar from './components/NavBar'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import Alumni from './pages/Alumni'

// context
import { ProfileContext } from './contexts/ProfileContext'

const theme = createMuiTheme(themeFile)

axios.defaults.baseURL = `https://us-central1-jobtracker-4f14f.cloudfunctions.net/api`

const App = () => {
  const initialState = useContext(UserContext)
  const [user, setUser] = useContext(ProfileContext)
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchProfile = async token => {
    await axios
      .get(`/user`, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        setUser(res.data)
        console.log(res.data)
      })
      .catch(err => console.log({ err, user }))
  }
  // keeps userContext authorized if signed in
  useEffect(
    _ => {
      const token = localStorage.FBIdToken
      if (token && token !== 'Bearer undefined') {
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('FBIdToken')
          dispatch({ type: 'LOGOUT' })
        } else {
          fetchProfile(token)
          dispatch({ type: 'LOGIN' })
        }
      } else {
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('FBIdToken')
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
                <UnAuthRoute
                  path="/signup"
                  component={SignUp}
                  isAuth={state.isAuth}
                />
                <UnAuthRoute
                  path="/login"
                  component={Login}
                  isAuth={state.isAuth}
                />
                <AuthRoute
                  path="/profile"
                  component={Profile}
                  isAuth={state.isAuth}
                />
                <AuthRoute
                  path="/dashboard"
                  component={Dashboard}
                  isAuth={state.isAuth}
                />
                <Route path="/admin" component={Admin} isAuth={state.isAuth} />
                <AuthRoute
                  path="/users/:id"
                  component={Alumni}
                  isAuth={state.isAuth}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </UserContext.Provider>
    </MuiThemeProvider>
  )
}

export default App
