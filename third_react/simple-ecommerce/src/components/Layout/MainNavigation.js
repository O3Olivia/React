import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo2.png";
import classes from "./MainNavigation.module.css";

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
    </Fragment>
  );
};

export default MainNavigation;
