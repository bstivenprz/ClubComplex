import React from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";

/** Components */
import DesktopFooter from "./components/DesktopFooter";
import MobileFooter from "./components/MobileFooter";

/** Styles */
const useStyle = makeStyles((theme) => ({
  root: {
    height: "100%",
    padding: theme.spacing(6, 0),
    backgroundColor: theme.palette.background.footer.primary,
  },
}));

export default function () {
  const classes = useStyle();

  const info = {
    copyright: "Todos los derechos reservados.",
    urlSite: "http://clubcomplex.com",
    developer: "@bstivenprz",
    urlDeveloper: "https://www.linkedin.com/in/bstiven/",
  };

  return (
    <div className={classes.root}>
      <Container fixed>
        <Hidden smDown>
          <DesktopFooter info={info} />
        </Hidden>
        <Hidden smUp>
          <MobileFooter info={info} />
        </Hidden>
      </Container>
    </div>
  );
}
