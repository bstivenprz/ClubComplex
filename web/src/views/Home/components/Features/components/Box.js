import React from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

/** Styles */
const useStyle = makeStyles((theme) => ({
  paper: {
    position: "relative",
    top: "-80px",
    height: 220,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  sideLine: {
    borderLeft: "6px solid #00ACED",
    marginRight: "8px",
    marginTop: "5px",
    height: "20px",
  },
  title: {
    textTransform: "uppercase",
    marginBottom: theme.spacing(1),
  },
}));

export default function FeaturesBox({ data }) {
  const classes = useStyle();
  return (
    <Grid container>
      {data.map(({ title, content }, key) => {
        return (
          <Grid item xs={12} sm={12} md={4} lg={4} key={key}>
            <Paper elevation={2} className={classes.paper}>
              <Box display="flex" flexDirection="row">
                <div className={classes.sideLine}></div>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.title}
                >
                  {title}
                </Typography>
              </Box>
              <Typography variant="body1">{content}</Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
