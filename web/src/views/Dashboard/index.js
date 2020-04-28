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
import SimpleImageSlider from "react-simple-image-slider";

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

import ProyectImage from '../../resources/images/clubcomplex-proyect-image-1.jpeg';

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

function TechnicsSpecificationList({ items }) {
  const componentStyle = makeStyles((theme) => ({
    itemText: {
      '&.MuiListItemText-root': {
        marginTop: 0,
        marginBottom: 0
      }
    }
  }));
  const classes = componentStyle();
  return (
    <div style={{ width: '100%' }}>
      <List dense={true} disablePadding={false}>
        {items.map(({ title, content }, key) => {
          return (
            <ListItem dense={true} key={key}>
              <ListItemText className={classes.itemText}>
                <Typography variant="subtitle2"><strong>{title}</strong></Typography>
              </ListItemText>
              <ListItemSecondaryAction>
                <Typography variant="body2">{content}</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

function ProyectViewer() {
  const componentStyle = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2)
    }
  }));
  const classes = componentStyle();
  const images = [
    { url: ProyectImage },
    { url: BackgroundImage }
  ]
  const items = [
    { title: 'Destino', content: 'Venta' },
    { title: 'Área construida', content: '135 \u33A1' },
    { title: 'Área rentable', content: '46 \u33A1' },
    { title: 'Área vendible', content: '58 \u33A1' },
    { title: 'Inversión estimada', content: '$ 1.353.235,26' },
    { title: 'Utilidad estimada', content: '$ 1.353.235,26' },
    { title: 'Rentabilidad', content: '$ 1.353.235,26' },
    { title: 'TIR', content: '$ 1.353.235,26' },
    { title: 'Coeficiente mercado', content: '35.3' },
    { title: 'Índice Complex', content: '35.3' },
    { title: 'Cantidad de títulos', content: '6' },
    { title: 'Cantidad de títulos disponibles', content: '6' },
    { title: 'Valor del título', content: '$ 1.353.235,26' },
    { title: 'Renta del título', content: '$ 425.246,74 /mes' }
  ]
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h5" component="h5">Casa Luna del Vallés</Typography>
          <Typography variant="body2">Propiedad #136136113</Typography>
          <Grid container>
            <Grid item xs>
              <Typography variant="body1">La Ceja, Antioquia, Colombia.</Typography>
            </Grid>
            <Grid>
              <Link href="https://maps.google.com/" color="primary">
                Ver mapa
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {/* <SimpleImageSlider width={430} height={272} images={images} /> */}
          <Typography variant="body1"><strong>Descripción</strong></Typography>
          <Typography variant="body2" paragraph>
            Esta es una descripción corta a cerca del proyecto 
            Casa luna del Vallés en el municipio de La Ceja.
            Se pueden agregar máximo 3 líneas de descripción.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="body1"><strong>Especificaciones Técnicas</strong></Typography>
          <TechnicsSpecificationList items={items} />
        </Grid>
      </Grid>
    </Paper>
  );
}

function Dashboard() {
  return (
    <React.Fragment>
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