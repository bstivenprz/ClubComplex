import React from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

/** Components */
import HowItWorksCard from "./components/Card";

export default function HowItWorks() {
  const componentStyle = makeStyles((theme) => ({
    root: {
      backgroundColor: "#FFF",
      padding: theme.spacing(12, 0),
    },
  }));
  const classes = componentStyle();
  const boxes = [
    {
      number: 1,
      title: "Únete",
      content: `
          Regístrate de forma gratuita con tu nombre,
          correo electrónico, teléfono, ciudad y si
          alguien te ha referido con nosotros ingresa
          su código promocional.
        `,
    },
    {
      number: 2,
      title: "Explora",
      content: `
          Revisa nuestra oferta de proyectos
          inmobiliarios y decide en cuál te gustaría
          participar.
        `,
    },
    {
      number: 3,
      title: "Invierte",
      content: `
          Una vez seleccionado un proyecto haz clic
          y espera que nuestro equipo te contacte.
        `,
    },
  ];
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container fixed>
          <Typography variant="h5" component="h5">
            <Box fontWeight="fontWeightBold">¿CÓMO FUNCIONA?</Box>
          </Typography>
          <Grid container>
            <HowItWorksCard data={boxes} />
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
