import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);

    if (enteredName.trim() === "") {
      return; // 아래 실행되지 않도록
    }
  };

  const formSubHandler = (e) => {
    e.preventDefault();

    console.log(enteredName);

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    setEnteredName("");
  };

  return (
    <form onSubmit={formSubHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
