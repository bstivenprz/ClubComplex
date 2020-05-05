import React, { useState } from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

/** Components */
import FeaturesBox from "./components/Box";

/** Styles */
const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.secondary,
  },
}));

export default function Features() {
  const classes = useStyle();
  const boxes = [
    {
      title: "Genera ganancias",
      content: `
          Somos la primera plataforma de inversión
          inmobiliaria en Colombia. Promovemos
          proyectos mixtos y te hacemos partícipe
          digitalmente.
        `,
    },
    {
      title: "Sin oficinas ni jefes",
      content: `
          Club Complex te permite con poco dinero y
          con un solo clic, invertir y generar ingresos
          inmobiliarios desde la comodidad de tu hogar.
        `,
    },
    {
      title: "Invierte cupando quieras",
      content: `
          Tienes la libertad y flexibilidad de invertir
          cuando quieras, así nunca te perderás los
          momentos importantes de tu vida. Haz que el
          dinero trabaje para ti y gana libertad.
        `,
    },
  ];
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container fixed>
          <FeaturesBox data={boxes} />
        </Container>
      </div>
    </React.Fragment>
  );
}
