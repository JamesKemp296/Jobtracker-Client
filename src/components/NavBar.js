import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

// MUI stuff
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

// components
import Header from './Header'
import HeaderMobile from './HeaderMobile'

const Navbar = ({ isAuth }) => {
  let history = useHistory()
  const { dispatch } = useContext(UserContext)

  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: 'white',
      color: 'black'
    }
  }))
  const classes = useStyles()

  const isSmallScreen = useMediaQuery('(max-width:600px)')

  const logout = () => {
    localStorage.removeItem('FBIdToken')
    dispatch({ type: 'LOGOUT' })
    history.push('/')
  }

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        {isSmallScreen ? (
          <HeaderMobile logout={logout} isAuth={isAuth} />
        ) : (
          <Header logout={logout} isAuth={isAuth} />
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
