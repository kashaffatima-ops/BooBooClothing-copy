import React from "react";
import Footer from "../components/Footer/Footer";
import "./Home.css";
import OverviewCards from "../components/OverviewCards/OverviewCards";
import OverviewGraph from "../components/OverviewGraph/OverviewGraph";

const Home = () => {
  return (
    <>
      <div className="home">
        <br />
        <br />
        <br />
        <h1 className="home-title">Order Overview</h1>
        <OverviewCards />
        <OverviewGraph />
      </div>
      <Footer />
    </>
  );
};

export default Home;
