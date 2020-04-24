import React from 'react';
import LogIn from './views/LogIn';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import RestorePassword from './views/RestorePassword';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Theme from './styles/stylesMuiTheme';

function App() {
  return (
    <MuiThemeProvider theme={Theme}>
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