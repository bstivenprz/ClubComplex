import React, { useContext } from "react";

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

export default function Titles(props) {
  const { onClose, open } = props;
  const { user } = useContext(ContextClient);
  return (
    <Dialog
      onClose={() => onClose("titles")}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xs"
      fullWidth
    >
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
          {user &&
            user.titles.map((title, key) => {
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
        <Button onClick={() => onClose("titles")} color="default">
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
