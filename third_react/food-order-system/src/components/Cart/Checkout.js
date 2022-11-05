import React from "react";

import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const confirmHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label httpFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>

      <div className={classes.control}>
        <label httpFor="street">Street</label>
        <input type="text" id="street" />
      </div>

      <div className={classes.control}>
        <label httpFor="postal">Postal Code</label>
        <input type="text" id="postal" />
      </div>
      {/* Postal은 숫자지만 text로 처리해야 NULL값으로 처리되지 않고 0으로 시작할 수 있다. */}

      <div className={classes.control}>
        <label httpFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      <button>Confirm</button>
    </form>
  );
};

export default Checkout;
