import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import classes from "./Login.module.css";
import AuthContext from "../../store/auth-context";

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 7,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 7 };
  }
  return { value: "", isValid: false };
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const ctx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  // useEffect를 더욱 최적화하고 Effect가 불필요하게 실행되는 것을 피하게 하기 위해 설정.
  // 설정하기 전에는 아래 identifier가 계속 실행되었는데 비밀번호 validation이 끝나고나면 추가적으로 실행되지 않아서 좋다. => destructuring

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking from validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (e) => {
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });

    // setFormIsValid(e.target.value.includes("@") && passwordState.isValid);
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 7);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: "USER_INPUT", val: e.target.value });

    // setFormIsValid(emailState.isValid && e.target.value.trim().length > 7);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formIsValid) {
      ctx.onLogIn(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      // 유효하지 않다면, email input에 focus 하려고 함
      emailInputRef.current.focus();
      // focus-> input.js에서 useImperativeHandle를 통해 설정한 외부 이름
    } else {
      // email은 유효하지만, pwd가 유효하지 않은 경우
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
