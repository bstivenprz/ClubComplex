import React, { useContext } from "react";
import moment from "moment";

/** Material UI */
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

/** Services */
import ContextClient from "../../../../../helpers/ContextClient";

export default function History(props) {
  const { onClose, open } = props;
  const { user } = useContext(ContextClient);
  return (
    <Dialog
      onClose={() => onClose("history")}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xs"
      fullWidth
    >
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
          {user &&
            user.transactions.map((transaction, key) => {
              const { transactionValue, transactionDate } = transaction;
              return (
                <ListItem key={key}>
                  <ListItemText
                    primary="Compra de título"
                    secondary={moment(transactionDate).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  />
                  <ListItemSecondaryAction>
                    {"$ " +
                      Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "COP",
                      }).format(transactionValue)}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose("history")} color="default">
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
