import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

/** Components */
import UserMenu from "./components/UserMenu";

/** Media Files */
import LogoBlue from "../../resources/images/clubcomplex-blue-logo.png";
import LogoWithe from "../../resources/images/clubcomplex-white-logo.png";

/** Services */
import ContextClient from "../../helpers/ContextClient";

/** Styles */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    padding: theme.spacing(1, 0),
  },
  logoContainer: {
    flexGrow: 1,
  },
  logo: {
    height: "50px",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  userName: {
    flexGrow: 1,
  },
}));

export default function MainMenu() {
  const classes = useStyles();
  const { user } = useContext(ContextClient);

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color={user ? "primary" : "transparent"}
        elevation={0}
      >
        <Container fixed>
          <Toolbar className={classes.toolbar}>
            <div className={classes.logoContainer}>
              <img src={user ? LogoWithe : LogoBlue} className={classes.logo} />
            </div>
            {!user && (
              <Button
                color={user ? "inherit" : "primary"}
                variant="outlined"
                component={RouterLink}
                to="/login"
                className={classes.link}
              >
                Ingresar
              </Button>
            )}
            {user && <UserMenu />}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
