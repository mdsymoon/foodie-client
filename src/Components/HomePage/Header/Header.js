import React from "react";
import "./Header.css";
import Navigation from "./../Navigation/Navigation";

const Header = () => {
  return (
    <div className="header-banner">
      <Navigation></Navigation>
      <div className=" text-center pt-5 mt-5">
        <h1 className="banner-title">QUALITY F<span className="target-text">OO</span>DS</h1>
        <p className="banner-text">HEALTHY FOOD FOR HEALTHY BODY</p>
      </div>
    </div>
  );
};

export default Header;
