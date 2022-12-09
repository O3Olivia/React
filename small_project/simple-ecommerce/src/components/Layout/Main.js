import { Link } from "react-router-dom";

import classes from "./Main.module.css";
import { RxDoubleArrowDown } from "react-icons/rx";

const Main = () => {
  return (
    <section className={classes.intro}>
      <video id="vid" autoPlay="autoplay" loop="loop" muted="muted">
        <source src={require("../../assets/intro.mp4")} type="video/ogg" />
      </video>
      <div className={classes.title}>
        <h1>SK SS 23 / STUDIO COLLECTION</h1>
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
  );
};

export default Main;
