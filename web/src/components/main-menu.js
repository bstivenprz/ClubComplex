import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../resources/images/clubcomplex-blue-logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4, 0)
  },
  logoContainer: {
    flexGrow: 1
  },
  logo: {
    height: '50px'
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
          <Button color="primary" variant="outlined" component={RouterLink} to="/login" className={classes.link}>
            Ingresar
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}