import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Copyright from '../components/Copyright'

// Material UI Stuff
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const INITIAL_STATE = {
  cohort: '',
  program: '',
  github: '',
  website: '',
  linkedIn: ''
}

const inputProps = {
  step: 1,
  min: 1,
  max: 99
}

const Profile = () => {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [isloading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [user, setUser] = useState(null)

  const isInvalid = !formData.cohort || !formData.program || isloading

  const handleInputChange = field => e => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const fetchProfile = async () => {
    const token = await localStorage.FBIdToken
    await axios
      .get(`/user`, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        setUser(res.data)
        setFormData({
          ...formData,
          github: res.data.user.github ? res.data.user.github : '',
          website: res.data.user.website ? res.data.user.website : '',
          linkedIn: res.data.user.linkedIn ? res.data.user.linkedIn : '',
          cohort: res.data.user.cohort,
          program: res.data.user.program
        })
      })
      .catch(err => console.log('You fucked up'))
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    const fireToken = await localStorage.FBIdToken
    await axios
      .post(
        (`/user`,
        {
          headers: {
            Authorization: `${fireToken}`
          }
        })
      )
      .then(res => {
        console.log(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const useStyles = makeStyles(theme => ({
    form: {
      textAlign: 'center',
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      position: 'relative'
    },
    logo: {
      width: 180,
      height: 180,
      display: 'block',
      alignItems: 'center'
    },

    submit: {
      margin: theme.spacing(3, 0, 2),
      position: 'relative'
    },
    progress: {
      position: 'absolute'
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      width: '100%',
      position: 'absolute'
    }
  }))

  const classes = useStyles()

  return (
    <>
      {user ? (
        <div>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <img
                src={user.user.imageUrl}
                alt="wyncode logo"
                className={classes.logo}
              />
              <Typography variant="h3" className={classes.pageTitle}>
                Sign Up
              </Typography>
              <form noValidate onSubmit={handleSubmit} className={classes.form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="website"
                  type="website"
                  label="Website"
                  name="website"
                  autoComplete="website"
                  value={formData.website}
                  onChange={handleInputChange('website')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="cohort"
                  type="number"
                  inputProps={inputProps}
                  label="Cohort #"
                  name="cohort"
                  autoComplete="cohort"
                  helperText={errors.cohort}
                  error={errors.cohort ? true : false}
                  value={formData.cohort}
                  onChange={handleInputChange('cohort')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="linkedIn"
                  type="linkedIn"
                  label="LinkedIn"
                  name="linkedIn"
                  autoComplete="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange('linkedIn')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="github"
                  type="github"
                  label="GitHub"
                  name="github"
                  autoComplete="github"
                  value={formData.github}
                  onChange={handleInputChange('github')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="program"
                  type="program"
                  label="Program"
                  name="program"
                  helperText={errors.program}
                  error={errors.program ? true : false}
                  autoComplete="program"
                  value={formData.program}
                  onChange={handleInputChange('program')}
                />

                {errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isInvalid}
                >
                  Update User Info
                  {isloading && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </div>
      ) : (
        <CircularProgress size={60} className={classes.progressOne} />
      )}
    </>
  )
}

export default Profile
