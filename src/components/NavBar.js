import React, { useContext } from 'react'
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
  let history = useHistory()
  const { dispatch } = useContext(UserContext)

  const logout = () => {
    localStorage.removeItem('FBIdToken')
    dispatch({ type: 'LOGOUT' })
    history.push('/')
  }
  return (
    <AppBar style={{ backgroundColor: 'white' }}>
      <Toolbar className="nav-container">
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/admin">
          Admin
        </Button>
        <Button onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}

const NavbarUnAuth = () => {
  return (
    <AppBar style={{ backgroundColor: 'white' }}>
      <Toolbar className="nav-container">
        <Button component={Link} to="/login">
          Login
        </Button>
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/signup">
          SignUp
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
