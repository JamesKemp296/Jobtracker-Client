import React from 'react'
import { Link } from 'react-router-dom'
// Material UI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

const Navbar = () => {
  return (
    <AppBar style={{ backgroundColor: 'white' }}>
      <Toolbar className="nav-container">
        <Button component={Link} to="/login">
          Login
        </Button>
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/admin">
          Admin
        </Button>
        <Button component={Link} to="/signup">
          SignUp
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
