import React, { useState } from 'react';

/** Material UI */
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

/** Material UI Icons */
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import TransformIcon from '@material-ui/icons/Transform';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

/** Components */
import MainMenu from '../../components/main-menu';
import Slider from '../../components/image-slider';
import Footer from '../../components/main-footer';

/** Resources */
import './slider-style.css';
import BackgroundImage from '../../resources/images/clubcomplex-home-background.jpg';
import PayPalLogo from '../../resources/images/paypal-logo.jpg';
import ProjectImage from '../../resources/images/projectImage.jpg';

function HeroHeader() {
  const componentStyle = makeStyles((theme) => ({
    hero: {
      height: '100%',
      backgroundImage: `url(${BackgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '20vh'
    }
  }));
  const classes = componentStyle();
  return (
    <React.Fragment>
      <Grid container component="main" className={classes.hero}>
        {/* <Container fixed>
          <Grid item>
            <Typography variant="h5" color="primary">Bienvenido Brandon</Typography>
          </Grid>
        </Container> */}
      </Grid>
    </React.Fragment>
  );
}

function ProyectReview(props) {
  const { proyect } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [Quantity, setQuantity] = useState(0);
  
  const componentStyle = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    contentDescription: {
      padding: theme.spacing(2)
    },
    contentDetails: {
      padding: theme.spacing(2),
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)'
    },
    detailsList: {
      "&.MuiListItemText-root": {
        marginTop: 0,
        marginBottom: 0,
      },
      "& div": {
        "&.MuiListItemSecondaryAction-root": {
          color: 'rgba(0, 0, 0, 0.4)'
        }
      }
    },
    getTitles: {
      margin: theme.spacing(2, 1)
    },
    formControl: {
      minWidth: 120
    },  
    wrapper: {
      width: '100%',
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonProgress: {
      color: theme.palette.primary,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    selectQuantity: {
      width: 'fit-content',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.secondary,
      '& hr': {
        margin: theme.spacing(0, 0.5),
      },
    }
  }));
  const classes = componentStyle();
  return (
    <div>
      {!proyect && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '40vh', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          <Grid item>
            <Typography variant="h4" style={{ color: 'rgba(0, 0, 0, 0.1)' }}>
              Ningún proyecto seleccionado
            </Typography>
          </Grid> 
        </Grid>
      )}
      {proyect && (
        <Grid
          container
          spacing={0}
          direction="row"
          style={{ minHeight: '40vh' }}
        >
          <Grid item xs={8} className={classes.contentDescription}>
            <Typography variant="h6">Casa Luna de Vallés</Typography>
            <Typography variant="body2" style={{ color: 'rgba(0, 0, 0, 0.4)' }} gutterBottom><strong>Proyecto # 139813613</strong></Typography>
            <Typography variant="body1">La Ceja, Antioquia. Colombia</Typography>
            <div className="ExampleSliders">
              <Slider
                loop={true}
                showNav={true}
              >
                <img src={ProjectImage} style={{ width: '583.98px' }} />
                <img src={ProjectImage} style={{ width: '583.98px' }} />
              </Slider>
            </div>
            <Typography variant="body1"><strong>Descripcion</strong></Typography>
            <Typography variant="body1" paragraph>
              Esta es una descripción corta a cerca del proyecto Casa luna del Vallés
              en el municipio de La Ceja. Se pueden agregar máximo 3 líneas de descripción.
            </Typography>
            <Divider />
            <form className={classes.getTitles}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={4} sm={4} md={4}>
                    <Grid container alignItems="center" className={classes.selectQuantity}>
                      <IconButton onClick={() => Quantity <= 0 ? 0 : setQuantity(Quantity - 1)}>
                        <ExposureNeg1Icon />
                      </IconButton>
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="body1" style={{ margin: 12 }}><strong>{Quantity}</strong></Typography>
                      <Divider orientation="vertical" flexItem />
                      <IconButton onClick={() => setQuantity(Quantity + 1)}>
                        <ExposurePlus1Icon />
                      </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Typography variant="subtitle2" style={{ color: 'rgba(0, 0, 0, 0.3)' }} >Total</Typography>
                  <Typography variant="h6"><strong>$ 144.246,42</strong></Typography>
                  <Divider orientation="vertical" flexItem />
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <div className={classes.wrapper}>
                    <Button
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={isLoading}
                      fullWidth
                    >
                      Comprar títulos
                    </Button>
                    {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </Grid>
              </Grid>
            </form>
          </Grid> 
          <Grid item xs={4} className={classes.contentDetails}>
            <Typography variant="body1"><strong>Especificaciones técnicas</strong></Typography>
            <List dense className={classes.detailsList}>
              <ListItem>
                <ListItemText>Destino</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Área construida</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Área rentable</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Área vendible</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Inversiónn estimada</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Utilidad estimada</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Rentabilidad</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>TIR</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Coeficiente del mercado</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Coeficiente Complex</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Índice Complex</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <Divider variant="middle" />
              <ListItem>
                <ListItemText>Títulos</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Títulos disponibles</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Valor del título</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText>Renta del título</ListItemText>
                <ListItemSecondaryAction>Venta</ListItemSecondaryAction>
              </ListItem>
            </List>
          </Grid>
        </Grid> 
      )}
    </div>
  );
}

function ContentCard() {
  const componentStyle = makeStyles((theme) => ({
    root: {
      position: 'relative',
      top: '-80px'
    },
    listTitle: {
      margin: theme.spacing(2)
    }
  }))
  const classes = componentStyle();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container fixed>
          <Paper>
            <Grid container>
              <Grid item xs={3} sm={3} md={3} style={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <div>
                  <Typography variant="body1" className={classes.listTitle} >
                    <strong>
                      Lista de proyectos (1)
                    </strong>
                  </Typography>
                  <List dense>
                    <ListItem button divider>
                      {/* <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar> */}
                      <ListItemText
                        primary="Casa Luna del Vallés"
                        secondary="La Ceja, Antioquia."
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button divider>
                      {/* <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar> */}
                      <ListItemText
                        primary="Single-line item"
                        secondary="Secondary text"
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button divider>
                      {/* <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar> */}
                      <ListItemText
                        primary="Single-line item"
                        secondary="Secondary text"
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </div>
                <div>
                  <Typography variant="body1" className={classes.listTitle} >
                    <strong>
                      Medios de pago
                    </strong>
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: '#F5F5F5' }}>
                          <TransformIcon fontSize="small" color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Transferencia bancaria" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src={PayPalLogo} />
                      </ListItemAvatar>
                      <ListItemText primary="PayPal" />
                    </ListItem>
                  </List>
                </div>
              </Grid>
              <Grid item xs={9} sm={9} md={9}>
                <ProyectReview proyect={true} />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default function Dashboard() {
  return (
    <div>
      <CssBaseline />
      <MainMenu />
      <HeroHeader />
      <ContentCard />
      <Footer />
    </div>
  );
}