import React, { Fragment, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LogContext from "../../store/log-context";
import LoadingSpin from "../Layout/LoadingSpin";

import classes from "./Login.module.css";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

const Login = (props) => {
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const pwdInputRef = useRef();

  const LogCtx = useContext(LogContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPwd, setShowPwd] = useState({
    type: "password",
    visible: false,
  });

  const switchLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const showPwdHandler = (e) => {
    e.preventDefault();
    setShowPwd(() => {
      if (!showPwd.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPwd = pwdInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4bpMeHWiBx73UGNr9rw0xi0iysGp5feo";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4bpMeHWiBx73UGNr9rw0xi0iysGp5feo";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPwd,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "";
            if (data && data.error && data.error.message) {
              errorMsg = data.error.message;
            }
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        LogCtx.login(data.idToken, expirationTime.toISOString());

        navigate("/", { replace: true });
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };
  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpin />
      ) : (
        <form className={classes.loginForm} onSubmit={submitHandler}>
          <h1>{isLogin ? "로그인" : "회원가입"}</h1>
          {isLogin ? (
            ""
          ) : (
            <input id="name" type="text" placeholder="name" required />
          )}
          <input
            id="email"
            type="email"
            placeholder="email"
            required
            ref={emailInputRef}
          />
          <div className={classes.passwordInput}>
            <input
              id="pwd"
              placeholder="password"
              required
              type={showPwd.type}
              ref={pwdInputRef}
            />
            <button className={classes.pwdShow} onClick={showPwdHandler}>
              {!showPwd.visible ? <RiEyeCloseLine /> : <RiEyeLine />}
            </button>
          </div>

          <div className={classes.actions}>
            <button type="submit" className={classes.loginBtn}>
              {isLogin ? "로그인" : "회원가입"}
            </button>
          </div>
          <div className={classes.signUp}>
            <span>
              {!isLogin
                ? "어머! 이미 SK의 회원이신가요?"
                : "잠깐! 혹시 SK가 처음이신가요?"}
            </span>
            <span className={classes.pullRight}>
              <button onClick={switchLoginHandler}>
                {!isLogin ? "로그인" : "회원가입"}
              </button>
            </span>
          </div>
        </form>
      )}
    </Fragment>
  );
};
export default Login;
