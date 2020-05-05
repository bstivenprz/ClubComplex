import React from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

/** Media Files */
import FormLogo from "../../../../../resources/images/clubcomplex-white-logo.png";

/** Styles */
const useStyle = makeStyles((theme) => ({
  logo: {
    height: "80px",
  },
  contentTextTitle: {
    margin: theme.spacing(2, 0),
    color: theme.palette.text.contrastText,
  },
  contentText: {
    color: theme.palette.text.contrastText,
  },
}));

export default function LandingPageInfo() {
  const classes = useStyle();
  return (
    <div>
      <img src={FormLogo} className={classes.logo} />
      <Typography
        variant="h4"
        component="h4"
        className={classes.contentTextTitle}
      >
        NECESITA SOCIOS COMO TÚ
      </Typography>
      <Typography variant="body1" paragraph className={classes.contentText}>
        Genera ganancias adicionales de manera inteligente, sé dueño de tu
        tiempo y transforma tu vida.
      </Typography>
      <Typography variant="body1" paragraph className={classes.contentText}>
        <strong>Únete a la comunidad Complex.</strong>
      </Typography>
    </div>
  );
}
