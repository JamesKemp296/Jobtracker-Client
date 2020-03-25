import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
// Material UI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import User from './User'
// context
import { ProfileContext } from '../contexts/ProfileContext'
const Header = ({ isAuth, logout }) => {
  const [user, setUser] = useContext(ProfileContext)
  return (
    <Container maxWidth="lg" style={{ padding: 10 }}>
      <Grid container justify="space-between">
        <Grid item xs={2}>
          <Button color="inherit" component={Link} to="/">
            Jobtracker
          </Button>
        </Grid>
        <Grid item xs={10} container justify="flex-end">
          <div>
            {isAuth ? (
              <>
                {user && user.user.admin && (
                  <Button color="inherit" component={Link} to="/admin">
                    Admin
                  </Button>
                )}
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
}
export default Header
