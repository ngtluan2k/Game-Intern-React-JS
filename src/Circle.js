import React, { useState, useEffect } from 'react';

const Circle = ({ number, onClick }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const randomTop = Math.random() * 92;
        const randomLeft = Math.random() * 92;
        setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
    }, []);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            onClick(number);
        }, 500);
    };

    return (
        <div
            className={`circle ${isClicked ? 'red' : ''}`}
            onClick={handleClick}
            style={{
                top: position.top,
                left: position.left,
                zIndex: 1000 - number,
                transform: isClicked ? 'scale(1.1)' : 'scale(1)',
            }}
        >
            {number}
        </div>
    );
};


export default Circle;
