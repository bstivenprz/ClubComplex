import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
/** Material UI */
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';

/** Components */
import Footer from '../../components/main-footer';
import Menu from '../../components/main-menu';

/** Media Files */
import BackgroundImage from '../../resources/images/clubcomplex-home-background.jpg';
import FormLogo from '../../resources/images/clubcomplex-white-logo.png';
import InsightsOne from '../../resources/images/clubcomplex-home-insights-1.png';
import InsightsTwo from '../../resources/images/clubcomplex-home-insights-2.png';
import InsightsThree from '../../resources/images/clubcomplex-home-insights-3.png';

import Auth from '../../services/Authorization';
import ContextClient from '../../helpers/ContextClient';

function LandingPageInfo() {
  const componentStyle = makeStyles((theme) => ({
    logo: {
      height: '80px'
    },
    contentTextTitle: {
      margin: theme.spacing(2, 0),
      color: theme.palette.text.contrastText
    },
    contentText: {
      color: theme.palette.text.contrastText
    }
  }));
  const classes = componentStyle();
  return (
    <div>
      <img src={FormLogo} className={classes.logo} />
      <Typography variant="h4" component="h4" className={classes.contentTextTitle}>NECESITA SOCIOS COMO TÚ</Typography>
      <Typography variant="body1" paragraph className={classes.contentText}>
        Genera ganancias adicionales de manera inteligente, sé dueño de tu tiempo y transforma tu vida.
      </Typography>
      <Typography variant="body1" paragraph className={classes.contentText}>
          <strong>
            Únete a la comunidad Complex.
          </strong>
      </Typography>
    </div>
  );
}

function LandingPageForm() {
  const componentStyle = makeStyles((theme) => ({
    paper: {
      width: 400,
      padding: theme.spacing(3)
    },
    privacyText: {
      margin: theme.spacing(2, 0)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
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
    }
  }));
  const classes = componentStyle();
  const [isLoading, setIsLoading] = useState(false);
  const [FormError, setFormError] = useState({
    signupFirstName: false,
    signupLastName: false,
    signupEmail: false,
    signupPhone: false,
    signupCity: false,
    signupPassword: { validation: false, messageError: '' }
  });
  const [ShowAlert, setShowAlert] = useState({ state: false, type: 'warning', message: ''  });
  const [SignUpFormData, setSignUpFormData] = useState({ role: 'USER' });
  const [SuccessSignUp, setSuccessSignUp] = useState({ success: false, newUserName: '' });

  const handleFormImputs = (event) => {
    setSignUpFormData({ ...SignUpFormData, [event.target.name]: event.target.value });
  }

  const validateForm = (event) => {
    if (event.target.name === 'signupPassword') {
      if (event.target.value === '') {
        setFormError({ ...FormError, signupPassword: { validation: true, messageError: 'Debes de ingresar una contraseña.' } });
      } else if (event.target.value.length < 8) {
        setFormError({ ...FormError, signupPassword: { validation: true, messageError: 'La contraseña debe contener mínimo 8 carácteres.' } })
      } else {
        setFormError({ ...FormError, signupPassword: { validation: false } });
      }
    } else {
      if (!SignUpFormData[event.target.name] || SignUpFormData[event.target.name] === '') {
        setFormError({ ...FormError, [event.target.name]: true });
      } else {
        setFormError({ ...FormError, [event.target.name]: false });
      }
    }
  }

  const checkForm = () => {
    const { signupFirstName, signupLastName, signupEmail, signupPhone, signupCity, signupPassword } = SignUpFormData;
    if ((signupFirstName && signupFirstName !== '') &&
    (signupLastName && signupLastName !== '') &&
    (signupEmail && signupEmail !== '') &&
    (signupPhone && signupPhone !== '') &&
    (signupCity && signupCity !== '') &&
    (signupPassword && signupPassword !== '')) {
      return true;
    } else {
      return false;
    }
  }

  const SuccessSignUpComponent = () => {
    return (
      <Paper elevation={4} className={classes.paper} style={{ textAlign: 'center' }}>
        <Typography variant="h6" component="h6" color="primary">¡Bienvenido {SuccessSignUp.newUserName}!</Typography>
        <Typography variant="body1" paragraph>
          Ya eres parte de Club Complex. Por favor revisa tu correo electrónico
          para verificar tu cuenta y poder ingresar a la plataforma.
        </Typography>
      </Paper>
    );
  }

  const signUpNewUser = (event) => {
    event.preventDefault();
    if (checkForm()) {
      setIsLoading(true);
      Auth.signUp(SignUpFormData).then((result) => {
        const { success, userData } = result;
        setSuccessSignUp({ success, newUserName: userData.firstName });
      }).catch((err) => {
        if (err.response.data) {
          const { type, message } = err.response.data;
          setShowAlert({ state: true, type, message });
          setTimeout(() => { setShowAlert({ state: false, type, message }) }, 5000);
        } else {
          setShowAlert({ state: true, type: "error", message: 'Ocurrió un error en el proceso. Por favor, inténtalo más tarde.' });
          setTimeout(() => { setShowAlert({ state: false, type: "error", message: 'Ocurrió un error en el proceso. Por favor, inténtalo más tarde.' }) }, 5000);
        }
      }).finally(() => {
        setIsLoading(false);
      })
    } else {
      setShowAlert({ state: true, type: "warning", message: 'Por favor llene todos los campos para poder registrarse.' });
      setTimeout(() => { setShowAlert({ state: false, type: "warning", message: 'Por favor llene todos los campos para poder registrarse.' }) }, 5000);
    }
  }

  return (
    <>
      {SuccessSignUp.success && <SuccessSignUpComponent />}
        {!SuccessSignUp.success &&
          <Paper elevation={4} className={classes.paper}>
            <Typography variant="h6" component="h6">
              <Box fontWeight="fontWeightBold">
                REGÍSTRATE
              </Box>
            </Typography>
            <Grid container>
              <form onSubmit={signUpNewUser}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      label="Nombre"
                      id="landingpage-name"
                      name="signupFirstName"
                      margin="normal"
                      onChange={handleFormImputs}
                      onBlur={validateForm}
                      error={FormError.signupFirstName}
                      helperText={FormError.signupFirstName ? 'Debes de ingresar tú nombre.' : '' }
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      label="Apellido"
                      id="landingpage-last-name"
                      name="signupLastName"
                      margin="normal"
                      onChange={handleFormImputs}
                      onBlur={validateForm}
                      error={FormError.signupLastName }
                      helperText={FormError.signupLastName ? 'Debes de ingresar tú apellido.' : '' }
                      required
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Correo electrónico"
                    id="landingpage-email"
                    name="signupEmail"
                    margin="normal"
                    onChange={handleFormImputs}
                    onBlur={validateForm}
                    error={FormError.signupEmail}
                    helperText={FormError.signupEmail ? 'Debes de ingresar tú correo electrónico.' : '' }
                    required
                    fullWidth
                  />
                  <TextField
                    label="Teléfono"
                    id="landingpage-phone"
                    name="signupPhone"
                    margin="normal"
                    onChange={handleFormImputs}
                    onBlur={validateForm}
                    error={FormError.signupPhone}
                    helperText={FormError.signupPhone ? 'Debes de tú número de teléfono.' : '' }
                    required
                    fullWidth
                  />
                  <TextField
                    label="Ciudad"
                    id="landingpage-city"
                    name="signupCity"
                    margin="normal"
                    onChange={handleFormImputs}
                    onBlur={validateForm}
                    error={FormError.signupCity}
                    helperText={FormError.signupCity ? 'Por favor ingresa tú ciudad.' : '' }
                    required
                    fullWidth
                  />
                  <TextField
                    label="Contraseña"
                    id="landingpage-password"
                    name="signupPassword"
                    margin="normal"
                    type="password"
                    onChange={handleFormImputs}
                    onBlur={validateForm}
                    error={FormError.signupPassword.validation}
                    helperText={FormError.signupPassword.validation ? FormError.signupPassword.messageError : '' }
                    required
                    fullWidth
                  />
                  <TextField
                    label="Código de invitación"
                    id="landingpage-invitation-code"
                    name="signupReferralCode"
                    margin="normal"
                    onChange={handleFormImputs}
                    fullWidth
                  />
                </Grid>
                <Typography variant="body2" paragraph className={classes.privacyText}>
                  Al continuar reconoces haber leído las políticas de privacidad de
                  Club Complex y aceptas sus condiciones de uso, de igual manera
                  aceptas que sus representantes puedan contactarte por e-mail,
                  teléfono, WhatsApp o cualquier medio de contacto suministrado.
                </Typography>
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
                    Registrarme
                  </Button>
                  {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
                <Collapse in={ShowAlert.state}>
                  <Alert severity={ShowAlert.type}>{ShowAlert.message}</Alert>
                </Collapse>
              </form>
          </Grid>
        </Paper>
      }
    </>
  );
}

function LandingPage({ auth }) {
  const componentStyle = makeStyles((theme) => ({
    landingPage: {
      height: '100%',
      backgroundImage: `url(${BackgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    content: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(18)
    },
    form: {
      position: 'relative',
      top: '-80px',
      height: 220,
      margin: theme.spacing(2),
      padding: theme.spacing(2)
    },
    paper: {
      width: 400,
      padding: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    }
  }));

  const UserAuthenticated = () => {
    return (
      <Paper elevation={4} className={classes.paper} style={{ textAlign: 'center' }}>
        <Typography variant="h6" component="h6" color="primary">¡Cónoce nuestros proyectos!</Typography>
        <Typography variant="body1" paragraph>
          Ya eres parte de Club Complex. Ingresa aquí para ver los proyectos en los que puedes invertir fácilmente.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          component={RouterLink}
          to="/dashboard"
        >
          VER PROYECTOS
        </Button>
      </Paper>
    );
  }

  const classes = componentStyle();
  return (
    <React.Fragment>
      <Grid container component="main" className={classes.landingPage}>
        <Container fixed>
            <Menu origin="/" />
          <Grid container direction="row" spacing={4} alignItems="center" className={classes.content}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <LandingPageInfo />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box display="flex" justifyContent="flex-end">
                {!auth && <LandingPageForm />}
                {auth && <UserAuthenticated />}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </React.Fragment>
  );
}

function FeaturesBox({ data }) {
  const componentStyle = makeStyles((theme) => ({
    paper: {
      position: 'relative',
      top: '-80px',
      height: 220,
      margin: theme.spacing(2),
      padding: theme.spacing(2)
    },
    sideLine: {
      borderLeft: '6px solid #00ACED',
      marginRight: '8px',
      marginTop: '5px',
      height: '20px'
    },
    title: {
      textTransform: 'uppercase',
      marginBottom: theme.spacing(1)
    }
  }));
  const classes = componentStyle();
  return (
    <Grid container>
      {data.map(({ title, content }, key) => {
        return (
          <Grid item xs={12} sm={12} md={4} lg={4} key={key}>
            <Paper elevation={2} className={classes.paper}>
              <Box display="flex" flexDirection="row">
                <div className={classes.sideLine}></div>
                <Typography variant="h6" component="h6" className={classes.title}>{title}</Typography>
              </Box>
              <Typography variant="body1">{content}</Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

function Features() {
  const componentStyle = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.secondary
    }
  }));
  const classes = componentStyle();
  const boxes = [
    {
      title: 'Genera ganancias',
      content: `
        Somos la primera plataforma de inversión
        inmobiliaria en Colombia. Promovemos
        proyectos mixtos y te hacemos partícipe
        digitalmente.
      `
    },
    {
      title: 'Sin oficinas ni jefes',
      content: `
        Club Complex te permite con poco dinero y
        con un solo clic, invertir y generar ingresos
        inmobiliarios desde la comodidad de tu hogar.
      `
    },
    {
      title: 'Invierte cupando quieras',
      content: `
        Tienes la libertad y flexibilidad de invertir
        cuando quieras, así nunca te perderás los
        momentos importantes de tu vida. Haz que el
        dinero trabaje para ti y gana libertad.
      `
    }
  ];
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container fixed>
            <FeaturesBox data={boxes} />
        </Container>
      </div>
    </React.Fragment>
  );
}

function HowItWorksCard({ data }) {
  const componentStyle = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(2),
      height: '300px',
      padding: theme.spacing(8, 2)
    },
    hugeNumber: {
      color: '#CCCFDB',
      position: 'relative',
      bottom: '-80px',
      paddingLeft: 32
    },
    title: {
      textTransform: 'uppercase',
      marginBottom: theme.spacing(1)
    },
    sideLine: {
      borderLeft: '6px solid #00ACED',
      margin: '5px',
      height: '20px'
    }
  }));
  const classes = componentStyle();
  return data.map(({ number, title, content }, key) => {
    return (
      <Grid item xs={12} sm={12} md={4} lg={4} key={key}>
        <Typography variant="h1" component="h1" className={classes.hugeNumber}>
          <Box fontWeight="fontWeightBold">
            {number}
          </Box>
        </Typography>
        <Paper elevation={2} className={classes.paper}>
          <Box display="flex" flexDirection="row">
            <div className={classes.sideLine}></div>
            <Typography variant="h6" component="h6" className={classes.title}>{title}</Typography>
          </Box>
          <Typography variant="body1">{content}</Typography>
        </Paper>
      </Grid>
    );
  });
}

function HowItWorks() {
  const componentStyle = makeStyles((theme) => ({
    root: {
      backgroundColor: '#FFF',
      padding: theme.spacing(12, 0)
    }
  }));
  const classes = componentStyle();
  const boxes = [
    {
      number: 1,
      title: 'Únete',
      content: `
        Regístrate de forma gratuita con tu nombre,
        correo electrónico, teléfono, ciudad y si
        alguien te ha referido con nosotros ingresa
        su código promocional.
      `
    },
    {
      number: 2,
      title: 'Explora',
      content: `
        Revisa nuestra oferta de proyectos
        inmobiliarios y decide en cuál te gustaría
        participar.
      `
    },
    {
      number: 3,
      title: 'Invierte',
      content: `
        Una vez seleccionado un proyecto haz clic
        y espera que nuestro equipo te contacte.
      `
    }
  ];
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container fixed>
          <Typography variant="h5" component="h5">
            <Box fontWeight="fontWeightBold">
              ¿CÓMO FUNCIONA?
            </Box>
          </Typography>
          <Grid container>
            <HowItWorksCard data={boxes} />
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}

function Insights() {
  const componentStyle = makeStyles((theme) => ({
    root: {
      backgroundColor: '#FAFAFA'
    },
    content: {
      padding: theme.spacing(12, 0)
    },
    contentImage: {
      height: '230px',
      display: 'block',
      margin: '12px auto'
    }
  }));
  const classes = componentStyle();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container fixed>
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
        </Container>
      </div>
    </React.Fragment>
  );
}

export default function Home() {
  return (
    <ContextClient.Consumer>
      {({ authenticated }) => {
        return (
          <div>
            <CssBaseline />
            <LandingPage auth={authenticated} />
            <Features />
            <HowItWorks />
            <Insights />
            <Footer />
          </div>
        );
      }}
    </ContextClient.Consumer>
  );
}