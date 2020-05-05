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
    margin: theme.spacing(2),
    height: "300px",
    padding: theme.spacing(8, 2),
  },
  hugeNumber: {
    color: "#CCCFDB",
    position: "relative",
    bottom: "-80px",
    paddingLeft: 32,
  },
  title: {
    textTransform: "uppercase",
    marginBottom: theme.spacing(1),
  },
  sideLine: {
    borderLeft: "6px solid #00ACED",
    margin: "5px",
    height: "20px",
  },
}));

export default function HowItWorksCard({ data }) {
  const classes = useStyle();
  return data.map(({ number, title, content }, key) => {
    return (
      <Grid item xs={12} sm={12} md={4} lg={4} key={key}>
        <Typography variant="h1" component="h1" className={classes.hugeNumber}>
          <Box fontWeight="fontWeightBold">{number}</Box>
        </Typography>
        <Paper elevation={2} className={classes.paper}>
          <Box display="flex" flexDirection="row">
            <div className={classes.sideLine}></div>
            <Typography variant="h6" component="h6" className={classes.title}>
              {title}
            </Typography>
          </Box>
          <Typography variant="body1">{content}</Typography>
        </Paper>
      </Grid>
    );
  });
}
