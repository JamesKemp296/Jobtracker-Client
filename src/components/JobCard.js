import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import SelectFollowUp from '../components/selectFollowUp'

// components
import SelectStatus from '../components/SelectStatus'

// Material UI Stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

// JobCardStyles
import useJobCardStyles from '../styles/JobCardStyles'

const INITIAL_STATE = {
  body: '',
  type: ''
}

const JobCard = ({
  company,
  position,
  status,
  link,
  createdAt,
  id,
  setMessage,
  fetchUser,
  setOpen,
  path
}) => {
  const classes = useJobCardStyles()
  const [edit, setEdit] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [isFollowloading, setIsFollowLoading] = useState(false)
  const [jobData, setJobData] = useState({
    company,
    position,
    status,
    link
  })
  const [followupData, setFollowupData] = useState(INITIAL_STATE)
  const [follows, setFollows] = useState(null)

  const isInvalid =
    !jobData.company ||
    !jobData.status ||
    !jobData.link ||
    !jobData.position ||
    isloading

  const isInvalidFollow = !followupData.type || !followupData.body || isloading

  const handleInputChange = field => e => {
    setJobData({ ...jobData, [field]: e.target.value })
  }

  const handleFollowChange = field => e => {
    setFollowupData({ ...followupData, [field]: e.target.value })
  }

  const handleEditMode = () => {
    setEdit(!edit)
  }
  const handlePanelExpand = () => {
    setExpanded(!expanded)
    if (!follows) fetchFollow()
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
        setOpen(true)
      })
      .catch(err => {
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
      .then(res => {
        setMessage(res.data)
        setOpen(true)
        fetchUser()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleFollowSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    setIsFollowLoading(true)
    const fireToken = await localStorage.FBIdToken
    await axios
      .post(`/jobs/${id}/followups`, followupData, {
        headers: {
          Authorization: `${fireToken}`
        }
      })

      .then(res => {
        setMessage(res.data)
        setIsLoading(false)
        setIsFollowLoading(false)
        setOpen(true)
        fetchFollow()
        setFollowupData(INITIAL_STATE)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }

  const fetchFollow = async () => {
    const token = await localStorage.FBIdToken
    setIsFollowLoading(true)
    await axios
      .get(`/jobs/${id}/followups`, {
        headers: {
          Authorization: `${token}`
        }
      })
      .then(res => {
        setIsFollowLoading(false)
        setFollows(res.data.followup)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      {!edit ? (
        <ExpansionPanel
          expanded={expanded}
          style={{
            border: 'none',
            background: 'transparent',
            boxShadow: 'none'
          }}
        >
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ padding: 0, width: '100%' }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item sm={2} xs={12} style={{ display: 'flex' }}>
                    <button onClick={handleEditMode} className={classes.button}>
                      <EditIcon />
                    </button>
                    <button onClick={deleteJob} className={classes.button}>
                      <DeleteIcon />
                    </button>
                    <button
                      className={classes.button}
                      onClick={handlePanelExpand}
                    >
                      <ExpandMoreIcon />
                    </button>
                  </Grid>
                  <Grid item sm={2} xs={12}>
                    <Typography variant="body1" color="primary">
                      {company}
                    </Typography>
                  </Grid>
                  <Grid item sm={3} xs={12}>
                    <Typography variant="body2">{position}</Typography>
                  </Grid>
                  <Grid item sm={2} xs={12}>
                    <Typography variant="body2">{status}</Typography>
                  </Grid>
                  <Grid item sm={1} xs={12}>
                    <Link href={link} target="blank">
                      Link
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
              </ExpansionPanelSummary>
            </CardContent>
          </Card>
          <ExpansionPanelDetails
            style={{ width: '100%', padding: 0, margin: 0 }}
          >
            <Card className={classes.card} style={{ width: '100%' }}>
              <CardContent className={classes.content}>
                <form className={classes.form} onSubmit={handleFollowSubmit}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item sm={2} xs={12} className={classes.grid}>
                      <Typography>New </Typography>
                      <Typography>Follow Up</Typography>
                    </Grid>
                    <Grid item sm={2} xs={12} className={classes.grid}>
                      <SelectFollowUp
                        type={followupData.type}
                        handleFollowChange={handleFollowChange}
                      />
                    </Grid>
                    <Grid item sm={7} xs={12} className={classes.grid}>
                      <TextField
                        className={classes.jobField}
                        margin="normal"
                        fullWidth
                        id="body"
                        type="body"
                        label="Details"
                        name="body"
                        autoComplete="body"
                        value={followupData.body}
                        onChange={handleFollowChange('body')}
                      />
                    </Grid>
                    <Grid item sm={1} xs={12} className={classes.grid}>
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isInvalidFollow}
                        className={classes.submit}
                        disableElevation
                      >
                        Submit
                        {isloading && (
                          <CircularProgress
                            size={30}
                            className={classes.progress}
                          />
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </ExpansionPanelDetails>
          <Typography
            variant="h5"
            style={{ textAlign: 'center', marginBottom: '2%' }}
          >
            Follow Ups with {company}
          </Typography>

          {follows !== null && !isFollowloading && follows.length > 0 ? (
            follows.map(item => (
              <Card
                style={{ marginTop: 10, paddingTop: 5, paddingBottom: 5 }}
                key={item.followUpId}
              >
                <div
                  style={{ padding: '5px 24px' }}
                  className={classes.followup}
                >
                  <Grid container alignItems="center" justify="center">
                    <Grid item sm={3} xs={12} className={classes.grid}>
                      <Typography variant="body1">{item.type}</Typography>
                    </Grid>
                    <Grid item sm={6} xs={12} className={classes.grid}>
                      <Typography variant="body1">{item.body}</Typography>
                    </Grid>
                    <Grid item sm={3} xs={12} className={classes.grid}>
                      <Typography variant="body2" className={classes.timeStamp}>
                        {moment(item.createdAt)
                          .startOf('minute')
                          .fromNow()}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Card>
            ))
          ) : follows !== null && !isFollowloading && follows.length === 0 ? (
            <Typography
              variant="body2"
              style={{
                textAlign: 'center',
                marginBottom: '2%'
              }}
            >
              No Followups with {company}
            </Typography>
          ) : (
            <Grid item container justify="center">
              <CircularProgress size={50} />
            </Grid>
          )}
        </ExpansionPanel>
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
                <Grid item sm="auto" xs={12} className={classes.grid}>
                  <button
                    onClick={() => setEdit(!edit)}
                    className={classes.button}
                  >
                    <CloseIcon />
                  </button>
                </Grid>
                <Grid item sm={3} xs={12} className={classes.grid}>
                  <TextField
                    className={classes.jobField}
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
                <Grid item sm={3} xs={12} className={classes.grid}>
                  <TextField
                    className={classes.jobField}
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
                <Grid item sm={2} xs={12} className={classes.grid}>
                  <SelectStatus
                    status={jobData.status}
                    handleInputChange={handleInputChange}
                  />
                </Grid>
                <Grid item sm={2} xs={12} className={classes.grid}>
                  <TextField
                    className={classes.jobField}
                    margin="normal"
                    fullWidth
                    id="edit-link"
                    type="text"
                    label="Links"
                    name="link"
                    autoComplete="link"
                    value={jobData.link}
                    onChange={handleInputChange('link')}
                  />
                </Grid>
                <Grid item sm={1} xs={12} className={classes.grid}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isInvalid}
                    disableElevation
                  >
                    UPDATE
                    {isloading && (
                      <CircularProgress
                        size={30}
                        className={classes.progress}
                      />
                    )}
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
