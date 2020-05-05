import React from "react";
import { Link as RouterLink } from "react-router-dom";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

/** Styles */
const useStyle = makeStyles((theme) => ({
  paper: {
    width: 400,
    padding: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Welcome() {
  const classes = useStyle();
  return (
    <Paper
      elevation={4}
      className={classes.paper}
      style={{ textAlign: "center" }}
    >
      <Typography variant="h6" component="h6" color="primary">
        ¡Cónoce nuestros proyectos!
      </Typography>
      <Typography variant="body1" paragraph>
        Ya eres parte de Club Complex. Ingresa aquí para ver los proyectos en
        los que puedes invertir fácilmente.
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        component={RouterLink}
        to="/dashboard"
      >
        VER PROYECTOS
      </Button>
    </Paper>
  );
}
