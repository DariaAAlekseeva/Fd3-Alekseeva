  import React from "react";
  import RainbowFrame from "./RainbowFrame";


  let withRainbowFrame = colors => Comp => props =>
   
    <RainbowFrame colors = {colors}>
       <Comp {... props}/>
     </RainbowFrame>
   ;

   export {withRainbowFrame}