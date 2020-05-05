import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LogoBlue from '../resources/images/clubcomplex-blue-logo.png';
import LogoWithe from '../resources/images/clubcomplex-white-logo.png';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import ProfilePic from '../resources/images/defaultProfilePicture.jpg';
import { Container, MenuList, Typography, ListItemSecondaryAction } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListSubheader from '@material-ui/core/ListSubheader';
import HistoryIcon from '@material-ui/icons/History';
import List from '@material-ui/core/List';
import BusinessIcon from '@material-ui/icons/Business';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Edit from '@material-ui/icons/Edit';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import Auth from '../services/Authorization';

import { API_USER_EDIT } from '../helpers/apiUrls.helper';

import { ContextClientConsumer } from '../helpers/ContextClient';
import moment from 'moment';

function History(props) {
  const { onClose, open, user } = props;
  return (
    <Dialog onClose={() => onClose('history')} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          Movimientos recientes
        </DialogTitle>
        <DialogContent>
          <List>
            {user && user.transactions.length === 0 ? (
              <ListItem>
                <ListItemText primary="No hay transacciones." />
              </ListItem>
            ) : null}
            {user && user.transactions.map((transaction, key) => {
              const { transactionValue, transactionDate } = transaction;
              return (
                <ListItem key={key}>
                  <ListItemText primary="Compra de título" secondary={moment(transactionDate).format('DD/MM/YYYY HH:mm:ss')} />
                  <ListItemSecondaryAction>
                    {'$ ' + Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(transactionValue)}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose('history')} color="default">
            Salir
          </Button>
        </DialogActions>
    </Dialog>
  );
}

function Titles(props) {
  const { onClose, open, user } = props;
  return (
    <Dialog onClose={() => onClose('titles')} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs" fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          {`Títulos (${user && user.titles.length})`}
        </DialogTitle>
        <DialogContent>
          <List>
            {user && user.titles.length === 0 ? (
              <ListItem>
                <ListItemText primary="No tienes títulos aún." />
              </ListItem>
            ) : null}
            {user && user.titles.map((title, key) => {
              return (
                <ListItem key={key}>
                  <ListItemText primary={title.name} secondary={title.id} />
                  <ListItemSecondaryAction>
                    {title.value}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose('titles')} color="default">
            Salir
          </Button>
        </DialogActions>
    </Dialog>
  );
}

function Profile(props) {
  const { onClose, open, user } = props;
  const { _id, firstName, lastName, city, email, phone } = user;
  const [showAlert, setShowAlert] = useState({ severity: 'success', open: false, message: '' });
  const [editInputChange, setEditInputChange] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    city: true,
    password: true
  });
  const [editInputValues, setEditInputValues] = useState({});

  const handleInputValues = (prop) => (event) => {
    setEditInputValues({ ...editInputValues, [prop]: event.target.value });
    [prop] = event.target.value;
  }

  const handleInputChange = (prop) => {
    setEditInputChange({ ...editInputChange, [prop]: false });
  };

  const sendUserProfileChange = () => {
    Axios.put(`${API_USER_EDIT}/${_id}`, editInputValues)
    .then(response => {
      setShowAlert({ ...showAlert, open: true, message: '¡Usuario editado con exito!' });
    })
    .catch(error => {
      console.log(error)
      setShowAlert({ open: true, severity: 'error', message: 'Hubo un error al editar el usuario.' });
    })
    .finally(_ => {
      setTimeout(() => {
        setShowAlert({ ...showAlert, open: false });
      }, 3000);
    })
  }

  return (
    <Dialog onClose={() => onClose('profile')} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          Perfil
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={12} md={6}>
              <FormControl>
                <InputLabel htmlFor="profile-first-name">Nombre</InputLabel>
                <Input
                  id="profile-first-name"
                  readOnly={editInputChange.firstName}
                  onChange={handleInputValues('firstName')}
                  defaultValue={firstName}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleInputChange('firstName')}
                      >
                        <Edit />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl>
                <InputLabel htmlFor="profile-last-name">Apellido</InputLabel>
                <Input
                  id="profile-last-name"
                  readOnly={editInputChange.lastName}
                  onChange={handleInputValues('lastName')}
                  defaultValue={lastName}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleInputChange('lastName')}
                      >
                        <Edit />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl>
                <InputLabel htmlFor="profile-email">Correo electrónico</InputLabel>
                <Input
                  id="profile-email"
                  readOnly={editInputChange.email}
                  onChange={handleInputValues('email')}
                  defaultValue={email}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleInputChange('email')}
                      >
                        <Edit />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl>
                <InputLabel htmlFor="profile-phone">Teléfono</InputLabel>
                <Input
                  id="profile-phone"
                  readOnly={editInputChange.phone}
                  onChange={handleInputValues('phone')}
                  defaultValue={phone}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleInputChange('phone')}
                      >
                        <Edit />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl>
                <InputLabel htmlFor="profile-city">Ciudad</InputLabel>
                <Input
                  id="profile-city"
                  readOnly={editInputChange.city}
                  onChange={handleInputValues('city')}
                  defaultValue={city}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleInputChange('city')}
                      >
                        <Edit />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl>
                <InputLabel htmlFor="profile-password">Contraseña</InputLabel>
                <Input
                  id="profile-password"
                  readOnly={editInputChange.password}
                  onChange={handleInputValues('password')}
                  type="password"
                  defaultValue={'Pass'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleInputChange('password')}
                      >
                        <Edit />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose('profile')} color="default">
            Salir
          </Button>
          <Button autoFocus onClick={sendUserProfileChange} color="primary">
            Guardar
          </Button>
        </DialogActions>
        <Snackbar open={showAlert.open} autoHideDuration={3000}>
          <Alert severity={showAlert.severity}>
            {showAlert.message}
          </Alert>
        </Snackbar>
      </Dialog>
  );
}

export default function MainMenu() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    toolbar: {
      padding: theme.spacing(1, 0)
    },
    logoContainer: {
      flexGrow: 1
    },
    logo: {
      height: '50px'
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    userName: {
      flexGrow: 1
    }
  }));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState({
    profile: false,
    titles: false,
    history: false
  });

  const handleProfileOpen = (prop) => {
    handleClose();
    setOpen({ ...open, [prop]: true });
  };

  const handleProfileClose = (prop) => {
    setOpen({ ...open, [prop]: false });
  };

  return (
    <ContextClientConsumer>
      {({ authenticated, user }) => {
        return (
          <div className={classes.root}>
            <AppBar position="static" color={user ? "primary" : "transparent"} elevation={0}>
              <Container fixed>
                <Toolbar className={classes.toolbar}>
                  <div className={classes.logoContainer}>
                    <img src={user ? LogoWithe : LogoBlue} className={classes.logo} />
                  </div>
                  {!authenticated && (
                    <Button color={user ? "inherit" : "primary"} variant="outlined" component={RouterLink} to="/login" className={classes.link}>
                      Ingresar
                    </Button>
                  )}
                  {authenticated && user && (
                    <div>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >
                        <Avatar src={ProfilePic} />
                      </IconButton>
                      <Menu
                        elevation={2}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem>
                          <ListItemIcon>
                            <AttachMoneyIcon fontSize="large" />
                          </ListItemIcon>
                          <ListItemText primary="Saldo en cuenta" secondary={user && '$ ' + Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(user.accountBalance)} />
                        </MenuItem>
                        <Divider />
                        <ListSubheader component="div" id="nested-list-subheader">
                          Portafolio
                        </ListSubheader>
                        <MenuItem onClick={() => handleProfileOpen('titles')}>
                          <ListItemIcon>
                            <BusinessIcon />
                          </ListItemIcon>
                          <ListItemText primary="Títulos" />
                        </MenuItem>
                        <MenuItem onClick={() => handleProfileOpen('history')} >
                          <ListItemIcon>
                            <HistoryIcon />
                          </ListItemIcon>
                          <ListItemText primary="Movimientos recientes" />
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                          <ListItemIcon>
                            <SupervisorAccountIcon />
                          </ListItemIcon>
                          <ListItemText primary="Código de invitación" secondary={user && user.referralCode} />
                        </MenuItem>
                        <MenuItem onClick={() => handleProfileOpen('profile')} >
                          <ListItemIcon>
                            <AccountCircle />
                          </ListItemIcon>
                          <ListItemText primary="Cuenta" />
                        </MenuItem>
                        <MenuItem onClick={Auth.logOut}>
                          <ListItemIcon>
                            <ExitToAppIcon style={{ color: 'red' }} />
                          </ListItemIcon>
                          <ListItemText primary="Cerrar sesión" style={{ color: 'red' }}/>
                        </MenuItem>
                      </Menu>
                      <Profile onClose={handleProfileClose} open={open.profile} user={user} />
                      <Titles onClose={handleProfileClose} open={open.titles} user={user} />
                      <History onClose={handleProfileClose} open={open.history} user={user} />
                    </div>
                  )}
                </Toolbar>
              </Container>
            </AppBar>
          </div>
        );
      }}
    </ContextClientConsumer>
  );
}