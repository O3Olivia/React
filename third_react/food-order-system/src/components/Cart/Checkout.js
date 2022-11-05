import React, { useRef } from "react";

import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label httpFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>

      <div className={classes.control}>
        <div className={classes.street}>
          <label httpFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
        </div>
        <div className={classes.city}>
          <label httpFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
        </div>
      </div>

      <div className={classes.control}>
        <label httpFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
      </div>
      {/* Postal은 숫자지만 text로 처리해야 NULL값으로 처리되지 않고 0으로 시작할 수 있다. */}

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
