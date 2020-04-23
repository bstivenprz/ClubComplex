import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.footer.secondary
  },
  content: {
    margin: theme.spacing(4)
  }
}));

export default function () {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={12}>
        <div className={classes.content}>
          <Grid container>
            <Grid item xs={6} sm={6} md={6} >
              <Typography variant="body2" color="textSecondary" align="right">
                <Box textAlign="left">
                  {'Copyright © '}
                  <Link color="inherit" href="http://clubcomplex.com/">
                    Club Complex
                  </Link>{' '}
                  {new Date().getFullYear()}
                  {'.'}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} >
              <Typography variant="body2" color="textSecondary" align="left">
                <Box textAlign="right">
                  {'Sitio web creado por '}
                  <Link color="inherit" href="http://clubcomplex.com/">
                    @bstivenprz
                  </Link>
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}