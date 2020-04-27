import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../components/main-footer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Logo from '../../resources/images/clubcomplex-blue-logo.png';
import BackgroundImage from '../../resources/images/clubcomplex-home-background.jpg';
import InsightsOne from '../../resources/images/clubcomplex-home-insights-1.png';
import InsightsTwo from '../../resources/images/clubcomplex-home-insights-2.png';
import InsightsThree from '../../resources/images/clubcomplex-home-insights-3.png';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Chip from '@material-ui/core/Chip';

import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

function Profile() {
  const componentStyle = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2)
    },
    list: {
      width: '100%'
    }
  }));
  const classes = componentStyle();
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item>

        </Grid>
        <Grid item>
          <Typography variant="h6" component="h6">Juan Marin</Typography>
          <Typography variant="body1">juanmarino@mail.com</Typography>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" color="primary">Editar perfil</Link>
            </Grid>
            <Grid item>
              <Link variant="body2" color="error">Cerrar sesión</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography variant="h6" component="h6">Saldo en cuenta</Typography>
          <Typography variant="h4" component="h4">$ 134.353,53</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" component="h6">Medios de pago</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="PayPal" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Tarjeta de crédito ***4024" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">Portafolio</Typography>
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Títulos" />
              <ListItemSecondaryAction>
                <Chip variant="outlined" color="primary" label="3" />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Movimientos recientes" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}

function ProyectList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const componentStyle = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2)
    },
    title: {
      marginBottom: theme.spacing(1)
    },
    list: {
      width: '100%'
    }
  }));
  const classes = componentStyle();
  return (
    <Paper className={classes.paper}>
      <Typography variant="subtitle2" className={classes.title}>Lista de proyectos (1)</Typography>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Colombia (1)" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Casa Valles" secondary="Medellín, Ant. Cll 10 # 45 - 45" />
          </ListItem>
        </List>
      </Collapse>
    </Paper>
  );
}

function ProyectViewer() {
  return (
    <Paper>
      <h1>Profile</h1>
    </Paper>
  );
}

function Dashboard() {
  return (
    <React.Fragment>
      <div>
        <Container fixed>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Profile />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <ProyectList />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <ProyectViewer />
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}

function Header() {
  const componentStyle = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(4, 0),
      backgroundImage: `url(${BackgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    logoContainer: {
      flexGrow: 1
    },
    logo: {
      height: '50px'
    },
    content: {
      flexGrow: 1,
      width: '5%'
    },
    contentImage: {
      height: '110px',
      display: 'block',
      margin: '12px auto'
    }
  }));
  const classes = componentStyle();
  return(
    <React.Fragment>
      <div className={classes.root}>
        <Container fixed>
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <div className={classes.logoContainer}>
                <img src={Logo} className={classes.logo} />
              </div>
              <Grid container direction="row" pacing={2} className={classes.content}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <img src={InsightsOne} className={classes.contentImage} />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <img src={InsightsTwo} className={classes.contentImage} />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <img src={InsightsThree} className={classes.contentImage} />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default function () {
  return (
    <div>
      <CssBaseline />
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}