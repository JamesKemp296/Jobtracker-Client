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
  alumniCardContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '@media (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  alumniCardHeader: {
    '@media (max-width: 600px)': {
      marginRight: 'auto',
      marginBottom: 5
    }
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
    display: 'flex',
    marginBottom: 20,
    minHeight: '140px',
    '@media (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  alumniChips: {
    width: '100%',
    display: 'flex',
    marginLeft: 'auto'
  },
  image: {
    width: 150,
    height: 140,
    objectFit: 'cover',
    '@media (max-width: 600px)': {
      width: '100%'
    }
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
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px'
  }
})
