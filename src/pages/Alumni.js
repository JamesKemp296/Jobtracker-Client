import React, { useState, useEffect } from 'react'
import axios from 'axios'

import useJobCardStyles from '../styles/JobCardStyles'
import AlumniJobCard from '../components/AlumniJobCard'

// Material UI Stuff

import LinkedInIcon from '@material-ui/icons/LinkedIn'
import LanguageIcon from '@material-ui/icons/Language'
import Chip from '@material-ui/core/Chip'
import GitHubIcon from '@material-ui/icons/GitHub'
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const Alumni = ({ location }) => {
  const classes = useJobCardStyles()
  const [user, setUser] = useState(null)
  const [job, setJob] = useState([])

  const fetchUser = () => {
    const id = location.state.id
    axios
      .get(`/user/${id}`)
      .then(res => {
        setUser(res.data)
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
    <div style={{ marginTop: 70 }}>
      <>
        {user ? (
          <div>
            <Grid container>
              <Grid item sm={1} xs={12}></Grid>
              <Grid item sm={10} xs={12}>
                <Card className={classes.alumniCard}>
                  <CardMedia
                    image={user.user.imageUrl}
                    title={user.user.firstName + user.user.lastName}
                    className={classes.image}
                  />
                  <CardContent className={classes.alumniCardContent}>
                    <Box className={classes.alumniCardHeader}>
                      <Typography variant="h5" color="secondary">
                        {user.user.firstName} {user.user.lastName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.user.program}
                      </Typography>
                      <Typography variant="body2">{user.user.email}</Typography>
                      {user.user.resumeUrl && (
                        <Link href={user.user.resumeUrl} target="_blank">
                          <Typography variant="body2">
                            Download Resume
                          </Typography>
                        </Link>
                      )}
                    </Box>
                    <Box className={classes.alumniChips}>
                      {user.user.github && (
                        <Link
                          href={user.user.github}
                          target="_blank"
                          style={{ margin: '1%' }}
                        >
                          <Chip
                            icon={<GitHubIcon />}
                            label="GitHub"
                            clickable
                          />
                        </Link>
                      )}
                      {user.user.website && (
                        <Link
                          href={user.user.website}
                          target="_blank"
                          style={{ margin: '1%' }}
                        >
                          <Chip
                            icon={<LanguageIcon />}
                            label="Website"
                            clickable
                          />
                        </Link>
                      )}
                      {user.user.linkedIn && (
                        <Link
                          href={user.user.linkedIn}
                          target="blank"
                          style={{ margin: '1%' }}
                        >
                          <Chip
                            icon={<LinkedInIcon />}
                            label="LinkedIn"
                            clickable
                          />
                        </Link>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={1} xs={12}></Grid>
            </Grid>
            <>
              <Typography variant="h4" className={classes.jobTitle}>
                User's Job Postings
              </Typography>
              <br />
              {job.length >= 1 ? (
                job.map((job, index) => (
                  <AlumniJobCard
                    createdAt={job.createdAt}
                    link={job.link}
                    status={job.status}
                    position={job.position}
                    company={job.company}
                    id={job.jobId}
                    key={job.jobId}
                  />
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
