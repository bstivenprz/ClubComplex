import React from "react";

/** Material UI */
import CssBaseline from "@material-ui/core/CssBaseline";

/** Components */
import MainMenu from "../../components/MainMenu";
import Header from "./components/Header";
import ContentCard from "./components/ContentCard";
import Footer from "../../components/Footer";

export default function Dashboard() {
  return (
    <div>
      <CssBaseline />
      <MainMenu />
      <Header />
      <ContentCard />
      <Footer />
    </div>
  );
}
