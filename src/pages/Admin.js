import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import User from '../components/User'

const Admin = () => {
  const [users, setUsers] = useState(null)
  const getAllUers = () => {
    axios
      .get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUers()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item sm={4} xs={10}>
        <p>...filters</p>
      </Grid>
      <Grid item sm={8} xs={12}>
        {!users ? (
          <h1>Loading...</h1>
        ) : (
          users.map(user => (
            <User
              key={user.userId}
              id={user.userId}
              email={user.email}
              imageUrl={user.imageUrl}
            />
          ))
        )}
      </Grid>
    </Grid>
  )
}

export default Admin
