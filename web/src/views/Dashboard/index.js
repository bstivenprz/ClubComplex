import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';

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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Alert from '@material-ui/lab/Alert';

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

import { API_PROJECTS_LIST, API_PROJECTS } from '../../helpers/apiUrls.helper';

import ContextClient from '../../helpers/ContextClient';

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

function ConfirmPayment(props) {
  const { onClose, open, totalValue } = props;
  return (
    <Dialog onClose={() => onClose('payment')} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose('payment')}>
          Compra confirmada
        </DialogTitle>
        <DialogContent>
          <Alert severity="success">¡Compra confirmada! y en estado en proceso.</Alert>
          <Typography variant="body1" style={{ margin: '20px 0' }}>
            Le enviaremos un correo cuándo verifiquemos el pago.
          </Typography>
          <Typography variant="body1">
            <strong>Información de pago</strong>
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Bancolombia (Ahorros)" secondary="13-351-513" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <strong>
                  Valor a transferir
                </strong>
              </ListItemText>
              <ListItemSecondaryAction>
                <strong>
                {totalValue}
                </strong>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose('payment')} color="default">
            Cerrar
          </Button>
        </DialogActions>
    </Dialog>
  );
}

function Checkout(props) {
  const { onClose, open, submitShop, totalValue, quantity, titleName, titleValue, titleId, user } = props;
  return (
    <Dialog onClose={() => onClose('checkout')} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={() => onClose('checkout')}>
          Confirmar compra
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText primary={`${titleName} x ${quantity}`} secondary={titleId} />
              <ListItemSecondaryAction>
                {titleValue}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <strong>
                  Total
                </strong>
              </ListItemText>
              <ListItemSecondaryAction>
                <strong>
                {totalValue}
                </strong>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose('checkout')} color="default">
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={submitShop}>
            Comprar
          </Button>
        </DialogActions>
    </Dialog>
  );
}

function ProyectReview(props) {
  const { project } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [Quantity, setQuantity] = useState(1);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (project) {
      setTotalValue(project.technicsSpecifications.titleValue)
    }
  }, [project])

  const handleQuantity = (val) => {
    let restValue = 1;
    switch (val) {
      case 'rest':
        if (Quantity > 1) {
          restValue = Quantity - 1;
        }
        break;
      case 'add':
        if (Quantity < project.technicsSpecifications.availablesTitles) {
          restValue = Quantity + 1;
        }
      default:
        break;
    }
    setQuantity(restValue);
    setTotalValue(project.technicsSpecifications.titleValue * restValue);
  }
  
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

  const [open, setOpen] = React.useState({
    checkout: false,
    payment: false
  });

  const handlePaymentOpen = (prop) => {
    setOpen({ ...open, [prop]: true });
  };

  const handlePaymentClose = (prop) => {
    setOpen({ ...open, [prop]: false });
  };

  const submitShop = () => {
    setOpen({ checkout: false, payment: true });
  }

  return (
    <div>
      {!project && (
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
      {project && (
        <Grid
          container
          spacing={0}
          direction="row"
          style={{ minHeight: '40vh' }}
        >
          <Grid item xs={8} className={classes.contentDescription}>
            <Typography variant="h6">{project && project.title}</Typography>
            <Typography variant="body2" style={{ color: 'rgba(0, 0, 0, 0.4)' }} gutterBottom><strong>Proyecto # {project && project._id}</strong></Typography>
            <Typography variant="body1">{project && project.address}</Typography>
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
              {project && project.description}
            </Typography>
            <Divider />
            <div className={classes.getTitles}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={4} sm={4} md={4}>
                    <Grid container alignItems="center" className={classes.selectQuantity}>
                      <IconButton onClick={() => handleQuantity('rest')}>
                        <ExposureNeg1Icon />
                      </IconButton>
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="body1" style={{ margin: 12 }}><strong>{Quantity}</strong></Typography>
                      <Divider orientation="vertical" flexItem />
                      <IconButton onClick={() => handleQuantity('add')}>
                        <ExposurePlus1Icon />
                      </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Typography variant="subtitle2" style={{ color: 'rgba(0, 0, 0, 0.3)' }} >Total</Typography>
                    <Typography variant="body1"><strong>$ {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(totalValue)}</strong></Typography>
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
                      onClick={() => handlePaymentOpen('checkout')}
                      fullWidth
                    >
                      Comprar títulos
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid> 
          <Grid item xs={4} className={classes.contentDetails}>
            <Typography variant="body1"><strong>Especificaciones técnicas</strong></Typography>
            <List dense className={classes.detailsList}>
              {project.technicsSpecifications.purpose && (
                <ListItem>
                  <ListItemText>Destino</ListItemText>
                  <ListItemSecondaryAction>{project && project.technicsSpecifications.purpose}</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.builtArea && (
                <ListItem>
                  <ListItemText>Área construida</ListItemText>
                  <ListItemSecondaryAction>{project && project.technicsSpecifications.builtArea} m2</ListItemSecondaryAction>
                </ListItem>
              )}
              {String(project.technicsSpecifications.profitableArea).length > 0 && (
                <ListItem>
                  <ListItemText>Área rentable</ListItemText>
                  <ListItemSecondaryAction>{project && project.technicsSpecifications.profitableArea} m2</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.salableArea && (
                <ListItem>
                  <ListItemText>Área vendible</ListItemText>
                  <ListItemSecondaryAction>{project && project.technicsSpecifications.salableArea} m2</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.estimatedInvestment && (
                <ListItem>
                  <ListItemText>Inversión</ListItemText>
                  <ListItemSecondaryAction>{project && '$ ' + Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(project.technicsSpecifications.estimatedInvestment)}</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.estimatedProfit && (
                <ListItem>
                  <ListItemText>Utilidad estimada</ListItemText>
                  <ListItemSecondaryAction>{project && '$ ' + Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(project.technicsSpecifications.estimatedProfit)}</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.costEffectiveness && (
                <ListItem>
                  <ListItemText>Rentabilidad</ListItemText>
                  <ListItemSecondaryAction>{project && project.technicsSpecifications.costEffectiveness} %</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.tir && (
                <ListItem>
                  <ListItemText>TIR</ListItemText>
                  <ListItemSecondaryAction>{project && project.technicsSpecifications.tir} %</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.marketRatio && (
                <ListItem>
                  <ListItemText>Coeficiente del mercado</ListItemText>
                  <ListItemSecondaryAction>{project && Math.round(project.technicsSpecifications.marketRatio * 100) / 100}</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.complexRatio && (
                <ListItem>
                  <ListItemText>Coeficiente Complex</ListItemText>
                  <ListItemSecondaryAction>{project && project.technicsSpecifications.complexRatio} %</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.complexIndex && (
                <ListItem>
                  <ListItemText>Índice Complex</ListItemText>
                  <ListItemSecondaryAction>{project && project.technicsSpecifications.complexIndex} %</ListItemSecondaryAction>
                </ListItem>
              )}
              <Divider variant="middle" />
              {project.technicsSpecifications.titles && (
                <ListItem>
                  <ListItemText>Títulos</ListItemText>
                  <ListItemSecondaryAction>{project && project.technicsSpecifications.titles}</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.availablesTitles && (
                <ListItem>
                  <ListItemText>Títulos disponibles</ListItemText>
                  <ListItemSecondaryAction>{project && project.technicsSpecifications.availablesTitles}</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.titleValue && (
                <ListItem>
                  <ListItemText>Valor del título</ListItemText>
                  <ListItemSecondaryAction>{project && '$ ' + Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(project.technicsSpecifications.titleValue)}</ListItemSecondaryAction>
                </ListItem>
              )}
              {project.technicsSpecifications.titleIncome && (
                <ListItem>
                  <ListItemText>Renta del título</ListItemText>
                  <ListItemSecondaryAction>{project && '$ ' + Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(project.technicsSpecifications.titleIncome)}</ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </Grid>
          <Checkout
            onClose={handlePaymentClose}
            open={open.checkout}
            submitShop={submitShop}
            totalValue={'$ ' + Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(totalValue)}
            quantity={Quantity}
            titleName={project.title}
            titleValue={'$ ' + Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(project.technicsSpecifications.titleValue)}
            titleId={project._id}
          />
          <ConfirmPayment
            onClose={handlePaymentClose}
            open={open.payment}
            totalValue={'$ ' + Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(totalValue)}
          />
        </Grid>
      )}
    </div>
  );
}

function ContentCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [projectSelected, setProjectSelected] = useState(null);


  useEffect(() => {
    let _isMonted = false;
    if (!_isMonted) {
      listProjects();
    }
    return () => {
      _isMonted = true;
    }
  }, []);

  const listProjects = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.get(API_PROJECTS_LIST);
      if (response.status === 200) {
        setProjectList(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  const handleProjectsList = async (projectId) => {
    try {
      setIsLoading(true);
      const response = await Axios.get(`${API_PROJECTS}/${projectId}`);
      if (response.status === 200) {
        setProjectSelected(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

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
                      Lista de proyectos ({projectList.length})
                    </strong>
                  </Typography>
                  <List dense>
                    {projectList.length === 0 && (
                      <ListItem divider>
                        <ListItemText
                          primary="No hay proyectos"
                        />
                      </ListItem>
                    )}
                    {projectList.map((project, key) => {
                      const { projectId, projectName, projectAddress } = project;
                      return (
                        <ListItem button divider key={key} onClick={() => { handleProjectsList(projectId) }}>
                          <ListItemText
                            primary={projectName}
                            secondary={projectAddress}
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" >
                              <ArrowForwardIosIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
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
                <ProyectReview project={projectSelected} />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default function Dashboard(props) {
  const { authenticated } = useContext(ContextClient);

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