import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

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
        <CardMedia image={imageUrl} title="Profile" className={classes.image} />
        <CardContent className={classes.content}>
          <Typography variant="h5" color="secondary">
            {first} {last}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {program}
          </Typography>
          <Typography variant="body1">{email}</Typography>
        </CardContent>
        <Typography variant="h2" className={classes.cohort}>
          C{cohort}
        </Typography>
      </Card>
    </Link>
  )
}

export default User
