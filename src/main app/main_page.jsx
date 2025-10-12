import React from 'react'
import Sidebar from '../component/Sidebar'

const main_page = () => {
  return (
    <div class="flex gap-[10px] flex-row items-center flex-nowrap h-full m-1">
      {/* left side or side bar */}
      <div class="w-[20%] h-150 border-2">
      <Sidebar/>
      </div>
      
      {/* right side */}
      <div class=" w-[80%] h-150 border-2 pr-10 pl-10">
        <div class="item">
          <div>
            <h1>All Tasks</h1>
            <p>Manage your tasks efficently</p>
          </div>


        </div>
        <div class="item">
          <div className='flex justify-center items-center bg-gray-100 p-4 rounded-lg'>
            <form action="#" method="get">
              <input type="text" placeholder="Search task" class="border-2 rounded-md p-2 w-180"/>
              <button type="submit" class="border-2 rounded-md p-2 bg-blue-500 text-white">Search</button>
            </form>
          </div>

          
        </div>
      
      </div>
    </div>
  )
}

export default main_page
