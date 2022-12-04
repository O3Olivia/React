import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "", // 초기값 -> consumer들
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); // current time
  const adjExpirationTime = new Date(expirationTime).getTime(); // future
  //

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  // 따로 login state를 만들 필요 없이 token이 있으면 로그인 상태, token이 없으면 로그인이 안되있는 상태로 알 수 있다.

  const userIsLoggedIn = !!token;
  // The !! then converts the result to a "boolean" from a number or convert truthy value to true and  falsy value to false.
  // if the token is string not empty it returns true, if the token string is empty it returns false.

  // token state 바꾸는 Handler
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);

    const remainingTime = calculateRemainingTime(expirationTime);

    setTimeout(logoutHandler, remainingTime);
  };

  // context 값
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  // context value를 provider의 value로 설정.
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
