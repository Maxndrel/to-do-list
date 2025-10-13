import React from 'react'
import Sidebar from '../component/Sidebar'
import { HugeiconsIcon } from '@hugeicons/react';
import { SearchIcon, Add02Icon } from '@hugeicons/core-free-icons';
import { useState } from 'react';
import AddTaskForm from '../component/addTaskForm';

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
            <button className='p-2.5 bg-sky-950 hover:bg-sky-900 rounded-lg ml-2 text-white flex gap-1' onClick={() => setIsOpen(true)}> <HugeiconsIcon icon={Add02Icon} size={18} className='mt-0.5' /> Add Task</button>
          </div>

          {isOpen && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
              {/* Popup Box */}
              <div className="bg-white rounded-lg p-6 w-180 shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

                {/* Form */}
                <AddTaskForm />
              </div>
            </div>
          )}

          
        </div>

      </div>
    </div>
  )
}

export default main_page
