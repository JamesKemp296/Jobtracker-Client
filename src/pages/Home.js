import React from 'react'
import Background from '../images/background.jpg'

// MUI STUFF
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: `url(${Background})`,
    objectFit: 'cover',
    width: '100%',
    height: 400,
    paddingTop: 70,
    margin: 0
  },
  card: {
    width: '100%'
  }
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Box>
      <Box className={classes.background}>
        <Container>
          Wyncode is so great and stuff. Track your jobs and stuff here.
        </Container>
      </Box>
      <Box>
        <Container>More stuff will go here</Container>
      </Box>
    </Box>
  )
}

export default Home
