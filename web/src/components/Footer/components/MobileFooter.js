import React from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from '@material-ui/core/Box';

/** Media Files */
import Logo from "../../../resources/images/clubcomplex-white-logo.png";

/** Styles */
const useStyle = makeStyles((theme) => ({
  text: {
    margin: theme.spacing(4, 0),
    color: theme.palette.text.contrastText,
  },
}));

export default function MobileFooter(props) {
  const classes = useStyle();
  const { copyright, urlSite, developer, urlDeveloper } = props.info;
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <img src={Logo} />
      </Grid>
      <Grid item>
        <Typography variant="body2" align="center" className={classes.text}>
          <Box fontWeight="fontWeightBold" display="inline">
            <Link color="inherit" href={urlSite}>
              Club Complex
            </Link>{" "}
            {new Date().getFullYear()}
            {" © "}
          </Box>
          {copyright}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" align="center" className={classes.text}>
          {"Sitio web creado por "}
          <Box fontWeight="fontWeightBold" display="inline">
            <Link color="inherit" href={urlDeveloper}>
              {developer}
            </Link>
          </Box>
        </Typography>
      </Grid>
    </Grid>
  );
}
