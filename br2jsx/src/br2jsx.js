import React from "react";

const Br2JSX = ({ text }) => {
  const lines = text.split(/<br\s*\/?>/);

  return (
    <div className='br2jsx'>
      {lines.map((line, index) => [
          line,
          index < lines.length - 1 && <br />
      ])}
    </div>
  );
};

export default Br2JSX;
