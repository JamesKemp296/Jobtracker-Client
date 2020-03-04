import React from 'react'
import { Link } from 'react-router-dom'

// Material UI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

const Header = ({ isAuth, logout }) => (
  <Container maxWidth="lg">
    <Grid container justify="space-between">
      <Grid item xs={2}>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
      </Grid>
      <Grid item xs={10} container justify="flex-end">
        <div>
          {isAuth ? (
            <>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                SignUp
              </Button>
            </>
          )}
        </div>
      </Grid>
    </Grid>
  </Container>
)

export default Header
