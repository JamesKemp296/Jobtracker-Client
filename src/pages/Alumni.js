import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

// Material UI Stuff
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom: 20
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
    padding: 25
  },
  jobTitle: {
    textAlign: 'center'
  },
  progressThree: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%'
  }
})

const Alumni = ({ location }) => {
  const classes = useStyles()
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
            <Card className={classes.card}>
              <CardMedia
                image={user.user.imageUrl}
                title="Profile"
                className={classes.image}
              />
              <CardContent className={classes.content}>
                <Typography variant="h5" color="secondary">
                  {user.user.firstName} {user.user.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.user.program}
                </Typography>
                <Typography variant="body1">User Details</Typography>
                <Typography variant="body2">
                  Email: {user.user.email}
                </Typography>
                <Typography variant="body2">
                  Website: {user.user.website ? user.user.website : 'None'}
                </Typography>

                <Typography variant="body2">
                  GitHub: {user.user.github ? user.user.github : 'None'}
                </Typography>
                <Typography variant="body2">
                  LinkedIn: {user.user.linkedIn ? user.user.linkedIn : 'None'}
                </Typography>
              </CardContent>
              <Typography variant="h2" className={classes.cohort}>
                C{user.user.cohort}
              </Typography>
            </Card>
            <>
              <Typography variant="h4" className={classes.jobTitle}>
                User's Job Postings
              </Typography>
              <br />
              {job.length >= 1 ? (
                job.map((job, index) => (
                  <div key={index}>
                    <Card className={classes.card}>
                      <CardContent className={classes.content}>
                        <Typography variant="h5" color="secondary">
                          Company: {job.company}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Position Title: {job.position}
                        </Typography>
                        <Typography variant="body2">
                          Status: {job.status}
                        </Typography>
                        <Typography variant="body2">
                          Link: {job.link}
                        </Typography>
                      </CardContent>
                      <Typography variant="h5" className={classes.cohort}>
                        {moment(job.createdAt)
                          .startOf('minute')
                          .fromNow()}
                      </Typography>
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
