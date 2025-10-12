import React from 'react'
import { useState, useEffect } from 'react'

const Progressbar = () => {

const [progress, setProgress] = useState(0)
useEffect(() => {
  const timer = setInterval(() => {
    setProgress((oldProgress) => {
      if (oldProgress >= 100) {
        clearInterval(timer);
        return 100;
      }
      return oldProgress + 10;
    });
  }, 500);

  return () => clearInterval(timer);
}, []);



  return (
    <div className="w-full max-w-md mx-auto flex justisfy-between">
      <div className="w-full rounded-full h-3 overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center mt-2 font-medium">{progress}%</p>
    </div>
  )
}


export default Progressbar