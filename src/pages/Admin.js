import React, { useEffect, useState } from 'react'
import axios from 'axios'

// MUI STUFF
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

// Pages
import User from '../components/User'

// Components
import ProgramFilter from '../components/ProgramFilter'

const useStyles = makeStyles(theme => ({
  content: {
    padding: 25,
    display: 'flex',
    flexDirection: 'column'
  },
  search: {
    marginBottom: theme.spacing(2)
  },
  card: {
    width: '100%'
  }
}))

const inputProps = {
  step: 1,
  min: 1,
  max: 99
}

const INITIAL_STATE = {
  program: 'All',
  search: '',
  cohort: ''
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
    <div style={{ marginTop: 70 }}>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography variant="h4" color="primary">
                Filter Alumni
              </Typography>
              <TextField
                id="search"
                name="search"
                label="Search by name"
                className={classes.search}
                placeholder="First or last name"
                onChange={handleInputChange('search')}
                value={formData.search}
              />
              <ProgramFilter
                handleInputChange={handleInputChange}
                program={formData.program}
              />
              <TextField
                id="cohort"
                type="number"
                inputProps={inputProps}
                label="Cohort #"
                name="cohort"
                value={formData.cohort}
                onChange={handleInputChange('cohort')}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={8} xs={12}>
          {!users ? (
            <h1>Loading...</h1>
          ) : (
            users
              .filter(user => {
                if (formData.search === '') return true
                return (user.firstName + user.lastName)
                  .toLowerCase()
                  .includes(formData.search.toLowerCase())
              })
              .filter(user => {
                if (formData.cohort === '') return true
                return user.cohort.toString().includes(formData.cohort)
              })
              .filter(user => {
                if (formData.program === 'All') return true
                return user.program === formData.program
              })
              .map(user => (
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
    </div>
  )
}

export default Admin
