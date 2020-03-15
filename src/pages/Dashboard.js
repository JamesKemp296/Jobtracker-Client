import React, { useState, useContext } from 'react'
import axios from 'axios'

// components
import NewJobForm from '../components/NewJobForm'
import JobCard from '../components/JobCard'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Alert from '../components/Alert'

// Material UI Stuff
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
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

const Alumni = ({ match, history }) => {
  const classes = useJobCardStyles()
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [isloading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [user, setUser] = useContext(ProfileContext)
  const [message, setMessage] = useState({})
  const [open, setOpen] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isSmallScreen = useMediaQuery('(max-width:600px)')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

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
        setIsModalOpen(false)
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
      {!isSmallScreen ? (
        <NewJobForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          isloading={isloading}
          formData={formData}
        />
      ) : (
        <>
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleModalOpen}
            style={{ position: 'fixed', right: 25, bottom: 25, zIndex: 5 }}
          >
            <AddIcon />
          </Fab>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isModalOpen}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={isModalOpen}>
              <NewJobForm
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                isloading={isloading}
                formData={formData}
                isModalOpen={isModalOpen}
              />
            </Fade>
          </Modal>
        </>
      )}
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
            path={match.path}
            history={history}
          />
        ))
      ) : (
        <Typography variant="h5" style={{ textAlign: 'center', marginTop: 50 }}>
          No User Job Postings
        </Typography>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        style={{ top: 70 }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          className={classes.successAlert}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Alumni
