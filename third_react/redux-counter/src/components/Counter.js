import { useSelector } from "react-redux";
import classes from "./Counter.module.css";

const Counter = () => {
  const counter = useSelector((state) => state.counter); // fn을 주면, react-redux가 redux의 state를 보낸다. fn가 어떤 데이터를 store에서 추출할지 결정. =>  redux가 관리하는 가장 최신의 counter를 받을 수 있다.
  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
