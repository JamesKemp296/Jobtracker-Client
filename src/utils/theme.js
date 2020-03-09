import { createMuiTheme } from '@material-ui/core/styles'

const Rajdhani = { fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }
const OpenSans = {
  fontFamily: 'Open Sans, sans-serif',
  fontWeight: 400
}
const BLACK = '#000000'
const DARK_GREY = '#373733'
const theme = createMuiTheme({
  palette: {
    text: {
      primary: BLACK,
      secondary: DARK_GREY
    }
  },
  typography: {
    h1: {
      ...Rajdhani
    },
    h2: {
      ...Rajdhani
    },
    h3: {
      ...Rajdhani
    },
    h4: {
      ...Rajdhani
    },
    h5: {
      ...Rajdhani
    },
    h6: {
      ...Rajdhani
    },
    body1: {
      ...OpenSans
    },
    body2: {
      ...OpenSans
    },
    subtitle1: {
      ...Rajdhani
    }
  }
})
export default theme
