import React from "react";


const DoubleButton = ({ caption1, caption2, cbPressed, children }) => {

  const clickButton1 = () => {
    cbPressed(1);
  }
  const clickButton2 = () => {
    cbPressed(2);
  }

  return (
    <div>
      <input type="button" value={caption1} onClick={clickButton1} />
      <span>{children}</span>
      <input type="button" value={caption2} onClick={clickButton2} />
    </div>
  );
};

export default DoubleButton;
