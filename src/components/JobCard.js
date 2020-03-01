import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'

// Material UI Stuff
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom: 20,
    height: '100px'
  },
  image: {
    minWidth: 200,
    objectFit: 'cover'
  },
  content: {
    padding: 25
  },
  cohort: {
    display: 'grid',
    placeItems: 'center',
    marginLeft: 'auto',
    padding: 25,
    width: '20%'
  },
  jobTitle: {
    textAlign: 'center'
  },
  progressThree: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%'
  },
  twentyPercent: {
    width: '20%'
  },
  tenPercent: {
    width: '10%'
  },
  jobField: {
    margin: 5
  }
})

const JobCard = ({
  company,
  position,
  status,
  link,
  createdAt,
  id,
  formData,
  setFormData,
  setIsLoading,
  isloading,
  setMessage,
  setErrors,
  fetchUser,
  index
}) => {
  const classes = useStyles()

  const [edit, setEdit] = useState(false)
  const [jobData, setJobData] = useState({
    company,
    position,
    status,
    link
  })

  const handleInputChange = field => e => {
    setJobData({ ...jobData, [field]: e.target.value })
  }

  const handleEditMode = () => {
    setEdit(!edit)
  }

  const handleEditJob = async e => {
    e.preventDefault()

    setIsLoading(true)
    const fireToken = await localStorage.FBIdToken
    await axios
      .post(`/job/${id}`, jobData, {
        headers: {
          Authorization: `${fireToken}`
        }
      })

      .then(res => {
        setMessage(res.data)
        fetchUser()
        setIsLoading(false)
        setEdit(!edit)
        const timer = setTimeout(() => {
          setMessage('')
          clearTimeout(timer)
        }, 2500)
      })
      .catch(err => {
        // setErrors(err.response.data)
        // const timer = setTimeout(() => {
        //   setErrors('')
        //   clearTimeout(timer)
        // }, 2500)
        console.log(err)
        setIsLoading(false)
      })
  }

  const deleteJob = async () => {
    const fireToken = await localStorage.FBIdToken
    await axios
      .delete(`/job/${id}`, {
        headers: {
          Authorization: `${fireToken}`
        }
      })
      .then(data => {
        fetchUser()
      })
      .catch(err => {
        console.log(err)
      })
  }

  console.log({ edit })
  return (
    <div>
      {!edit ? (
        <div>
          <Card className={classes.card}>
            <CardContent
              className={classes.content}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <div className={classes.tenPercent} style={{ display: 'flex' }}>
                <button
                  onClick={handleEditMode}
                  style={{ border: '0', background: 'transparent' }}
                >
                  <EditIcon />
                </button>
                <button
                  onClick={deleteJob}
                  style={{ border: '0', background: 'transparent' }}
                >
                  <DeleteIcon />
                </button>
              </div>
              <Typography
                variant="h5"
                color="secondary"
                className={classes.twentyPercent}
              >
                {company}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.twentyPercent}
              >
                {position}
              </Typography>
              <Typography variant="body2" className={classes.twentyPercent}>
                {status}
              </Typography>
              <Link href={link} target="blank">
                Job Link
              </Link>
            </CardContent>
            <Typography variant="body2" className={classes.cohort}>
              {moment(createdAt)
                .startOf('minute')
                .fromNow()}
            </Typography>
          </Card>
        </div>
      ) : (
        <>
          <Card className={classes.card}>
            <form
              onSubmit={handleEditJob}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '25px'
              }}
            >
              <button
                onClick={() => setEdit(!edit)}
                style={{ border: '0', background: 'transparent' }}
              >
                <CloseIcon />
              </button>
              <TextField
                className={classes.jobField}
                margin="normal"
                fullWidth
                id="edit-company"
                type="company"
                label="company"
                name="company"
                autoComplete="company"
                value={jobData.company}
                onChange={handleInputChange('company')}
              />
              <TextField
                className={classes.jobField}
                margin="normal"
                fullWidth
                id="edit-position"
                type="position"
                label="position"
                name="position"
                autoComplete="position"
                value={jobData.position}
                onChange={handleInputChange('position')}
              />
              <TextField
                className={classes.jobField}
                margin="normal"
                fullWidth
                id="edit-status"
                type="text"
                label="status #"
                name="status"
                autoComplete="status"
                // helperText={errors.status}
                // error={errors.status ? true : false}
                value={jobData.status}
                onChange={handleInputChange('status')}
              />
              <TextField
                className={classes.jobField}
                margin="normal"
                fullWidth
                id="edit-link"
                type="text"
                label="link #"
                name="link"
                autoComplete="link"
                // helperText={errors.link}
                // error={errors.link ? true : false}
                value={jobData.link}
                onChange={handleInputChange('link')}
              />
              <Button type="submit" variant="contained" color="primary">
                UPDATE
              </Button>
            </form>
          </Card>
        </>
      )}
    </div>
  )
}

export default JobCard
