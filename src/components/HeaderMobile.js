import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// MUI STUFF
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DashboardIcon from '@material-ui/icons/Dashboard'

const useStyles = makeStyles({
  navList: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  logout: {
    backgroundColor: 'red',
    margin: '10px 0',
    width: '90%',
    color: 'white',
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: 'red'
    }
  }
})

const HeaderMobile = ({ isAuth, logout }) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const toggleDrawer = event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={2}>
          <IconButton
            onClick={toggleDrawer}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10} container justify="flex-end">
          <Button color="inherit" component={Link} to="/">
            <Typography variant="h6">Jobtracker</Typography>
          </Button>
        </Grid>
      </Grid>
      <SwipeableDrawer
        open={isOpen}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <List
          className={classes.navList}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          {isAuth ? (
            <>
              <ListItem button component={Link} to="/profile">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <Divider />
              <Grid container justify="center">
                <Button
                  variant="contained"
                  onClick={logout}
                  className={classes.logout}
                >
                  Logout
                  <ExitToAppIcon />
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/login">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={Link} to="/signup">
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </>
          )}
        </List>
      </SwipeableDrawer>
    </>
  )
}

export default HeaderMobile
