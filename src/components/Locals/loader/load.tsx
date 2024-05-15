'use client'
import React, { useState, useEffect } from 'react';
import './external.css';

function Loader() {
  const [halfway, setHalfway] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setHalfway(!halfway); 
    }, 1200);
    return () => clearTimeout(timer);
  }, [halfway]);

  return (
    <div className="cont">
      <div className="w-full h-full flex justify-center items-center" id="content">
        <div className="heart-rate">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="150px"
            height="73px"
            viewBox="0 0 150 73"
            enableBackground="new 0 0 150 73"
          >
            <polyline
              fill="none"
              stroke={halfway ? '#0f0' : '#f00'} // Change color halfway, then entire SVG turns green
              strokeWidth="3"
              strokeMiterlimit="10"
              points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
            />
          </svg>

          <div className="fade-in"></div>
          <div className="fade-out"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
