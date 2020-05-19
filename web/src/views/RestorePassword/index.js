import React, { useState } from "react";
import Axios from 'axios';
import { Link as RouterLink } from "react-router-dom";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import Collapse from '@material-ui/core/Collapse';

/** Components */
import Footer from "../../components/secondary-footer";

/** Services */
import { API_USER_RESTORE } from '../../helpers/apiUrls.helper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RestorePassword() {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [emailRestore, setEmailRestore] = useState('');
  const [ShowAlert, setShowAlert] = useState({
    state: false,
    type: "warning",
    message: "",
  });

  const restoreService = (event) => {
    event.preventDefault();
    Axios.put(`${API_USER_RESTORE}/${emailRestore}`)
    .then(response => {
      setShowAlert({ ...ShowAlert, type: 'success', message: 'Tu cuenta ha sido restaurada. Revisa tu correo electrónico.' });
      setSuccess(true);
    })
    .catch(error => {
      if (error.response.status === 404) {
        setShowAlert({ state: true, type: 'error', message: error.response.data.error });
      }
    })
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert({ ...ShowAlert, state: false });
  };

  return (
    <div>
      <CssBaseline />
      <Grid
        container
        direction="column"
        component="main"
        className={classes.root}
      >
        <Grid item xs>
          <Container maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Restaurar cuenta
              </Typography>
              {success && (
                <>
                  <Alert onClose={handleClose} severity={ShowAlert.type}>
                    {ShowAlert.message}
                  </Alert>
                  <Grid container>
                    <Grid item>
                      <Link variant="body2" component={RouterLink} to="/">
                        {"¿No tienes una cuenta? Regístrate Gratis."}
                      </Link>
                    </Grid>
                  </Grid>
                </>
              )}
              {!success && (
                <>
                  <Typography component="p" variant="body1" align="center">
                    Ingresa tu correo electrónico para recuperar tu cuenta.
                  </Typography>
                  <Collapse in={ShowAlert.state}>
                    <Alert open onClose={handleClose} severity={ShowAlert.type}>
                      {ShowAlert.message}
                    </Alert>
                  </Collapse>
                  <form className={classes.form} onSubmit={restoreService}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      id="email"
                      label="Correo electrónico"
                      name="email"
                      autoComplete="email"
                      value={emailRestore}
                      onChange={e => setEmailRestore(e.target.value)}
                      required
                      fullWidth
                      autoFocus
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Recuperar cuenta
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Link variant="body2" component={RouterLink} to="/">
                          {"¿No tienes una cuenta? Regístrate Gratis."}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </>
              )}
            </div>
          </Container>
        </Grid>
        <Footer />
      </Grid>
    </div>
  );
}
