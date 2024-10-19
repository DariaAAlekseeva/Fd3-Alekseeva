
import React from 'react';

const RainbowFrame = ({ colors, children }) => {
    return (
        colors.reduce((acc, color) => {
            return (
                <div style={{ border: `5px solid ${color}`, padding: '10px' }}>
                    {acc}
                </div>
            );
        }, children) 
      
    );
};

export default RainbowFrame;