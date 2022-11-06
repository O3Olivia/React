import { createStore } from "redux";

const initialState = { counter: 0, showCounter: true };
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
    // state.counter++; return state -> 이렇게 하면 절대 안된다. redux를 사용할땐 state를 직접적으로 변경시킬 수 없다.
    // 대신, 새로운 state 객체를 return하여 재정의 시켜야한다.
    // 그렇기 때문에 return {counter:} 형식으로 사용해야한다.
  }
  if (action.type === "increase") {
    return {
      counter: state.counter + action.value,
      showCounter: state.showCounter,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }
  if (action.type === "toggle") {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
