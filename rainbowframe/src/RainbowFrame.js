
import React from 'react';

const RainbowFrame = ({ colors, children }) => {
    return (
        colors.reduce((res, color) => {
            return (
                <div style={{ border: `5px solid ${color}`, padding: '5px' }}>
                    {res}
                </div>
            );
        }, children) 
      
    );
};

export default RainbowFrame;