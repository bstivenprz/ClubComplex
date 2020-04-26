import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../resources/images/clubcomplex-blue-logo.png';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4, 0)
  },
  menu: {
    color: 'transparent'
  },
  logoContainer: {
    flexGrow: 1
  },
  logo: {
    height: '50px'
  },
  title: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  }
}))

export default function MainMenu() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <div className={classes.logoContainer}>
            <img src={Logo} className={classes.logo} />
          </div>
          {/* <Typography variant="h6" className={classes.title}>
            News
          </Typography> */}
          <Button color="primary" variant="outlined" component={RouterLink} to="/login" className={classes.link}>
            Ingresar
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}