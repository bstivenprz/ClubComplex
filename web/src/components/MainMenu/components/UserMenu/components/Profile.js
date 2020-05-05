import React, { useState, useContext } from "react";
import Axios from "axios";

/** Material UI */
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Edit from "@material-ui/icons/Edit";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

/** Services */
import ContextClient from "../../../../../helpers/ContextClient";
import { API_USER_EDIT } from "../../../../../helpers/apiUrls.helper";

export default function Profile(props) {
  const { onClose, open } = props;
  const { user, updateContextUser } = useContext(ContextClient);
  const { _id, firstName, lastName, city, email, phone } = user;
  const [showAlert, setShowAlert] = useState({
    severity: "success",
    open: false,
    message: "",
  });
  const [editInputChange, setEditInputChange] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    city: true,
    password: true,
  });
  const [editInputValues, setEditInputValues] = useState({});

  const handleInputValues = (prop) => (event) => {
    setEditInputValues({ ...editInputValues, [prop]: event.target.value });
    [prop] = event.target.value;
  };

  const handleInputChange = (prop) => {
    setEditInputChange({ ...editInputChange, [prop]: false });
  };

  const sendUserProfileChange = () => {
    Axios.put(`${API_USER_EDIT}/${_id}`, editInputValues)
      .then((response) => {
        updateContextUser(response.data.user);
        setShowAlert({
          ...showAlert,
          open: true,
          message: "¡Usuario editado con exito!",
        });
      })
      .catch((error) => {
        console.log(error);
        setShowAlert({
          open: true,
          severity: "error",
          message: "Hubo un error al editar el usuario.",
        });
      })
      .finally((_) => {
        setTimeout(() => {
          setShowAlert({ ...showAlert, open: false });
        }, 3000);
      });
  };

  return (
    <Dialog
      onClose={() => onClose("profile")}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        Perfil
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel htmlFor="profile-first-name">Nombre</InputLabel>
              <Input
                id="profile-first-name"
                readOnly={editInputChange.firstName}
                onChange={handleInputValues("firstName")}
                defaultValue={firstName}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleInputChange("firstName")}>
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
                onChange={handleInputValues("lastName")}
                defaultValue={lastName}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleInputChange("lastName")}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl>
              <InputLabel htmlFor="profile-email">
                Correo electrónico
              </InputLabel>
              <Input
                id="profile-email"
                readOnly={editInputChange.email}
                onChange={handleInputValues("email")}
                defaultValue={email}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleInputChange("email")}>
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
                onChange={handleInputValues("phone")}
                defaultValue={phone}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleInputChange("phone")}>
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
                onChange={handleInputValues("city")}
                defaultValue={city}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleInputChange("city")}>
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
                onChange={handleInputValues("password")}
                type="password"
                defaultValue={"Contraseña"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleInputChange("password")}>
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
        <Button onClick={() => onClose("profile")} color="default">
          Salir
        </Button>
        <Button autoFocus onClick={sendUserProfileChange} color="primary">
          Guardar
        </Button>
      </DialogActions>
      <Snackbar open={showAlert.open} autoHideDuration={3000}>
        <Alert severity={showAlert.severity}>{showAlert.message}</Alert>
      </Snackbar>
    </Dialog>
  );
}
