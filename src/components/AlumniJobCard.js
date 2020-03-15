import React, { useState } from 'react'
import useJobCardStyles from '../styles/JobCardStyles'
import axios from 'axios'
import moment from 'moment'

// Material UI
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CircularProgress from '@material-ui/core/CircularProgress'

const AlumniJobCard = ({ link, position, createdAt, company, status, id }) => {
  const [expanded, setExpanded] = useState(false)
  const [follows, setFollows] = useState(null)
  const [isFollowLoading, setIsFollowLoading] = useState(false)

  const classes = useJobCardStyles()

  const handlePanelExpand = () => {
    setExpanded(!expanded)
  }

  const fetchFollow = async () => {
    if (follows !== null) return
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
        console.log('fetch-follow', res.data.followup)
        setFollows(res.data.followup)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <ExpansionPanel
        expanded={expanded}
        style={{
          border: 'none',
          background: 'transparent',
          boxShadow: 'none'
        }}
      >
        <Card className={classes.card}>
          <CardContent
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ padding: 0, width: '100%' }}
            >
              <Grid container alignItems="center">
                <Grid item sm={1} xs={12}>
                  <button
                    className={classes.button}
                    onClick={handlePanelExpand}
                  >
                    <ExpandMoreIcon onClick={fetchFollow} />
                  </button>
                </Grid>
                <Grid item sm={2} xs={12}>
                  <Typography variant="h5" color="secondary">
                    {company}
                  </Typography>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    {position}
                  </Typography>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Typography variant="body2">{status}</Typography>
                </Grid>
                <Grid item sm={1} xs={12}>
                  <Link href={link} target="blank">
                    Job Link
                  </Link>
                </Grid>
                <Grid item sm={2} xs={12} container justify="flex-end">
                  <Typography variant="body2" className={classes.cohort}>
                    {moment(createdAt)
                      .startOf('minute')
                      .fromNow()}
                  </Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
          </CardContent>
        </Card>

        <Typography
          variant="h5"
          style={{ textAlign: 'center', marginBottom: '2%' }}
        >
          Follow Ups with {company}
        </Typography>

        {follows !== null && !isFollowLoading && follows.length > 0 ? (
          follows.map(item => (
            <Card
              style={{
                marginTop: 10,
                paddingTop: 5,
                paddingBottom: 5,
                marginBottom: '6%'
              }}
              key={item.followUpId}
            >
              <div style={{ padding: '5px 24px' }} className={classes.followup}>
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
        ) : follows !== null && !isFollowLoading && follows.length === 0 ? (
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
    </div>
  )
}

export default AlumniJobCard
