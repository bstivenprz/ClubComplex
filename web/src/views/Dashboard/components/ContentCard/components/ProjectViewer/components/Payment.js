import React from "react";

/** Material UI */
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Hidden from '@material-ui/core/Hidden';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Alert from "@material-ui/lab/Alert";

export default function ConfirmPayment(props) {
  const { onClose, open, totalValue } = props;
  return (
    <Dialog
      onClose={() => onClose("payment")}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={() => onClose("payment")}
      >
        Compra confirmada
      </DialogTitle>
      <DialogContent>
        <Alert severity="success">
          ¡Compra confirmada!
        </Alert>
        <Typography variant="body1" style={{ margin: "20px 0" }}>
          Un agente Complex lo contactará.
        </Typography>
        <Typography variant="body1">
          <strong>Información de pago</strong>
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Bancolombia (Ahorros)"
              secondary="272-000310-46"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              <strong>Valor a transferir</strong>
            </ListItemText>
            <Hidden smDown>
              <ListItemSecondaryAction>
                <strong>{totalValue}</strong>
              </ListItemSecondaryAction>
            </Hidden>
          </ListItem>
          <Hidden smUp>
            <ListItem>
              <ListItemText>
                <strong>{totalValue}</strong>
              </ListItemText>
            </ListItem>
          </Hidden>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose("payment")} color="default">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
