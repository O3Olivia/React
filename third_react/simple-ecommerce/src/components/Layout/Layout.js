import React, { Fragment } from "react";

import MainNavigation from "./MainNavigation";
import Main from "./Main";
const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
