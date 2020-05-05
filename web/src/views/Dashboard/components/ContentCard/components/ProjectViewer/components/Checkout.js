import React from "react";

/** Material UI */
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

export default function Checkout(props) {
  const {
    onClose,
    open,
    submitShop,
    totalValue,
    quantity,
    titleName,
    titleValue,
    titleId,
  } = props;
  return (
    <Dialog
      onClose={() => onClose("checkout")}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={() => onClose("checkout")}
      >
        Confirmar compra
      </DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemText
              primary={`${titleName} x ${quantity}`}
              secondary={titleId}
            />
            <ListItemSecondaryAction>{titleValue}</ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              <strong>Total</strong>
            </ListItemText>
            <ListItemSecondaryAction>
              <strong>{totalValue}</strong>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose("checkout")} color="default">
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={submitShop}>
          Comprar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
