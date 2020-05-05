import React from "react";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

/** Media Files */
import InsightsOne from "../../../../resources/images/clubcomplex-home-insights-1.png";
import InsightsTwo from "../../../../resources/images/clubcomplex-home-insights-2.png";
import InsightsThree from "../../../../resources/images/clubcomplex-home-insights-3.png";

/** Styles */
const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FAFAFA",
  },
  content: {
    padding: theme.spacing(12, 0),
  },
  contentImage: {
    height: "230px",
    display: "block",
    margin: "12px auto",
  },
}));

export default function Insights() {
  const classes = useStyle();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container fixed>
          <Grid
            container
            direction="row"
            pacing={2}
            className={classes.content}
          >
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <img src={InsightsOne} className={classes.contentImage} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <img src={InsightsTwo} className={classes.contentImage} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <img src={InsightsThree} className={classes.contentImage} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
