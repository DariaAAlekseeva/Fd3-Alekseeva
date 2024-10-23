import React from "react";


let withRainbowFrame = colors => Comp => props =>
  colors.reduce((res, color) => {
    return (
      <div style={{ border: `5px solid ${color}`, padding: '5px' }}>
        {res}
      </div>
    );
  }, <Comp {...props} />)


export { withRainbowFrame }