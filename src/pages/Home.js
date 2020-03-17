import React from 'react'
import Wynbase from '../images/Wynbase.jpg'

// MUI STUFF
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: `url(${Wynbase})`,
    position: 'relative',
    objectFit: 'cover',

    backgroundPosition: '30% -250px',
    width: '100%',
    height: 450,
    paddingTop: 70,
    margin: 0,
    backgroundRepeat: 'no-repeat',

    // Ipad screen
    '@media (max-width: 1024px)': {
      backgroundPosition: '50% -300px'
    }
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.8,
    margin: 0,
    backgroundColor: '#7FB9C9'
  },
  overlay_text: {
    padding: '200px 0',

    textAlign: 'center'
  }
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Box>
      <Box className={classes.background}>
        <div className={classes.overlay}>
          <Container className={classes.overlay_text}>
            Wyncode is so great and stuff. Track your jobs and stuff here.
          </Container>
        </div>
      </Box>
      <Box>
        <Container>More stuff will go here</Container>
      </Box>
    </Box>
  )
}

export default Home
