import { makeStyles } from '@material-ui/core/styles'
export default makeStyles({
  card: {
    display: 'flex',
    marginBottom: 20,
    height: '100px'
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
    justifyContent: 'flex-end',
    width: '20%'
  },
  twentyPercent: {
    width: '20%'
  },
  tenPercent: {
    width: '10%'
  },
  jobField: {
    margin: 5
  }
})
