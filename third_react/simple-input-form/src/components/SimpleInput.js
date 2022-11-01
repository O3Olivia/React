import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false;

  const enteredEmailIsValid = enteredEmail.trim().includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  if ((enteredNameIsValid, enteredEmailIsValid)) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const nameInputBlurHandler = (e) => {
    setEnteredNameTouched(true); // input값에서 focus 잃었다는 의미는 '이미 input 공간을 touched 했다는 의미'
  };

  const emailInputBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  };

  const formSubHandler = (e) => {
    e.preventDefault();
    setEnteredNameTouched(true); // form이 제출되는 순간 모든 입력값이 사용자가 확인했다고 생각하기 때문에 true
    if (!enteredNameIsValid) {
      return;
    }
    setEnteredName("");
    setEnteredNameTouched(false); // form이 sub되면 input창 선택 안한 상태로 돌아감 (초기화)

    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control  invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control  invalid"
    : "form-control";
  return (
    <form onSubmit={formSubHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
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

      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler} // input이 focus를 안될때마다 실행함
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Please Enter a Valid Email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
