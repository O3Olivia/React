import React from "react";

const DemoOutput = (props) => {
  console.log("DEMO"); // props가 계속 변경되기때문에 console창에 계속 뜬다.
  return <p>{props.show ? "This is NEW " : ""} </p>;
};

export default React.memo(DemoOutput);
