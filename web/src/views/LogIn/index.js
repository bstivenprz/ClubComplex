import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import BackgroundImage from '../../resources/images/clubcomplex-login-background.jpg';
import Logo from '../../resources/images/clubcomplex-blue-logo.png';
import SecondaryCopyright from '../../components/secondary-copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    margin: theme.spacing(1, 1, 4, 1),
    height: '76px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signupForm: {
    margin: theme.spacing(6, 4)
  }
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img className={classes.logo} src={Logo} />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" component={RouterLink} to="/restore-password">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
            </Grid>
          </form>
          <Grid container className={classes.signupForm}>
            <Grid item xs>
              <Typography component="h5" variant="h5" align="center">
                ¿No tienes una cuenta?
              </Typography>
              <Typography component="h4" variant="h4" align="center">
                <Box fontWeight="fontWeightBold">
                  Regístrate Gratis
                </Box>
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                component={RouterLink}
                to="/"
              >
                REGISTRARME
              </Button>
            </Grid>
          </Grid>
        </div>
        <SecondaryCopyright />
      </Grid>
    </Grid>
  );
}
