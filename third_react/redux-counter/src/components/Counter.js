import { useSelector, useDispatch } from "react-redux";

import { counterActions } from "../store/counter";

import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter); // fn을 주면, react-redux가 redux의 state를 보낸다. fn가 어떤 데이터를 store에서 추출할지 결정. =>  redux가 관리하는 가장 최신의 counter를 받을 수 있다.

  const show = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };
  const increaseHandler = () => {
    dispatch(counterActions.increase(5)); //index의 속성과 정확하게 같은 이름이여야한다. store에서 action.value에서 value대신 amount나 다른 속성이름으로 설정한다면, value가 아닌 amount나 설정한 이름으로 저장해야한다. 그렇지않으면 NaN이 뜸.
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter);
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>+</button>
        <button onClick={increaseHandler}>+5</button>
        <button onClick={decrementHandler}>-</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
