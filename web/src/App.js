import React from 'react';
import LogIn from './views/LogIn';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import RestorePassword from './views/RestorePassword';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    background: {
      footer: {
        primary: '#01104B',
        secondary: '#F2F2F6'
      }
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: '#01104B'
    },
    primary: {
      light: '#fff',
      main: 'rgb(0, 172, 237)',
      dark: '#01104B',
      contrastText: '#fff'
    },
    secondary: {
      main: '#01104B',
      contrastText: '#fff'
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/restore-password">
            <RestorePassword />
          </Route>
          <Route path="*">
            <h1>404 Page does't exists.</h1>
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default App();