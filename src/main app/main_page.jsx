import React from 'react'
import Sidebar from '../component/Sidebar'

const main_page = () => {
  return (
    <div class="flex gap-[10px] flex-row items-center flex-nowrap h-full m-1">
      {/* left side or side bar */}
      <div class="w-[20%] h-150 border-2">
      < Sidebar />
      </div>
      
      {/* right side */}
      <div class=" w-[80%] h-150 border-2">
        <div class="item">
          <div>
            <h1>All Tasks</h1>
            <p>Manage your tasks efficently</p>
          </div>

          <div>
            <button class="border-2 rounded-md p-2 bg-blue-500 text-white">+ filter</button>
          </div>

          <div>
            <button class="border-2 rounded-md p-2 bg-blue-500 text-white">+ sort</button>
          </div>

        </div>
        <div class="item">
          <div className='flex justify-center items-center'>
            <form action="#" method="get">
              <input type="text" placeholder="Search task" class="border-2 rounded-md p-2 w-180"/>
              <button type="submit" class="border-2 rounded-md p-2 bg-blue-500 text-white">Search</button>
            </form>
          </div>

          <div className='flex justify-center items-center'>
            <form action="#" method="get">
              <input type="text" placeholder="task header" class="border-2 rounded-md p-2 w-100"/>
              <input type="text" placeholder="Describe task" class="border-2 rounded-md p-2 w-100"/>
              <select
              className="border rounded-lg p-2 w-40"
              >
                <option value="">-- Priority Level --</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <button type="submit" class="border-2 rounded-md p-2 bg-blue-500 text-white">Add Task</button>
            </form>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default main_page
