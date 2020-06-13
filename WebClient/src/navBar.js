import React from "react";
import logo from "./img/money.jpg";
import hexagon from "./img/hexagon.png";

const NavBar = () => (
  <div>
    <header className="wrapper">
      <figure className="app-header">
        <img src={logo} alt="logo" className="nav-bar" />
        <figcaption className="nav-bar-text">
          Term Deposit Prognosticator
        </figcaption>
      </figure>
      <figure className="hexagon-wrapper last-item">
        <img src={hexagon} alt="logo" className="hexagon" />
      </figure>
    </header>
  </div>
);

export default NavBar;
