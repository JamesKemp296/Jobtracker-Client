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
      ...OpenSans
    },
    h2: {
      ...OpenSans
    },
    h3: {
      ...OpenSans
    },
    h4: {
      ...OpenSans
    },
    h5: {
      ...OpenSans
    },
    h6: {
      ...OpenSans
    },
    body1: {
      ...Rajdhani
    },
    body2: {
      ...Rajdhani
    },
    subtitle1: {
      ...Rajdhani
    }
  }
})
export default theme
