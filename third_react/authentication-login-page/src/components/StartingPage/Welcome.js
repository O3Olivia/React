import classes from "./Welcome.module.css";

const welcomePage = () => {
  return (
    <section className={classes.welcome}>
      <h1>Welcome on Board!</h1>
    </section>
  );
};

export default welcomePage;
