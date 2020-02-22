import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles/'

// Components
import NavBar from './components/NavBar'
// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import SignUp from './pages/SignUp'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#65C1E5',
      dark: '#002884',
      contrastText: '#000'
    },
    secondary: {
      light: '#ff7961',
      main: '#65C1E5',
      dark: '#ba000d',
      contrastText: '#000'
    }
  },
  typography: {
    useNextVariant: true
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/admin" component={Admin} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  )
}

export default App
