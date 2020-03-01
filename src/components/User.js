import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: 140,
    objectFit: 'cover'
  },
  content: {
    padding: 25
  }
})

const User = ({ email, imageUrl, id, first, last, cohort, program }) => {
  const classes = useStyles()
  return (
    <Link
      to={{
        pathname: `/users/${id}`,
        state: {
          id
        }
      }}
      key={id}
    >
      <Card className={classes.card}>
        <Grid container>
          <Grid item sm={3} xs={12}>
            <img src={imageUrl} alt="Profile" className={classes.image} />
          </Grid>
          <Grid item sm={9} xs={12}>
            <CardContent className={classes.content}>
              <Grid container>
                <Grid item sm={9} xs={12}>
                  <Typography variant="h5" color="secondary">
                    {first} {last}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {program}
                  </Typography>
                  <Typography variant="body1">{email}</Typography>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Typography variant="h2">C{cohort}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Link>
  )
}

export default User
