import React from 'react'
import Wynbase from '../images/Wynbase.jpg'

// MUI STUFF
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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

    margin: 0,
    backgroundColor: 'rgba(127, 185, 201, 0.8)'
  },
  overlay_text: {
    padding: '200px 0',
    // fontWeight: 'bold',
    postion: 'absolute',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  card: {
    minHeight: 250
  }
}))

const Home = () => {
  const classes = useStyles()
  const isSmallScreen = useMediaQuery('(max-width: 1024px)')
  return (
    <>
      <Box>
        <Box className={classes.background}>
          <div className={classes.overlay}>
            {isSmallScreen ? (
              <Container className={classes.overlay_text}>
                <Typography variant="h5" style={{ fontFamily: 'Raleway Bold' }}>
                  Welcome to JobTracker
                </Typography>
                <Typography variant="h5" style={{ fontFamily: 'Raleway Bold' }}>
                  Tracking Your Job Applications
                </Typography>
                <Typography variant="h5" style={{ fontFamily: 'Raleway Bold' }}>
                  Made Easy
                </Typography>
              </Container>
            ) : (
              <Container className={classes.overlay_text}>
                <Typography variant="h2" style={{ fontFamily: 'Raleway Bold' }}>
                  Welcome to JobTracker
                </Typography>
                <Typography variant="h2" style={{ fontFamily: 'Raleway Bold' }}>
                  Tracking Your Job Applications Made Easy
                </Typography>
              </Container>
            )}
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
                // lineHeight: '250px'
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
