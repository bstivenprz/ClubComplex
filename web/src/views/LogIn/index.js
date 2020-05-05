import React, { useState, useContext, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";

/** Materila UI */
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

/** Media Files */
import BackgroundImage from "../../resources/images/clubcomplex-login-background.jpg";
import Logo from "../../resources/images/clubcomplex-blue-logo.png";

/** Components */
import Footer from "../../components/secondary-footer";
import ContextClient from "../../helpers/ContextClient";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    margin: theme.spacing(1, 1, 4, 1),
    height: "50px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signupForm: {
    margin: theme.spacing(6, 4),
  },
  wrapper: {
    width: "100%",
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.primary,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function SignInSide(props) {
  const { logIn } = useContext(ContextClient);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [LogInFormData, setLogInFormData] = useState({});
  const [ShowAlert, setShowAlert] = useState({
    state: false,
    type: "warning",
    message: "",
  });
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  const handleFormImputs = (event) => {
    setLogInFormData({
      ...LogInFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert({ ...ShowAlert, state: false });
  };

  const sendLogIn = (event) => {
    event.preventDefault();
    setIsLoading(true);
    logIn(LogInFormData.email, LogInFormData.password)
      .then((response) => {
        setShowAlert({
          state: response.authenticated,
          type: "success",
          message: `Bienvenido ${response.user.firstName}`,
        });
        props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        const { data } = error.response;
        setShowAlert({
          state: true,
          type: "error",
          message: data.error.message,
        });
      })
      .finally(() => {
        if (isMounted.current) {
          setIsLoading(false);
        }
      });
  };

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
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={ShowAlert.state}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={ShowAlert.type}>
              {ShowAlert.message}
            </Alert>
          </Snackbar>
          <form className={classes.form} onSubmit={sendLogIn}>
            <TextField
              label="Correo electrónico"
              id="email"
              name="email"
              margin="normal"
              variant="outlined"
              autoComplete="email"
              onChange={handleFormImputs}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Contraseña"
              id="password"
              name="password"
              margin="normal"
              variant="outlined"
              autoComplete="current-password"
              type="password"
              onChange={handleFormImputs}
              required
              fullWidth
            />
            <div className={classes.wrapper}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isLoading}
              >
                Ingresar
              </Button>
              {isLoading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
            <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  component={RouterLink}
                  to="/restore-password"
                >
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
                <Box fontWeight="fontWeightBold">Regístrate Gratis</Box>
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
        <Footer />
      </Grid>
    </Grid>
  );
}
