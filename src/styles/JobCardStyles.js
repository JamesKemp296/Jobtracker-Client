import { makeStyles } from '@material-ui/core/styles'
export default makeStyles({
  card: {
    display: 'flex',
    marginBottom: 10,
    minHeight: 90
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  button: {
    border: '0',
    background: 'transparent'
  },
  timeStamp: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  jobField: {
    margin: 0,
    padding: 0
  },
  grid: {
    padding: 0
  },
  submit: {
    position: 'relative'
  },
  progress: {
    position: 'absolute'
  },
  alumniCard: {
    marginBottom: 20,
    minHeight: '140px'
  },
  image: {
    width: '100%',
    height: 140,
    objectFit: 'cover'
  },
  marginBottom: {
    margin: '2% 0'
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
