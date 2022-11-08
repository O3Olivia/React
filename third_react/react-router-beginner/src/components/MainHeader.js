import { NavLink, Link } from "react-router-dom";

import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/welcome">
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/products">
              Products
            </NavLink>
          </li>
          {/* link와 navLink의 차이: a태그가 active 되는지 안되는지 여부. navLink는 active가 되어서 현재 그 페이지에 들어와있다는 css 설정 가능하게 해준다(:active기능) */}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
