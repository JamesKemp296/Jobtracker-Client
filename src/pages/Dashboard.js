import React, { useState, useContext } from 'react'
import axios from 'axios'

// components
import JobCard from '../components/JobCard'
import Alert from '../components/Alert'
import SelectStatus from '../components/SelectStatus'

// Material UI Stuff
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'

// context
import { ProfileContext } from '../contexts/ProfileContext'

// JobCardStyles
import useJobCardStyles from '../styles/JobCardStyles'

const INITIAL_STATE = {
  company: '',
  position: '',
  link: '',
  status: ''
}

const Alumni = ({ location }) => {
  const classes = useJobCardStyles()
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [isloading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [user, setUser] = useContext(ProfileContext)
  const [message, setMessage] = useState({})
  const [open, setOpen] = React.useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const isInvalid =
    !formData.company ||
    !formData.position ||
    !formData.link ||
    !formData.status ||
    isloading

  const fetchUser = async () => {
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
      })
      .catch(err => console.log('You fucked up'))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    const fireToken = await localStorage.FBIdToken
    await axios
      .post(`/job`, formData, {
        headers: {
          Authorization: `${fireToken}`
        }
      })

      .then(res => {
        setOpen(true)
        setMessage(res.data)
        fetchUser()
        setIsLoading(false)
        setFormData(INITIAL_STATE)
      })
      .catch(err => {
        setErrors(err.response.data)
        console.log(err)
        setIsLoading(false)
      })
  }

  const handleInputChange = field => e => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <form noValidate onSubmit={handleSubmit} className={classes.form}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="space-between"
            >
              <Grid item sm="auto" xs={12} className={classes.grid}>
                <Typography>New</Typography>
                <Typography>Job</Typography>
              </Grid>
              <Grid item sm={3} xs={12} className={classes.grid}>
                <TextField
                  className={classes.jobField}
                  margin="normal"
                  fullWidth
                  id="company"
                  type="company"
                  label="Company"
                  name="company"
                  autoComplete="company"
                  value={formData.company}
                  onChange={handleInputChange('company')}
                />
              </Grid>
              <Grid item sm={3} xs={12} className={classes.grid}>
                <TextField
                  className={classes.jobField}
                  margin="normal"
                  fullWidth
                  id="position"
                  type="position"
                  label="Position"
                  name="position"
                  autoComplete="position"
                  value={formData.position}
                  onChange={handleInputChange('position')}
                />
              </Grid>
              <Grid item sm={2} xs={12} className={classes.grid}>
                <SelectStatus
                  status={formData.status}
                  handleInputChange={handleInputChange}
                />
              </Grid>
              <Grid item sm={2} xs={12} className={classes.grid}>
                <TextField
                  className={classes.jobField}
                  margin="normal"
                  fullWidth
                  id="link"
                  type="text"
                  label="Link"
                  name="link"
                  autoComplete="link"
                  helperText={errors.link}
                  error={errors.link ? true : false}
                  value={formData.link}
                  onChange={handleInputChange('link')}
                />
              </Grid>
              <Grid item sm={1} xs={12} className={classes.grid}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isInvalid}
                  className={classes.submit}
                >
                  Submit
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
                  <Alert onClose={handleClose} severity="success">
                    {message.message}
                  </Alert>
                </Snackbar>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      {user ? (
        user.jobs.map((job, index) => (
          <JobCard
            key={job.jobId}
            formData={formData}
            setFormData={setFormData}
            company={job.company}
            position={job.position}
            createdAt={job.createdAt}
            status={job.status}
            link={job.link}
            id={job.jobId}
            isloading={isloading}
            errors={errors}
            setIsLoading={setIsLoading}
            setErrors={setErrors}
            fetchUser={fetchUser}
            setMessage={setMessage}
            index={index}
            open={open}
            setOpen={setOpen}
          />
        ))
      ) : (
        <Typography variant="h5" style={{ textAlign: 'center', marginTop: 50 }}>
          No User Job Postings
        </Typography>
      )}
    </div>
  )
}

export default Alumni
