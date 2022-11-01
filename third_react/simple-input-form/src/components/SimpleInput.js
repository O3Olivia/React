import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("Name Input is Valid");
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const nameInputBlurHandler = (e) => {
    setEnteredNameTouched(true); // input값에서 focus 잃었다는 의미는 '이미 input 공간을 touched 했다는 의미'

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return; // 아래 실행되지 않도록 함
    }
  };

  const formSubHandler = (e) => {
    e.preventDefault();

    setEnteredNameTouched(true); // form이 제출되는 순간 모든 입력값이 사용자가 확인했다고 생각하기 때문에 true
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return; // 아래 실행되지 않도록 함
    }

    setEnteredNameIsValid(true);
    console.log(enteredName);

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    setEnteredName("");
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInvalid
    ? "form-control  invalid"
    : "form-control";

  return (
    <form onSubmit={formSubHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler} // input이 focus를 안될때마다 실행함
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
