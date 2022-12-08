import React, { useState, useEffect, useCallback } from "react";

let logoutTimer; // 이 파일에서 글로벌 변수.

const AuthContext = React.createContext({
  token: "", // 초기값 -> consumer들
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// expirationTime: 토큰의 만료시간 계산
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); // current time
  const adjExpirationTime = new Date(expirationTime).getTime(); // 만료시간
  const remainingDuration = adjExpirationTime - currentTime; // 남은시간

  return remainingDuration;
};

// 사용자가 로그인하면 localStorage에서 token을 받고 토큰에 시간이 남아있다면, 그걸 최초의 token으로 사용한다. ex) 만약 사용자가 3시간 전에 로그인했다면, 그 토큰은 저장되어있을 텐데 1시간이 최대 시간이니까 그 토큰은 더 이상 쓸모가 없다.  => 그래서 로컬 저장소를 살펴보고 토큰을 받은 뒤 토큰이 유효할 때만 계속 쓰고 더 이상 유효하지 않을 때는 그 토큰을 삭제시킨다.
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token"); // localStorage에서 token을 받은 뒤
  const storedExpirationDate = localStorage.getItem("expirationTime"); // localStorage에 있는 expirationTime<만료시간>을 받아 저장한다.
  const remainingTime = calculateRemainingTime(storedExpirationDate); // storedExpirationDate를 caculatedRemainingTime으로 보내서 (expirationTime로 보내짐) 그 시간이 remainingTime이 됨

  if (remainingTime <= 60000) {
    localStorage.removeItem("token"); //  해당 토큰을 삭제해야한다.
    localStorage.removeItem("expirationTime"); // 만료시간도 삭제.
    return null; // token을 더 이상 쓸 수 없어서 null 반환
  }
  // 확인했는데 남은 시간이 있을 경우 storedToken(저장된 토큰)과 남은 시간을 리턴해야한다.
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    // tokenData가 있을 경우에만, 최초의토큰으로 설정하고
    initialToken = tokenData.token; // 위에 보면 token: storedToken으로 객체라서 이걸 불러와줘야함
  }
  // 그게 아니라면 null을 반환한다.
  const [token, setToken] = useState(initialToken);
  // 따로 login state를 만들 필요 없이 token이 있으면 로그인 상태, token이 없으면 로그인이 안되있는 상태로 알 수 있다.

  const userIsLoggedIn = !!token;
  // The !! then converts the result to a "boolean" from a number or convert truthy value to true and  falsy value to false.
  // if the token is string not empty it returns true, if the token string is empty it returns false.

  // token state 바꾸는 Handler
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    // logoutHandler가 실행되면, 로그아웃 타이머가 설정되있는지 확인한다.  => 그렇게 되있으면 logoutTimer를 지워줘야하기 때문에 clearTimeout을 호출한다.
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime); //expirationTime을 localStorage에 저장

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime); // setTimeout=> remaingTime만큼의 시간이 되면 logoutHandler callback 함수를 실행시킨다. => 로그아웃 시킨다.
    //setTimeout함수 : 첫번째 인자로 실행할 코드를 담고 있는 callback함수, 두번째 인자로 지연 시간을 받는다.
  };

  // 타이머도 없애한다. 만약, tokenData가 변하면
  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

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

// calculate time : 현재시간 먼저 구하기
// 미래 시간 구하기
// 남아있는 시간 : 미래 시간 - 현재시간

// 로그인을 로그아웃 뒤에 입력한다.
//
