import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../../components/main-footer';
import Menu from '../../components/main-menu';
import Paper from '@material-ui/core/Paper';
import BackgroundImage from '../../resources/images/clubcomplex-home-background.jpg';
import FormLogo from '../../resources/images/clubcomplex-white-logo.png';
import { Typography, Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import InsightsOne from '../../resources/images/clubcomplex-home-insights-1.png';
import InsightsTwo from '../../resources/images/clubcomplex-home-insights-2.png';
import InsightsThree from '../../resources/images/clubcomplex-home-insights-3.png';

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
    }
  }));
  const classes = componentStyle();
  return (
    <Paper elevation={4} className={classes.paper}>
      <Typography variant="h6" component="h6">
        <Box fontWeight="fontWeightBold">
          REGÍSTRATE
        </Box>
      </Typography>
      <Grid container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              label="Nombre"
              id="landingpage-name"
              name="landingpage-name"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              label="Apellido"
              id="landingpage-last-name"
              name="landingpage-last-name"
              margin="normal"
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Correo electrónico"
            id="landingpage-email"
            name="landingpage-email"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            label="Teléfono"
            id="landingpage-phone"
            name="landingpage-phone"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            label="Ciudad"
            id="landingpage-city"
            name="landingpage-city"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            label="Código de invitación"
            id="landingpage-invitation-code"
            name="landingpage-invitation-code"
            margin="normal"
            required
            fullWidth
          />
        </Grid>
        <Typography variant="body2" paragraph className={classes.privacyText}>
          Al continuar reconoces haber leído las políticas de privacidad de
          Club Complex y aceptas sus condiciones de uso, de igual manera
          aceptas que sus representantes puedan contactarte por e-mail,
          teléfono, WhatsApp o cualquier medio de contacto suministrado.
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Registrarme
        </Button>
      </Grid>
    </Paper>
  );
}

function LandingPage() {
  const componentStyle = makeStyles((theme) => ({
    landingPage: {
      height: '100%',
      backgroundImage: `url(${BackgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    content: {
      marginBottom: theme.spacing(18)
    },
    form: {
      position: 'relative',
      top: '-80px',
      height: 220,
      margin: theme.spacing(2),
      padding: theme.spacing(2)
    }
  }));
  const classes = componentStyle();
  return (
    <React.Fragment>
      <Grid container component="main" className={classes.landingPage}>
        <Container fixed>
          <Menu />
          <Grid container direction="row" spacing={4} alignItems="center" className={classes.content}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <LandingPageInfo />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box display="flex" justifyContent="flex-end">
                <LandingPageForm />
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
        cuándo quieras, así nunca te perderás los
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
    <div>
      <CssBaseline />
      <LandingPage />
      <Features />
      <HowItWorks />
      <Insights />
      <Footer />
    </div>
  );
}