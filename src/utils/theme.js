import { createMuiTheme } from '@material-ui/core/styles'

const Rajdhani = { fontFamily: 'Rajdhani, sans-serif', fontWeight: 400 }
const OpenSans = {
  fontFamily: 'Open Sans, sans-serif',
  fontWeight: 400
}

const DolceVita = {
  fontFamily: 'Dolce Vita Light'
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
      ...DolceVita
    },
    h2: {
      ...DolceVita
    },
    h3: {
      ...DolceVita
    },
    h4: {
      ...DolceVita
    },
    h5: {
      ...DolceVita
    },
    h6: {
      ...DolceVita
    },
    body1: {
      ...DolceVita
    },
    body2: {
      ...DolceVita
    },
    subtitle1: {
      ...DolceVita
    }
  }
})
export default theme
