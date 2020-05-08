import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";

/** Components */
import Slider from "../../../../../../components/image-slider";
import ProjectDetails from "./components/Details";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";

/** Resources */
import "./slider-style.css";

/** Media Files */
import ProjectImage from "../../../../../../resources/images/projectImage.jpg";

/** Services */
import { API_SHOP_CHECKOUT } from "../../../../../../helpers/apiUrls.helper";
import ContextClient from "../../../../../../helpers/ContextClient";

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

export default function ProjectViewer(props) {
  const classes = useStyles();
  const { project } = props;
  const { updateContextUser, user } = useContext(ContextClient);
  const [open, setOpen] = React.useState({
    checkout: false,
    payment: false,
  });
  const [Quantity, setQuantity] = useState(1);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (project) {
      setTotalValue(project.technicsSpecifications.titleValue);
    }
  }, [project]);

  const handlePaymentOpen = (prop) => {
    setOpen({ ...open, [prop]: true });
  };

  const handlePaymentClose = (prop) => {
    setOpen({ ...open, [prop]: false });
  };

  const submitShop = () => {
    Axios.post(API_SHOP_CHECKOUT, { userId: user._id, projectId: project._id, total: totalValue })
      .then(({ data }) => {
        updateContextUser(data.user);
        setOpen({ checkout: false, payment: true });
      })
      .catch((error) => {
        console.log(error);
      })
      .then((_) => {});
  };

  const handleQuantity = (val) => {
    let restValue = 1;
    switch (val) {
      case "rest":
        if (Quantity > 1) {
          restValue = Quantity - 1;
        }
        break;
      case "add":
        if (Quantity < project.technicsSpecifications.availablesTitles) {
          restValue = Quantity + 1;
        }
      default:
        break;
    }
    setQuantity(restValue);
    setTotalValue(project.technicsSpecifications.titleValue * restValue);
  };

  return (
    <div>
      {!project && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "40vh", backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <Grid item>
            <Typography variant="h4" style={{ color: "rgba(0, 0, 0, 0.1)" }}>
              Ningún proyecto seleccionado
            </Typography>
          </Grid>
        </Grid>
      )}
      {project && (
        <Grid
          container
          spacing={0}
          direction="row"
          style={{ minHeight: "40vh" }}
        >
          <Grid item xs={8} className={classes.contentDescription}>
            <Typography variant="h6">{project && project.title}</Typography>
            <Typography
              variant="body2"
              style={{ color: "rgba(0, 0, 0, 0.4)" }}
              gutterBottom
            >
              <strong>Proyecto # {project && project._id}</strong>
            </Typography>
            <Typography variant="body1">
              {project && project.address}
            </Typography>
            <div className="ExampleSliders">
              <Slider loop={true} showNav={true}>
                <img src={ProjectImage} style={{ width: "583.98px" }} />
                <img src={ProjectImage} style={{ width: "583.98px" }} />
              </Slider>
            </div>
            <Typography variant="body1">
              <strong>Descripcion</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              {project && project.description}
            </Typography>
            <Divider />
            <div className={classes.getTitles}>
              <Typography variant="body1" gutterBottom>
                <strong>Comprar títulos</strong>
              </Typography>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={4} sm={4} md={4}>
                  <Typography variant="caption" style={{ color: 'rgba(0, 0, 0, 0.4)' }} ><strong>Cantidad de títulos</strong></Typography>
                  <Grid
                    container
                    alignItems="center"
                    className={classes.selectQuantity}
                  >
                    <IconButton onClick={() => handleQuantity("rest")}>
                      <ExposureNeg1Icon />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    {/* <Typography variant="body1" style={{ margin: 12 }}>
                      <strong>{Quantity}</strong>
                    </Typography>
                    <Divider orientation="vertical" flexItem /> */}
                    <IconButton onClick={() => handleQuantity("add")}>
                      <ExposurePlus1Icon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Typography
                    variant="subtitle2"
                    style={{ color: "rgba(0, 0, 0, 0.3)" }}
                  >
                    Total
                  </Typography>
                  <Typography variant="body1">
                    <strong>
                      ${" "}
                      {Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "COP",
                      }).format(totalValue)}
                    </strong>
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <div className={classes.wrapper}>
                    <Button
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={() => handlePaymentOpen("checkout")}
                      fullWidth
                    >
                      Comprar títulos
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <ProjectDetails project={project} />
          <Checkout
            onClose={handlePaymentClose}
            open={open.checkout}
            submitShop={submitShop}
            totalValue={
              "$ " +
              Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "COP",
              }).format(totalValue)
            }
            quantity={Quantity}
            titleName={project.title}
            titleValue={
              "$ " +
              Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "COP",
              }).format(project.technicsSpecifications.titleValue)
            }
            titleId={project._id}
          />
          <Payment
            onClose={handlePaymentClose}
            open={open.payment}
            totalValue={
              "$ " +
              Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "COP",
              }).format(totalValue)
            }
          />
        </Grid>
      )}
    </div>
  );
}
