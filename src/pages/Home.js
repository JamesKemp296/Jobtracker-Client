import React from 'react'
import Wynbase from '../images/Wynbase.jpg'

// MUI STUFF
import Typography from '@material-ui/core/Typography'
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
    height: 500,
    paddingTop: 70,
    margin: 0,
    backgroundRepeat: 'no-repeat',
    '@media (max-width: 1024px)': {
      backgroundPosition: '50% -300px'
    },
    '@media (max-width: 700px)': {
      height: 400
    },
    '@media (max-width: 600px)': {
      height: 300
    }
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    backgroundColor: 'rgba(127, 185, 201, 0.8)',
    display: 'grid',
    placeItems: 'center'
  },
  overlay_text: {
    paddingTop: '70px',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  card: {
    minHeight: 250
  },
  heroFont: {
    fontSize: 60,
    fontFamily: 'Raleway Bold',
    '@media (max-width: 1024px)': {
      fontSize: 50
    },
    '@media (max-width: 700px)': {
      fontSize: 30
    },
    '@media (max-width: 600px)': {
      fontSize: 22
    }
  }
}))

const Home = () => {
  const classes = useStyles()
  return (
    <>
      <Box>
        <Box className={classes.background}>
          <div className={classes.overlay}>
            <Container className={classes.overlay_text}>
              <Typography variant="h5" className={classes.heroFont}>
                Welcome to JobTracker
              </Typography>
              <Typography variant="h5" className={classes.heroFont}>
                Tracking Your Job Applications
              </Typography>
              <Typography variant="h5" className={classes.heroFont}>
                Made Easy
              </Typography>
            </Container>
          </div>
        </Box>
        <Box>
          <Container style={{ marginBottom: '60px' }}>
            <Grid
              container
              spacing={2}
              style={{
                textAlign: 'center',
                marginTop: '2%'
              }}
              alignItems="center"
            >
              <Grid item sm={4} xs={12}>
                <Typography
                  variant="h2"
                  color="primary"
                  style={{ fontFamily: 'Raleway Bold' }}
                >
                  800+
                </Typography>
                <Typography
                  variant="h4"
                  style={{ fontFamily: 'Raleway Bold', marginBottom: '5px' }}
                >
                  Graduates
                </Typography>
                <Typography variant="body2">
                  Over 800 web developers, UX/UI designers & digital marketers
                  have graduated from our South Florida campus. We believe in
                  quality education.
                </Typography>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Typography
                  variant="h2"
                  color="primary"
                  style={{ fontFamily: 'Raleway Bold' }}
                >
                  350+
                </Typography>
                <Typography
                  variant="h4"
                  style={{ fontFamily: 'Raleway Bold', marginBottom: '5px' }}
                >
                  Companies
                </Typography>
                <Typography variant="body2">
                  Over 350 companies have hired developers and product designers
                  from Wyncode, ranging from local startups to Amazon, GE
                  Digital, Udacity and Magic Leap.
                </Typography>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Typography
                  variant="h2"
                  color="primary"
                  style={{ fontFamily: 'Raleway Bold' }}
                >
                  4
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    fontFamily: 'Raleway Bold',
                    marginBottom: '5px'
                  }}
                >
                  Major Awards
                </Typography>
                <Typography variant="body2">
                  We have been named Beacon Council Educator of the Year, South
                  Florida Business Journal Start-Up of the Year, Tech.co Best
                  Company Culture, and an Endeavor Company.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Home
