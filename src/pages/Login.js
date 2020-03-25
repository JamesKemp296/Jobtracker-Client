import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import UserContext from '../contexts/UserContext'
import Logo from '../components/SVGComponents/Logo'

// MUI stuff
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'

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

  const { dispatch } = useContext(UserContext)

  const isInvalid = !formData.email || !formData.password || isloading

  const handleInputChange = field => e =>
    setFormData({ ...formData, [field]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    axios
      .post('/login', formData)
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
            Login
          </Typography>
          <form noValidate onSubmit={handleSubmit} className={classes.form}>
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
              disableElevation
            >
              Login
              {isloading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <Link component={NavLink} to="/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Login
