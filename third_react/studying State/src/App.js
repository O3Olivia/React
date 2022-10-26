import React, { useState, useCallback } from "react";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";

import "./App.css";

function App() {
  const [showPara, setShowPara] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log("APP RUNNING");

  const toggleParaHandler = useCallback(() => {
    if (allowToggle) {
      setShowPara((prevShowPara) => !prevShowPara);
    }
  }, [allowToggle]);

  const allowToggleHandler = () => {
    setAllowToggle((prevAllowToggle) => !prevAllowToggle);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showPara} />
      {/* show={false}해도 Demo console은 똑같이 찍힌다. -> App[부모 component]가 계속 재실행되기 때문에 Demo [자식 component]가 false여도 상관없이 계속 재실행되기 때문. => 결국, demo의 props는 상관없음. */}
      {/* 이 방법은 불필요한 재평가(re-evaluated)가 실행되기 때문에 이를 막기위해 react.memo()를 사용한다. */}
      {/* false는 boolean이기 때문에 React.memo를 사용하여 재실행되지 않도록 할 수 있었다. (원시값 -> 비교가능 true === true -> true, false === false -> true */}
      <Button onClick={allowToggleHandler}>Allow Toggling</Button>
      <Button onClick={toggleParaHandler}>Show Paragraph</Button>
      {/* Button은 매번 재평가되지 않기 때문에 [같은 함수, 같은 text를 사용하기 때문] react.memo로 Mapping해줘도 된다.*/}
      {/* 그러나 계속 Button을 누를때마다 console에 출력된다. => App이 함수이기때문에 실행될 때마다 이 함수가 재사용되지 않고 계속해서 새로 만들어진다. 따라서 toggleParaHandler함수도 계속해서 새로 만들어진다. 그렇기때문에 */}
      {/* 배열, 객체, 함수를 비교할 경우, 사람의 눈에서는 같아보이지만 Js는 다르다. Js는 해당 함수가 하나의 객체에 불과하기 때문에 App이 실행될때마다 js는 props.onClick === props.previous.onClick 으로 비교하기 때문에 같은 내용을 같다고하더라도 Js는 다르다고 생각한다. 따라서 값이 변경된다고 인식되어 console창에 뜬다. */}
    </div>
  );
}

export default App;
