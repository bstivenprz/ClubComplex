import "babel-polyfill";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/** Views */
import LogIn from "./views/LogIn";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import RestorePassword from "./views/RestorePassword";
import NotFound from "./views/NotFound";
import ProtectedRoute from "./components/protected-route";

/** Style */
import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "./styles/theme";

/** Services */
import { ContextClientProvider } from "./helpers/ContextClient";

function App() {
  return (
    <MuiThemeProvider theme={Theme}>
      <ContextClientProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LogIn} />
            <Route path="/restore-password" component={RestorePassword} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </ContextClientProvider>
    </MuiThemeProvider>
  );
}

export default App();
