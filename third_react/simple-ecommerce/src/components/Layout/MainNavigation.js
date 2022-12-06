import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo2.png";
import classes from "./MainNavigation.module.css";
import { RxDoubleArrowDown } from "react-icons/rx";

const MainNavigation = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <Link to="/">
          <div className={classes.logo}>
            <img alt="Logo" src={logo} />
          </div>
        </Link>
        <nav className={classes.menu}>
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/changePwd">change Password</Link>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <section className={classes.intro}>
        <video id="vid" autoPlay="autoplay" loop="loop" muted="muted">
          <source src={require("../../assets/intro.mp4")} type="video/ogg" />
        </video>
        <div className={classes.title}>
          <h1>SK SS23 / STUDIO COLLECTION</h1>
          <h2>
            IT IS A COLLECTION OF "NEW CLASSIC" <br />
            THAT INCORPORATE TIMELESS SILHOUETTES <br />
            AND REINTERPRETED KEY PIECES
          </h2>
          <h2 className={classes.arrowDown}>
            <Link to="/products">
              <RxDoubleArrowDown />
            </Link>
          </h2>
        </div>
      </section>
    </Fragment>
  );
};

export default MainNavigation;
