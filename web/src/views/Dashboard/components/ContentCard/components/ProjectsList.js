import React from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

/** Material UI Icons */
import TransformIcon from "@material-ui/icons/Transform";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

/** Media Files */
import PayPalLogo from "../../../../../resources/images/paypal-logo.jpg";

/** Styles */
const useStyles = makeStyles((theme) => ({
  listTitle: {
    margin: theme.spacing(2),
  },
}));

export default function ProjectList(props) {
  const classes = useStyles();
  const { projects, selectProject } = props;
  return (
    <div>
      <Typography variant="body1" className={classes.listTitle}>
        <strong>Lista de proyectos ({projects.length})</strong>
      </Typography>
      <List dense>
        {projects.length === 0 && (
          <ListItem divider>
            <ListItemText primary="No hay proyectos" />
          </ListItem>
        )}
        {projects.map((project, key) => {
          const { projectId, projectName, projectAddress } = project;
          return (
            <ListItem
              button
              divider
              key={key}
              onClick={() => {
                selectProject(projectId);
              }}
            >
              <ListItemText primary={projectName} secondary={projectAddress} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <ArrowForwardIosIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <Typography variant="body1" className={classes.listTitle}>
        <strong>Medios de pago</strong>
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "#F5F5F5" }}>
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
  );
}
