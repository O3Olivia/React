import React, { useState } from "react";

import classes from "./Login.module.css";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
const Login = (props) => {
  const [showPwd, setShowPwd] = useState({
    type: "password",
    visible: false,
  });
  const showPwdHandler = (e) => {
    e.preventDefault();
    setShowPwd(() => {
      if (!showPwd.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  return (
    <>
      <form className={classes.loginForm}>
        <h1>로그인</h1>
        <input id="email" type="email" placeholder="email" required />
        <input id="pwd" placeholder="password" required type={showPwd.type} />
        <div className={classes.pwdShow}>
          <button onClick={showPwdHandler}>
            {!showPwd.visible ? <RiEyeCloseLine /> : <RiEyeLine />}
          </button>
        </div>

        <div className={classes.actions}>
          <button type="submit" className={classes.loginBtn}>
            로그인
          </button>
        </div>
        <div className={classes.signUp}>
          <span>잠깐! 혹시 projectName이 처음이신가요?</span>
          <span className={classes.pullRight}>
            <a href="#">회원가입등록</a>
          </span>
        </div>
      </form>
    </>
  );
};
export default Login;
