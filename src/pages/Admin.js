import React, { useEffect, useState } from 'react'
import axios from 'axios'

// MUI STUFF
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

// Pages
import User from '../components/User'

// Components
import Program from '../components/Program'

const useStyles = makeStyles({
  content: {
    padding: 25
  }
})

const INITIAL_STATE = {
  program: ''
}

const Admin = () => {
  const classes = useStyles()
  const [users, setUsers] = useState(null)
  const [formData, setFormData] = useState(INITIAL_STATE)

  const handleInputChange = field => e =>
    setFormData({ ...formData, [field]: e.target.value })

  const getAllUers = () => {
    axios
      .get('/users')
      .then(res => {
        setUsers(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUers()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item sm={4} xs={10}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography variant="h4" color="secondary">
              Filter Alumni
            </Typography>
            {/* search field goes here */}
            <Program
              handleInputChange={handleInputChange}
              program={formData.program}
            />
            <Typography variant="body1" color="textSecondary">
              Cohort goes down here
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={8} xs={12}>
        {!users ? (
          <h1>Loading...</h1>
        ) : (
          users.map(user => (
            <User
              key={user.userId}
              id={user.userId}
              first={user.firstName}
              last={user.lastName}
              email={user.email}
              cohort={user.cohort}
              program={user.program}
              imageUrl={user.imageUrl}
            />
          ))
        )}
      </Grid>
    </Grid>
  )
}

export default Admin
