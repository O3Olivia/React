import React, { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogContext from "../../store/log-context";
import logo from "../../assets/logo2.png";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const navigate = useNavigate();
  const logCtx = useContext(LogContext);
  const isLoggedIn = logCtx.isLoggedIn;

  const logoutHandler = () => {
    alert("See you again👋");
    logCtx.logout();
    navigate("/", { replace: true });
  };
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
              <Link to="/board">Board</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/changePwd">change Password</Link>
              </li>
            )}
            {isLoggedIn ? (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default MainNavigation;
