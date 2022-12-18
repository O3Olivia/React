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
  // isLogin: 회원가입이 되어있냐 즉 회원이니 아니니를 알 수 있는 것. 아마 login보단 isSignup으로 바꾸면 더 좋을 것 같음
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
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4bpMeHWiBx73UGNr9rw0xi0iysGp5feo"; // 회원가입이 되어있으면 로그인으로 가는 Url
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4bpMeHWiBx73UGNr9rw0xi0iysGp5feo"; // 회원가입이 안되어있으면 회원가입으로 가는 url
    }
    fetch(url, {
      // fetch(url, options)
      method: "POST",
      body: JSON.stringify({
        //  stringify() 자바스크립트의 값을 JSON 문자열로 변환 { 여기 안에 있는 값들을 }
        email: enteredEmail,
        password: enteredPwd,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }) // url을 패치하고나면 promise 1 반환.
      .then((res) => {
        // 반환된 promise1로 .then()
        setIsLoading(false);
        if (res.ok) {
          return res.json(); // promise 2 반환
        } else {
          return res.json().then((data) => {
            let errorMsg = "";
            if (data && data.error && data.error.message) {
              errorMsg = data.error.message;
            }
            throw new Error(errorMsg);
          }); // !res.ok않으면, errorMsg반환
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000 // data.expiresIn이 string 형태라서 +를 붙여 number로 전환
          // 1000을 곱하는 이유는 1시간동안 token을 유지되게 해야하기 때문에 expirationTime을 현재 로그인한 시간에서 +1hr하려고.
        );
        LogCtx.login(data.idToken, expirationTime.toISOString());
        // toISOString()는 Date를 yyyy-mm-ddThh:mm:ss 형식의 문자열로 변환
        navigate("/", { replace: true }); // 로그인 or 회원가입 끝나면 원래 main 페이지로 이동

        localStorage.setItem("email", data.email);
        if (data.email === "admin@admin.com") {
          navigate("/admin", { replace: true });
        }
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
