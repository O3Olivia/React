const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  // state = { counter: 0 } default 값
  return {
    counter: state.counter + 1,
  };
}; // reducer function

const store = redux.createStore(counterReducer); // store는 데이터를 조작하는 reducer 함수가 뭔지 알아야하기 때문에 (counterReducer)이라고 알려준다.

const counterSubscriber = () => {
  const latestState = store.getState(); // getState는 createStore()로 생성된 store에서 사용할 수 있는 메소드. => 업데이트 된 이후 가장 최신의 state snapshot을 제공한다. => state가 변경될 때마다 trigger되어 받을 수 있다.
  console.log(latestState);
};

store.subscribe(counterSubscriber); // subscribe 메소드를 호출. counterSubscriber함수를 받는 메소드.

store.dispatch({ type: "increment" }); // dispatch는 액션을 발송하는 메소드
