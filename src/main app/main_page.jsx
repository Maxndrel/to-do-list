import React from 'react'
import Sidebar from '../component/Sidebar'
import AddTaskForm from '../component/addTaskForm'

const main_page = () => {
  

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
          <AddTaskForm/>
        </div>

      </div>
    </div>
  )
}

export default main_page
