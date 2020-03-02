import React, { useState, useEffect } from 'react'
import axios from 'axios'

// components
import Copyright from '../components/Copyright'
import Program from '../components/Program'
import Alert from '../components/Alert'

// Material UI Stuff
import Chip from '@material-ui/core/Chip'
import DescriptionIcon from '@material-ui/icons/Description'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import ImageIcon from '@material-ui/icons/Image'
import Tooltip from '@material-ui/core/Tooltip'
import Snackbar from '@material-ui/core/Snackbar'

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
  const [message, setMessage] = useState({})
  const [open, setOpen] = React.useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

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
        console.log(res.data)
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
      .post(`/user`, formData, {
        headers: {
          Authorization: `${fireToken}`
        }
      })

      .then(res => {
        setOpen(true)
        setMessage(res.data)
        fetchProfile()
        setIsLoading(false)
      })
      .catch(err => {
        setErrors(err.response.data)
        console.log(err)
        setIsLoading(false)
      })
  }

  const handleImageChange = async event => {
    setMessage('')
    const image = event.target.files[0]
    if (!image) return
    const picData = new FormData()
    setIsLoading(true)
    const picToken = await localStorage.FBIdToken
    picData.append('image', image, image.name)
    await axios
      .post('user/image', picData, {
        headers: {
          Authorization: `${picToken}`
        }
      })
      .then(res => {
        setOpen(true)
        setMessage(res.data)
        fetchProfile()
        setIsLoading(false)
      })
      .catch(err => {
        setOpen(true)
        setIsLoading(false)
        setErrors(err.response.data)
        console.log(err.response.data)
      })
  }
  const handleFileChange = async event => {
    setMessage('')
    const file = event.target.files[0]
    if (!file) return
    const fileData = new FormData()
    const picToken = await localStorage.FBIdToken
    fileData.append('file', file, file.name)
    await axios
      .post('user/resume', fileData, {
        headers: {
          Authorization: `${picToken}`
        }
      })
      .then(res => {
        setOpen(true)
        setMessage(res.data)
        fetchProfile()
      })
      .catch(err => {
        setOpen(true)
        setIsLoading(false)
        setErrors(err.response.data)
        console.log(err)
      })
  }

  const handleEditFile = () => {
    const fileInput = document.getElementById('fileInput')
    fileInput.click()
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
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
      objectFit: 'cover',
      margin: '20px auto 20px auto'
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      position: 'relative'
    },
    progress: {
      position: 'absolute'
    },
    progressTwo: {
      position: 'absolute',
      top: '20px'
    },
    progressThree: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '40%'
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
              {isloading && (
                <CircularProgress size={180} className={classes.progressTwo} />
              )}
              <div style={{ display: 'flex' }}>
                <Tooltip title="Edit Profile Picture" placement="top">
                  <IconButton
                    onClick={handleEditPicture}
                    className={classes.button}
                  >
                    <ImageIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  hidden="hidden"
                />
                <Tooltip title="Upload Resume" placement="top">
                  <IconButton
                    onClick={handleEditFile}
                    className={classes.button}
                  >
                    <DescriptionIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <input
                  type="file"
                  id="imageInput"
                  onChange={handleImageChange}
                  hidden="hidden"
                />
              </div>
              <Typography
                variant="h5"
                className={classes.pageTitle}
                style={{ marginBottom: '2%' }}
              >
                Welcome, {user.user.firstName}
              </Typography>
              {user.user.resumeUrl && (
                <Link href={user.user.resumeUrl} target="blank">
                  <Chip label="View Resume" clickable />
                </Link>
              )}

              <form noValidate onSubmit={handleSubmit} className={classes.form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="website"
                  type="website"
                  label="Website URL"
                  name="website"
                  autoComplete="website"
                  value={formData.website}
                  onChange={handleInputChange('website')}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="linkedIn"
                  type="linkedIn"
                  label="LinkedIn URL"
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
                  label="GitHub URL"
                  name="github"
                  autoComplete="github"
                  value={formData.github}
                  onChange={handleInputChange('github')}
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

                <Program
                  handleInputChange={handleInputChange}
                  program={formData.program}
                  class={formData.program}
                />

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
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  style={{ top: 70 }}
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleClose}
                >
                  {message.message ? (
                    <Alert onClose={handleClose} severity="success">
                      {message.message}
                    </Alert>
                  ) : (
                    <Alert onClose={handleClose} severity="error">
                      {errors.error}
                    </Alert>
                  )}
                </Snackbar>
              </form>
            </div>

            <Box mt={2}>
              <Copyright />
            </Box>
          </Container>
        </div>
      ) : (
        <CircularProgress size={60} className={classes.progressThree} />
      )}
    </>
  )
}

export default Profile
