import 'babel-polyfill';
import React from 'react';
import LogIn from './views/LogIn';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import RestorePassword from './views/RestorePassword';
import ProtectedRoute from './components/protected-route';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Theme from './styles/stylesMuiTheme';
import { ContextClientProvider } from './helpers/ContextClient';

function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      <Router>
        <ContextClientProvider>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={LogIn} />
              <Route path="/restore-password" component={RestorePassword} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="*">
                <h1>404 Page does't exists.</h1>
              </Route>
          </Switch>
        </ContextClientProvider>
      </Router>
    </MuiThemeProvider>
  )
}

export default App();