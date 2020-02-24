import React, { useContext } from 'react'
import { theme } from '../theme'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

// Material UI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

const Navbar = ({ isAuth }) => (
  <>{isAuth ? <NavbarAuth isAuth={isAuth} /> : <NavbarUnAuth />}</>
)

const NavbarAuth = () => {
  const colors = theme.colors
  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: colors.primary
    }
  }))
  const classes = useStyles()

  let history = useHistory()
  const { dispatch } = useContext(UserContext)

  const logout = () => {
    localStorage.removeItem('FBIdToken')
    dispatch({ type: 'LOGOUT' })
    history.push('/')
  }
  return (
    <AppBar className={classes.root}>
      <Toolbar className="nav-container">
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

const NavbarUnAuth = () => {
  const colors = theme.colors
  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: colors.primary
    }
  }))
  const classes = useStyles()
  return (
    <AppBar className={classes.root}>
      <Toolbar className="nav-container">
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          SignUp
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
