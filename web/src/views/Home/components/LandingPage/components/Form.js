import React, { useState } from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";

/** Services */
import Auth from "../../../../../services/Authorization";

/** Styles */
const useStyle = makeStyles((theme) => ({
  paper: {
    width: 400,
    padding: theme.spacing(3),
  },
  privacyText: {
    margin: theme.spacing(2, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    width: "100%",
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.palette.primary,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function LandingPageForm() {
  const classes = useStyle();
  const [isLoading, setIsLoading] = useState(false);
  const [FormError, setFormError] = useState({
    signupFirstName: false,
    signupLastName: false,
    signupEmail: false,
    signupPhone: false,
    signupCity: false,
    signupPassword: { validation: false, messageError: "" },
  });
  const [ShowAlert, setShowAlert] = useState({
    state: false,
    type: "warning",
    message: "",
  });
  const [SignUpFormData, setSignUpFormData] = useState({ role: "USER" });
  const [SuccessSignUp, setSuccessSignUp] = useState({
    success: false,
    newUserName: "",
  });

  const handleFormImputs = (event) => {
    setSignUpFormData({
      ...SignUpFormData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = (event) => {
    if (event.target.name === "signupPassword") {
      if (event.target.value === "") {
        setFormError({
          ...FormError,
          signupPassword: {
            validation: true,
            messageError: "Debes de ingresar una contraseña.",
          },
        });
      } else if (event.target.value.length < 8) {
        setFormError({
          ...FormError,
          signupPassword: {
            validation: true,
            messageError: "La contraseña debe contener mínimo 8 carácteres.",
          },
        });
      } else {
        setFormError({ ...FormError, signupPassword: { validation: false } });
      }
    } else {
      if (
        !SignUpFormData[event.target.name] ||
        SignUpFormData[event.target.name] === ""
      ) {
        setFormError({ ...FormError, [event.target.name]: true });
      } else {
        setFormError({ ...FormError, [event.target.name]: false });
      }
    }
  };

  const checkForm = () => {
    const {
      signupFirstName,
      signupLastName,
      signupEmail,
      signupPhone,
      signupCity,
      signupPassword,
    } = SignUpFormData;
    if (
      signupFirstName &&
      signupFirstName !== "" &&
      signupLastName &&
      signupLastName !== "" &&
      signupEmail &&
      signupEmail !== "" &&
      signupPhone &&
      signupPhone !== "" &&
      signupCity &&
      signupCity !== "" &&
      signupPassword &&
      signupPassword !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const SuccessSignUpComponent = () => {
    return (
      <Paper
        elevation={4}
        className={classes.paper}
        style={{ textAlign: "center" }}
      >
        <Typography variant="h6" component="h6" color="primary">
          ¡Bienvenido {SuccessSignUp.newUserName}!
        </Typography>
        <Typography variant="body1" paragraph>
          Ya eres parte de Club Complex. Por favor revisa tu correo electrónico
          para verificar tu cuenta y poder ingresar a la plataforma.
        </Typography>
      </Paper>
    );
  };

  const signUpNewUser = (event) => {
    event.preventDefault();
    if (checkForm()) {
      setIsLoading(true);
      Auth.signUp(SignUpFormData)
        .then((result) => {
          const { success, userData } = result;
          setSuccessSignUp({ success, newUserName: userData.firstName });
        })
        .catch((err) => {
          if (err.response.data) {
            const { type, message } = err.response.data;
            setShowAlert({ state: true, type, message });
            setTimeout(() => {
              setShowAlert({ state: false, type, message });
            }, 5000);
          } else {
            setShowAlert({
              state: true,
              type: "error",
              message:
                "Ocurrió un error en el proceso. Por favor, inténtalo más tarde.",
            });
            setTimeout(() => {
              setShowAlert({
                state: false,
                type: "error",
                message:
                  "Ocurrió un error en el proceso. Por favor, inténtalo más tarde.",
              });
            }, 5000);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setShowAlert({
        state: true,
        type: "warning",
        message: "Por favor llene todos los campos para poder registrarse.",
      });
      setTimeout(() => {
        setShowAlert({
          state: false,
          type: "warning",
          message: "Por favor llene todos los campos para poder registrarse.",
        });
      }, 5000);
    }
  };

  return (
    <>
      {SuccessSignUp.success && <SuccessSignUpComponent />}
      {!SuccessSignUp.success && (
        <Paper elevation={4} className={classes.paper}>
          <Typography variant="h6" component="h6">
            <Box fontWeight="fontWeightBold">REGÍSTRATE</Box>
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
                    helperText={
                      FormError.signupFirstName
                        ? "Debes de ingresar tú nombre."
                        : ""
                    }
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
                    error={FormError.signupLastName}
                    helperText={
                      FormError.signupLastName
                        ? "Debes de ingresar tú apellido."
                        : ""
                    }
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
                  helperText={
                    FormError.signupEmail
                      ? "Debes de ingresar tú correo electrónico."
                      : ""
                  }
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
                  helperText={
                    FormError.signupPhone
                      ? "Debes de tú número de teléfono."
                      : ""
                  }
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
                  helperText={
                    FormError.signupCity ? "Por favor ingresa tú ciudad." : ""
                  }
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
                  helperText={
                    FormError.signupPassword.validation
                      ? FormError.signupPassword.messageError
                      : ""
                  }
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
              <Typography
                variant="body2"
                paragraph
                className={classes.privacyText}
              >
                Al continuar reconoces haber leído las políticas de privacidad
                de Club Complex y aceptas sus condiciones de uso, de igual
                manera aceptas que sus representantes puedan contactarte por
                e-mail, teléfono, WhatsApp o cualquier medio de contacto
                suministrado.
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
                {isLoading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
              <Collapse in={ShowAlert.state}>
                <Alert severity={ShowAlert.type}>{ShowAlert.message}</Alert>
              </Collapse>
            </form>
          </Grid>
        </Paper>
      )}
    </>
  );
}
