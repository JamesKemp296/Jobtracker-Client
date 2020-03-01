import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import useJobCardStyles from '../styles/JobCardStyles'

// Material UI Stuff
import Avatar from '@material-ui/core/Avatar'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import LanguageIcon from '@material-ui/icons/Language'
import Chip from '@material-ui/core/Chip'
import GitHubIcon from '@material-ui/icons/GitHub'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

const Alumni = ({ location }) => {
  const classes = useJobCardStyles()
  const [user, setUser] = useState(null)
  const [job, setJob] = useState([])
  // This is for the fetching the user data
  console.log(location.state.id)

  const fetchUser = () => {
    const id = location.state.id
    axios
      .get(`/user/${id}`)
      .then(res => {
        setUser(res.data)
        console.log(res.data)
        const Jobs = res.data.jobs.map(
          ({ position, link, status, company, createdAt, jobId }) => ({
            position,
            link,
            status,
            company,
            createdAt,
            jobId
          })
        )
        setJob(Jobs)
      })
      .catch(err => console.log('You fucked up'))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div>
      <>
        {user ? (
          <div>
            <Container maxWidth="md">
              <Card className={classes.cardTwo}>
                <CardContent
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-evenly'
                  }}
                >
                  <Grid container alignItems="center">
                    <Grid item sm={1} xs={12}>
                      <Avatar
                        alt="Remy Sharp"
                        src={user.user.imageUrl}
                        style={{ height: 70, width: 70 }}
                      />
                    </Grid>
                    <Grid item sm={3} xs={12} className={classes.marginBottom}>
                      <div>
                        <Typography variant="h5" color="secondary">
                          {user.user.firstName} {user.user.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {user.user.program}
                        </Typography>
                        <Typography variant="body2">
                          {user.user.email}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item sm={2} xs={12} className={classes.marginBottom}>
                      {user.user.github && (
                        <Link href={user.user.github} target="blank">
                          <Chip icon={<GitHubIcon />} label="GitHub" />
                        </Link>
                      )}
                    </Grid>
                    <Grid item sm={2} xs={12} className={classes.marginBottom}>
                      {user.user.website && (
                        <Link href={user.user.website} target="blank">
                          <Chip icon={<LanguageIcon />} label="Website" />
                        </Link>
                      )}
                    </Grid>
                    <Grid item sm={2} xs={12} className={classes.marginBottom}>
                      {user.user.linkedIn && (
                        <Link href={user.user.linkedIn} target="blank">
                          <Chip icon={<LinkedInIcon />} label="LinkedIn" />
                        </Link>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Container>
            <>
              <Typography variant="h4" className={classes.jobTitle}>
                User's Job Postings
              </Typography>
              <br />
              {job.length >= 1 ? (
                job.map((job, index) => (
                  <div key={index}>
                    <Card className={classes.card}>
                      <CardContent
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Grid container alignItems="center">
                          <Grid item sm={3} xs={12}>
                            <Typography variant="h5" color="secondary">
                              {job.company}
                            </Typography>
                          </Grid>
                          <Grid item sm={3} xs={12}>
                            <Typography variant="body2" color="textSecondary">
                              {job.position}
                            </Typography>
                          </Grid>
                          <Grid item sm={3} xs={12}>
                            <Typography variant="body2">
                              {job.status}
                            </Typography>
                          </Grid>
                          <Grid item sm={1} xs={12}>
                            <Link href={job.link} target="blank">
                              Job Link
                            </Link>
                          </Grid>
                          <Grid
                            item
                            sm={2}
                            xs={12}
                            container
                            justify="flex-end"
                          >
                            <Typography
                              variant="body2"
                              className={classes.cohort}
                            >
                              {moment(job.createdAt)
                                .startOf('minute')
                                .fromNow()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </div>
                ))
              ) : (
                <Typography variant="h5">No User Job Postings</Typography>
              )}
            </>
          </div>
        ) : (
          <CircularProgress size={60} className={classes.progressThree} />
        )}
      </>
    </div>
  )
}

export default Alumni
