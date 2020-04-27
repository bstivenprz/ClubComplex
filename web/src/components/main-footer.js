import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import Logo from '../resources/images/clubcomplex-white-logo.png';

function MobileFooter(props) {
  const { copyright, urlSite, developer, urlDeveloper } = props.info;
  const componentStyle = makeStyles((theme) => ({
    text: {
      margin: theme.spacing(4, 0),
      color: theme.palette.text.contrastText
    }
  }));
  const classes = componentStyle();
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
            </Link>
            {' '}
            {new Date().getFullYear()}
            {' © '}
          </Box>
          { copyright }
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" align="center" className={classes.text}>
          {'Sitio web creado por '}
          <Box fontWeight="fontWeightBold" display="inline">
            <Link color="inherit" href={urlDeveloper}>
              { developer }
            </Link>
          </Box>
        </Typography>
      </Grid>
    </Grid>
  );
}

function DesktopFooter(props) {
  const { copyright, urlSite, developer, urlDeveloper } = props.info;
  const componentStyle = makeStyles((theme) => ({
    logo: {
      display: 'block',
      height: '40px'
    },
    text: {
      color: theme.palette.text.contrastText
    }
  }));
  const classes = componentStyle();
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
            </Link>
            {' '}
            {new Date().getFullYear()}
            {' © '}
          </strong>
          { copyright }
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" align="center" className={classes.text}>
          {'Sitio web creado por '}
          <strong>
            <Link color="inherit" href={urlDeveloper}>
              { developer }
            </Link>
          </strong>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default function () {
  const componentStyle = makeStyles((theme) => ({
    root: {
      height: '100%',
      padding: theme.spacing(6, 0),
      backgroundColor: theme.palette.background.footer.primary
    }
  }));
  const classes = componentStyle();

  const info = {
    copyright: "Todos los derechos reservados.",
    urlSite: "http://clubcomplex.com",
    developer: "@bstivenprz",
    urlDeveloper: "https://www.linkedin.com/in/bstiven/"
  }

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
  )
}