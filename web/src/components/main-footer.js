import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Logo from '../resources/images/clubcomplex-white-logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '180px',
    backgroundColor: theme.palette.background.footer.primary,
    padding: theme.spacing(4)
  },
  centerLogo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '40px'
  },
  logo: {
    display: 'block',
    height: '40px'
  },
  text: {
    margin: theme.spacing(1),
    color: theme.palette.text.contrastText
  }
}));

export default function () {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Hidden smDown>
          <img src={Logo} className={classes.logo} />
        </Hidden>
        <Hidden smUp>
          <img src={Logo} className={classes.centerLogo} />
        </Hidden>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Box textAlign="center">
          <Typography variant="body2" align="center" className={classes.text}>
            {'Copyright © '}
            <Link color="inherit" href="http://clubcomplex.com/">
              Club Complex
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Hidden smDown>
          <Box textAlign="right">
            <Typography variant="body2" align="center" className={classes.text}>
              {'Sitio web creado por '}
              <Link color="inherit" href="http://clubcomplex.com/">
                @bstivenprz
              </Link>
            </Typography>
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box textAlign="center">
            <Typography variant="body2" align="center" className={classes.text}>
              {'Sitio web creado por '}
              <Link color="inherit" href="http://clubcomplex.com/">
                @bstivenprz
              </Link>
            </Typography>
          </Box>
        </Hidden>
      </Grid>
    </Grid>
  );
}