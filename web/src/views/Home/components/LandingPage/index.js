import React, { useContext } from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

/** Components */
import Menu from "../../../../components/MainMenu";
import Form from "./components/Form";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";

/** Media Files */
import BackgroundImage from "../../../../resources/images/clubcomplex-home-background.jpg";

/** Services */
import ContextClient from "../../../../helpers/ContextClient";

/** Styles */
const useStyle = makeStyles((theme) => ({
  landingPage: {
    height: "100%",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(18),
  },
  form: {
    position: "relative",
    top: "-80px",
    height: 220,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

export default function LandingPage() {
  const classes = useStyle();
  const { user } = useContext(ContextClient);
  return (
    <React.Fragment>
      <Grid container component="main" className={classes.landingPage}>
        <Container fixed>
          <Menu />
          <Grid
            container
            direction="row"
            spacing={4}
            alignItems="center"
            className={classes.content}
          >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Hero />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box display="flex" justifyContent="flex-end">
                {!user && <Form />}
                {user && <Welcome />}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </React.Fragment>
  );
}
