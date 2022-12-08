import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const LogContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate); // calculateRemainingTime이 토큰의 만료시간을 계산해주는 계산식이 담겨있음.
  // 따라서 여기계산식에다가 위 함수에서 expirationTime이 변수였는데 이 변수에다 storeExpirationDate값을 넣음.-> storage에 저장된 expirationTime 값 찾아 넣는 것임 => 이게 remainingTime이다.

  if (remainingTime <= 300000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  } // 만약 token의 expirationTime이 5분보다 더 많이 남아있담녀 사용할 수 있는 시간이 많이 남아있으니까 이 token 값과 duration: 남은 시간을 return해야한다.
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const LogContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  // tokenData가 있을 경우에만, 최초의토큰으로 설정
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const userIsLogged = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLogged,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <LogContext.Provider value={contextValue}>
      {props.children}
    </LogContext.Provider>
  );
};

export default LogContext;
