import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  // 로그인하면 홈으로 돌아가도록 경로 설정
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const pwdInputRef = useRef();

  const authCtx = useContext(AuthContext); // AuthContext로 접근 가능하게 함

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // 로딩상태가되면 isLoading이 true가 되도록 설정

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPwd = pwdInputRef.current.value;

    // Validation
    setIsLoading(true); // submit하면 우선 loading이 되도록 true
    let url;
    if (isLogin) {
      // signIn URL 가져오기
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
      .then((response) => {
        setIsLoading(false); // 로그인 되든 안되든 response를 받았으니까 로딩을 멈춘다.
        if (response.ok) {
          return response.json();
        } else {
          // error
          return response.json().then((data) => {
            let errorMsg = "Authentication failed";
            // if (data && data.error && data.error.message) {
            //   //   // 이 모든게 참이면
            //   errorMsg = data.error.message;
            //   // errorMsg에 좀 더 specific 메세지를 설정하여 세부적인 메세지를 alert에 띄울 수 있다.

            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        // 회원가입이나 로그인에 성공한다면 token이 생김. => context에서 login에 데이터의 idToken을 불러줌
        authCtx.login(data.idToken, expirationTime.toISOString());
        // redirect
        navigate("/", { replace: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={pwdInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
