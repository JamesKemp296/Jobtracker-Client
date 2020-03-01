import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'

// Material UI Stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'

// JobCardStyles
import useJobCardStyles from '../styles/JobCardStyles'

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
  const classes = useJobCardStyles()

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
    <>
      {!edit ? (
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Grid container alignItems="center">
              <Grid item sm={1} xs={12} style={{ display: 'flex' }}>
                <button onClick={handleEditMode} className={classes.button}>
                  <EditIcon />
                </button>
                <button onClick={deleteJob} className={classes.button}>
                  <DeleteIcon />
                </button>
              </Grid>
              <Grid item sm={3} xs={12}>
                <Typography variant="h5" color="secondary">
                  {company}
                </Typography>
              </Grid>
              <Grid item sm={3} xs={12}>
                <Typography variant="body2" color="textSecondary">
                  {position}
                </Typography>
              </Grid>
              <Grid item sm={2} xs={12}>
                <Typography variant="body2">{status}</Typography>
              </Grid>
              <Grid item sm={1} xs={12}>
                <Link href={link} target="blank">
                  Job Link
                </Link>
              </Grid>
              <Grid item sm={2} xs={12}>
                <Typography variant="body2" className={classes.timeStamp}>
                  {moment(createdAt)
                    .startOf('minute')
                    .fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <form onSubmit={handleEditJob} className={classes.form}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justify="space-between"
              >
                <Grid item sm="auto" xs={12}>
                  <button
                    onClick={() => setEdit(!edit)}
                    className={classes.button}
                  >
                    <CloseIcon />
                  </button>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="edit-company"
                    type="company"
                    label="Company"
                    name="company"
                    autoComplete="company"
                    value={jobData.company}
                    onChange={handleInputChange('company')}
                  />
                </Grid>
                <Grid item sm={3} xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="edit-position"
                    type="position"
                    label="Position"
                    name="position"
                    autoComplete="position"
                    value={jobData.position}
                    onChange={handleInputChange('position')}
                  />
                </Grid>
                <Grid item sm={2} xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="edit-status"
                    type="text"
                    label="Status"
                    name="status"
                    autoComplete="status"
                    // helperText={errors.status}
                    // error={errors.status ? true : false}
                    value={jobData.status}
                    onChange={handleInputChange('status')}
                  />
                </Grid>
                <Grid item sm={2} xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="edit-link"
                    type="text"
                    label="Links"
                    name="link"
                    autoComplete="link"
                    // helperText={errors.link}
                    // error={errors.link ? true : false}
                    value={jobData.link}
                    onChange={handleInputChange('link')}
                  />
                </Grid>
                <Grid item sm={1} xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    UPDATE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default JobCard
