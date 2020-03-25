import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Logo from '../components/SVGComponents/Logo'

import UserContext from '../contexts/UserContext'

// MUI stuff
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// Components
import Program from '../components/Program'

const useStyles = makeStyles(theme => ({
  form: {
    textAlign: 'center',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    position: 'relative'
  },
  image: {
    margin: '20px auto 20px auto',
    marginBottom: 14
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative',
    borderRadius: 0,
    boxShadow: 'none',
    fontWeight: 'bold',
    color: 'white'
  },
  progress: {
    position: 'absolute'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    width: '100%',
    position: 'absolute'
  },
  pageTitle: {
    marginBottom: 16
  }
}))

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  cohort: '',
  program: ''
}

const inputProps = {
  step: 1,
  min: 1,
  max: 99
}

const SignUp = ({ history }) => {
  const classes = useStyles()

  const [formData, setFormData] = useState(INITIAL_STATE)
  const [isloading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const { dispatch } = useContext(UserContext)

  const isInvalid =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.password ||
    !formData.cohort ||
    !formData.program ||
    isloading

  const handleInputChange = field => e => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    axios
      .post('/signup', formData)
      .then(res => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        dispatch({ type: 'LOGIN' })
        setIsLoading(false)
        history.push('/dashboard')
      })
      .catch(err => {
        setErrors(err.response.data)
        console.log(err.response.data)
        setIsLoading(false)
      })
  }

  return (
    <div style={{ marginTop: 70 }}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <div className={classes.image}>
            <Logo svgHeight={170} height={'100%'} width={'100%'} />
          </div>
          <Typography variant="h4" className={classes.pageTitle}>
            Sign Up
          </Typography>
          <form noValidate onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                />
              </Grid>
            </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              type="email"
              label="Email"
              name="email"
              autoComplete="email"
              helperText={errors.email}
              error={errors.email ? true : false}
              value={formData.email}
              onChange={handleInputChange('email')}
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
              id="password"
              type="password"
              label="Password"
              name="password"
              autoComplete="password"
              helperText={errors.password}
              error={errors.password ? true : false}
              value={formData.password}
              onChange={handleInputChange('password')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              autoComplete="confirmPassword"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
            />
            <Program
              handleInputChange={handleInputChange}
              class={formData.program}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isInvalid}
              disableElevation
            >
              Login
              {isloading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <Link component={NavLink} to="/login">
              Already have an account? Login
            </Link>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default SignUp
