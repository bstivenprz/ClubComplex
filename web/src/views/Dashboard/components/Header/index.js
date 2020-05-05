import React from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

/** Media Files */
import BackgroundImage from "../../../../resources/images/clubcomplex-home-background.jpg";

export default function Header() {
  const componentStyle = makeStyles((theme) => ({
    hero: {
      height: "100%",
      backgroundImage: `url(${BackgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "20vh",
    },
  }));
  const classes = componentStyle();
  return (
    <React.Fragment>
      <Grid container component="main" className={classes.hero}>
        {/* <Container fixed>
            <Grid item>
              <Typography variant="h5" color="primary">Bienvenido Brandon</Typography>
            </Grid>
          </Container> */}
      </Grid>
    </React.Fragment>
  );
}
