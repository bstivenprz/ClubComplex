import React, { useState, useEffect } from "react";
import Axios from "axios";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

/** Components */
import Insight from "./components/Insight";

/** Media Files */
// import InsightsOne from "../../../../resources/images/clubcomplex-home-insights-1.png";
// import InsightsTwo from "../../../../resources/images/clubcomplex-home-insights-2.png";
// import InsightsThree from "../../../../resources/images/clubcomplex-home-insights-3.png";

/** Services */
import { API_ADMINISTRATION_INSIGHTS } from "../../../../helpers/apiUrls.helper";

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
  const [insightsDb, setInsightsDb] = useState([
    {
      name: "users",
      number: 0,
      caption: "",
    },
    {
      name: "investment",
      number: 0,
      caption: "",
    },
    {
      name: "gestion",
      number: 0,
      caption: "",
    },
  ]);

  useEffect(() => {
    getInsights();
  }, []);

  const getInsights = () => {
    Axios.get(API_ADMINISTRATION_INSIGHTS)
      .then((response) => {
        setInsightsDb(response.data.insights);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container fixed>
          <Grid
            container
            direction="row"
            justify="center"
            pacing={2}
            className={classes.content}
          >
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Insight
                number={insightsDb[0].number}
                caption="USUARIOS REGISTRADOS"
              />
              {/* <img src={InsightsOne} className={classes.contentImage} /> */}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Insight
                number={`$${insightsDb[1].number}`}
                caption="INVERSIÓN ACUMULADA"
              />
              {/* <img src={InsightsTwo} className={classes.contentImage} /> */}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Insight number={insightsDb[2].number} caption="M2 GESTIONADOS" />
              {/* <img src={InsightsThree} className={classes.contentImage} /> */}
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
