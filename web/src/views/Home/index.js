import React from "react";

/** Material UI */
import CssBaseline from "@material-ui/core/CssBaseline";

/** Components */
import LandingPage from "./components/LandingPage";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Insights from "./components/Insights";
import Footer from "../../components/Footer/index.js";

export default function Home() {
  return (
    <div>
      <CssBaseline />
      <LandingPage />
      <Features />
      <HowItWorks />
      <Insights />
      <Footer />
    </div>
  );
}
