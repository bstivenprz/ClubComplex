import React from 'react';
import LogIn from './views/LogIn';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exac path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  )
}

export default App();