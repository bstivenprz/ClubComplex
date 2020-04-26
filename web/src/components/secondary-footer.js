import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: theme.palette.background.footer.secondary,
    padding: theme.spacing(4)
  },
  text: {
    margin: theme.spacing(1)
  }
}));

// TODO: No permitir que el footer sea fixed porque se vuelve sticky al scroll.
// TODO: Agregar el componente Container para los espacios laterales de la sección.

export default function () {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={6} >
        <Hidden smDown>
          <Box textAlign="left">
            <Typography variant="body2" color="textSecondary" className={classes.text}>
              {'Copyright © '}
              <Link color="inherit" href="http://clubcomplex.com/">
                Club Complex
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box textAlign="center">
            <Typography variant="body2" color="textSecondary" className={classes.text}>
              {'Copyright © '}
              <Link color="inherit" href="http://clubcomplex.com/">
                Club Complex
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Hidden>
      </Grid>
      <Grid item xs={12} sm={12} md={6} >
        <Hidden smDown>
          <Box textAlign="right">
            <Typography variant="body2" color="textSecondary" className={classes.text}>
              {'Sitio web creado por '}
              <Link color="inherit" href="http://clubcomplex.com/">
                @bstivenprz
              </Link>
            </Typography>
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box textAlign="center">
            <Typography variant="body2" color="textSecondary" className={classes.text}>
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