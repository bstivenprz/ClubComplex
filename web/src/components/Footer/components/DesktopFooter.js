import React from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

/** Media Files */
import Logo from "../../../resources/images/clubcomplex-white-logo.png";

/** Styles */
const useStyle = makeStyles((theme) => ({
  logo: {
    display: "block",
    height: "40px",
  },
  text: {
    color: theme.palette.text.contrastText,
  },
}));

export default function DesktopFooter(props) {
  const classes = useStyle();
  const { copyright, urlSite, developer, urlDeveloper } = props.info;
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <img src={Logo} className={classes.logo} />
      </Grid>
      <Grid item>
        <Typography variant="body2" align="center" className={classes.text}>
          <strong>
            <Link color="inherit" href={urlSite}>
              Club Complex
            </Link>{" "}
            {new Date().getFullYear()}
            {" © "}
          </strong>
          {copyright}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" align="center" className={classes.text}>
          {"Sitio web creado por "}
          <strong>
            <Link color="inherit" href={urlDeveloper}>
              {developer}
            </Link>
          </strong>
        </Typography>
      </Grid>
    </Grid>
  );
}
