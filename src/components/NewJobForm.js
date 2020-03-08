import React from 'react'

// components
import SelectStatus from './SelectStatus'

// Material UI Stuff
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

// JobCardStyles
import useJobCardStyles from '../styles/JobCardStyles'

const NewJobForm = React.forwardRef(
  ({ handleSubmit, formData, handleInputChange, isloading }) => {
    const isInvalid =
      !formData.company ||
      !formData.position ||
      !formData.link ||
      !formData.status ||
      isloading

    const classes = useJobCardStyles()
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <form noValidate onSubmit={handleSubmit} className={classes.form}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="space-between"
            >
              <Grid item sm="auto" xs={12} className={classes.grid}>
                <Typography>New</Typography>
                <Typography>Job</Typography>
              </Grid>
              <Grid item sm={3} xs={12} className={classes.grid}>
                <TextField
                  className={classes.jobField}
                  margin="normal"
                  fullWidth
                  id="company"
                  type="company"
                  label="Company"
                  name="company"
                  autoComplete="company"
                  value={formData.company}
                  onChange={handleInputChange('company')}
                />
              </Grid>
              <Grid item sm={3} xs={12} className={classes.grid}>
                <TextField
                  className={classes.jobField}
                  margin="normal"
                  fullWidth
                  id="position"
                  type="position"
                  label="Position"
                  name="position"
                  autoComplete="position"
                  value={formData.position}
                  onChange={handleInputChange('position')}
                />
              </Grid>
              <Grid item sm={2} xs={12} className={classes.grid}>
                <SelectStatus
                  status={formData.status}
                  handleInputChange={handleInputChange}
                />
              </Grid>
              <Grid item sm={2} xs={12} className={classes.grid}>
                <TextField
                  className={classes.jobField}
                  margin="normal"
                  fullWidth
                  id="link"
                  type="text"
                  label="Link"
                  name="link"
                  autoComplete="link"
                  onChange={handleInputChange('link')}
                />
              </Grid>
              <Grid item sm={1} xs={12} className={classes.grid}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isInvalid}
                  className={classes.submit}
                >
                  Submit
                  {isloading && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    )
  }
)

export default NewJobForm
