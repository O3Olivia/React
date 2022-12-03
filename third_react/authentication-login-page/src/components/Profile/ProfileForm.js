import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPwdInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredNewPwd = newPwdInputRef.current.value;

    // can add Validation

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA4bpMeHWiBx73UGNr9rw0xi0iysGp5feo",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPwd,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer abc",
        },
      }
    ).then((res) => {
      alert("successfully change your password!");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="6"
          ref={newPwdInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
