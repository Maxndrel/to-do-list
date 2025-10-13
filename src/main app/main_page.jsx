import React from 'react'
import Sidebar from '../component/Sidebar'
import { HugeiconsIcon } from '@hugeicons/react';
import { SearchIcon, Add02Icon } from '@hugeicons/core-free-icons';
import { useState } from 'react';

const main_page = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <div className="flex gap-[10px] flex-row items-center flex-nowrap h-full m-1">
      {/* left side or side bar */}
      <div className="w-[20%] h-150 border-2">
      <Sidebar/>
      </div>
      
      {/* right side */}
      <div className=" w-[80%] h-150 border-2 pr-15 pl-15">
        <div className="item flex justify-between">
          <div className='pt-5 pb-7'>
            <h1 className='text-2xl font-semibold'>Today's Tasks</h1>
            <p className='text-sm'>Manage your tasks efficently</p>
          </div>

          <p className='pt-8 text-sm'>Friday, October 12, 2025 </p>
        </div>

        <div className="item">
          <div className='flex justify-center items-center bg-gray-100 p-4 rounded-lg'>
            <form action="#" method="get">
              <input type="text" placeholder="Search task" className="border-2 rounded-md p-2 w-180 relative"/>
              <button type="submit" className=" rounded-xl p-2 text-white absolute right-60 top-31"><HugeiconsIcon icon={SearchIcon} size={24} color='grey'/></button>
            </form>
            <button className='p-2.5 bg-sky-950 rounded-lg ml-2 text-white flex gap-1' onClick={() => setIsOpen(true)}> <HugeiconsIcon icon={Add02Icon} size={18} className='mt-0.5' /> Add Task</button>
          </div>

          {isOpen && (
            <div className="fixed inset-0 backdrop-blur-sm bg-opacity-[10%] flex items-center justify-center">
              {/* Popup Box */}
              <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Enter task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          
        </div>
      <div className='flex justify-center items-center'>
            <form className='flex flex-col gap-4 mt-10 w-1/2'>
              <input 
              type="text" 
              placeholder="task header" 
              class="border-2 rounded-md p-2 w-100"/>

              <input 
              type="text" 
              placeholder="Describe task" 
              class="border-2 rounded-md p-2 w-100"/>

              <select
              className="border rounded-lg p-2 w-40"
              >
                <option value="">- Priority Level -</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <button type="submit" class="border-2 rounded-md p-2 bg-sky-950 text-white">Add Task</button>
            </form>
        </div>


      </div>
    </div>
  )
}

export default main_page
