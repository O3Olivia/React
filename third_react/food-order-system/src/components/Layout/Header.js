import React, { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsHomeImg from "../../assets/meals.jpg";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>LET's EAT</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        {/* css 클래스에 -가 있으면 ['']로 표기 */}
        <img src={mealsHomeImg} alt="A table full of delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
