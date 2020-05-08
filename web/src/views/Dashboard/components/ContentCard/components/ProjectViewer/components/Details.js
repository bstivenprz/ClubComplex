import React from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

/** Styles */
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentDescription: {
    padding: theme.spacing(2),
  },
  contentDetails: {
    padding: theme.spacing(2),
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
  },
  detailsList: {
    "&.MuiListItemText-root": {
      marginTop: 0,
      marginBottom: 0,
    },
    "& div": {
      "&.MuiListItemSecondaryAction-root": {
        color: "rgba(0, 0, 0, 0.4)",
      },
    },
  },
  getTitles: {
    margin: theme.spacing(2, 1),
  },
  formControl: {
    minWidth: 120,
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
  selectQuantity: {
    width: "fit-content",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    "& hr": {
      margin: theme.spacing(0, 0.5),
    },
  },
}));

export default function ProjectDetails(props) {
  const classes = useStyles();
  const { project } = props;
  return (
    <Grid item xs={4} className={classes.contentDetails}>
      <Typography variant="body1">
        <strong>Especificaciones técnicas</strong>
      </Typography>
      <List dense className={classes.detailsList}>
        {project.technicsSpecifications.purpose && (
          <ListItem>
            <ListItemText>Destino</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.purpose}
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.builtArea && (
          <ListItem>
            <ListItemText>Área construida</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.builtArea} m2
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {String(project.technicsSpecifications.profitableArea).length > 0 && (
          <ListItem>
            <ListItemText>Área rentable</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.profitableArea} m2
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.salableArea && (
          <ListItem>
            <ListItemText>Área vendible</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.salableArea} m2
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.estimatedInvestment && (
          <ListItem>
            <ListItemText>Inversión</ListItemText>
            <ListItemSecondaryAction>
              {project &&
                "$ " +
                  Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "COP",
                  }).format(project.technicsSpecifications.estimatedInvestment)}
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.estimatedProfit && (
          <ListItem>
            <ListItemText>Utilidad estimada</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.estimatedProfit + ' %'}
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.costEffectiveness && (
          <ListItem>
            <ListItemText>Rentabilidad</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.costEffectiveness} %
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.tir && (
          <ListItem>
            <ListItemText>TIR</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.tir} %
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.marketRatio && (
          <ListItem>
            <ListItemText>Coeficiente del mercado</ListItemText>
            <ListItemSecondaryAction>
              {project &&
                Math.round(project.technicsSpecifications.marketRatio * 100) /
                  100}
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.complexRatio && (
          <ListItem>
            <ListItemText>Coeficiente Complex</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.complexRatio} %
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.complexIndex && (
          <ListItem>
            <ListItemText>Índice Complex</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.complexIndex} %
            </ListItemSecondaryAction>
          </ListItem>
        )}
        <Divider variant="middle" />
        {project.technicsSpecifications.titles && (
          <ListItem>
            <ListItemText>Títulos</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.titles}
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.availablesTitles && (
          <ListItem>
            <ListItemText>Títulos disponibles</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.availablesTitles}
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.titleValue && (
          <ListItem>
            <ListItemText>Valor del título</ListItemText>
            <ListItemSecondaryAction>
              {project &&
                "$ " +
                  Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "COP",
                  }).format(project.technicsSpecifications.titleValue)}
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {project.technicsSpecifications.titleIncome && (
          <ListItem>
            <ListItemText>Renta del título</ListItemText>
            <ListItemSecondaryAction>
              {project && project.technicsSpecifications.titleIncome}
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </Grid>
  );
}
