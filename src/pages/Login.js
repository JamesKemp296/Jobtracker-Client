import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Logo from '../images/logo.png'

// MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

// Components
import Copyright from '../components/Copyright'

const useStyles = makeStyles(theme => ({
  form: {
    textAlign: 'center',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    position: 'relative'
  },
  logo: {
    width: 100,
    margin: '20px auto 20px auto'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
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

const INITIAL_STATE = {
  email: '',
  password: ''
}

const Login = ({ history }) => {
  const classes = useStyles()

  const [formData, setFormData] = useState(INITIAL_STATE)
  const [isloading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const isInvalid = !formData.email || !formData.password || isloading

  const handleInputChange = field => e =>
    setFormData({ ...formData, [field]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    axios
      .post('/login', formData)
      .then(res => {
        console.log(res.data)
        setIsLoading(false)
        history.push('/')
      })
      .catch(err => {
        setErrors(err.response.data)
        console.log(err.response.data)
        setIsLoading(false)
      })
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={Logo} alt="wyncode logo" className={classes.logo} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            type="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus={true}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={formData.email}
            onChange={handleInputChange('email')}
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
            Login
            {isloading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <Link href="signup" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </form>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

export default Login
