import React from 'react'

const Progressbar = ({ totalTasks, completedTasks }) => {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full rounded-full h-3 overflow-hidden bg-gray-200">
        <div
          className="bg-green-500 h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-1 font-base text-gray-700 text-sm">
        {completedTasks} of {totalTasks} Completed
        <span className='ml-22'>{Math.round(progress)}%</span>
      </p>
    </div>
  )
}

export default Progressbar
