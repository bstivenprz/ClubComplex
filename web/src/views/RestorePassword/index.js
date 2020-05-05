import React from "react";
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

/** Components */
import Footer from "../../components/secondary-footer";

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
              <Typography component="p" variant="body1" align="center">
                Ingresa tu correo electrónico para recuperar tu cuenta.
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
            </div>
          </Container>
        </Grid>
        <Footer />
      </Grid>
    </div>
  );
}
