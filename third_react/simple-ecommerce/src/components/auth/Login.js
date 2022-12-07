import React, { useState } from "react";

import classes from "./Login.module.css";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
const Login = (props) => {
  const [isLogin, setIsLogin] = useState(true);
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

  return (
    <>
      <form className={classes.loginForm}>
        <h1>{isLogin ? "로그인" : "회원가입"}</h1>
        {isLogin ? (
          ""
        ) : (
          <input id="name" type="text" placeholder="name" required />
        )}
        <input id="email" type="email" placeholder="email" required />
        <div className={classes.passwordInput}>
          <input id="pwd" placeholder="password" required type={showPwd.type} />
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
            {isLogin
              ? "어머! 이미 SK의 사랑스러운 회원이신가요?"
              : "잠깐! 혹시 projectName이 처음이신가요?"}
          </span>
          <span className={classes.pullRight}>
            <button onClick={switchLoginHandler}>
              {isLogin ? "로그인" : "회원가입"}
            </button>
          </span>
        </div>
      </form>
    </>
  );
};
export default Login;
