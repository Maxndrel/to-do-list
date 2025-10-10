import React from 'react'
import Sidebar from '../component/Sidebar'

const main_page = () => {
  return (
    <div class="flex gap-[20px] flex-row items-center flex-nowrap h-full">
      {/* left side or side bar */}
      <div class="w-[30%] h-150 border-2">
      < Sidebar />
      </div>
      
      {/* right side */}
      <div class=" w-[70%] h-150 border-2">
        <div class="item">
          <div>
            <h1>All Tasks</h1>
            <p>Manage your tasks efficently</p>
          </div>

          <div>
            <button class="border-2 rounded-md p-2 bg-blue-500 text-white">+ filter</button>
          </div>

          <div>
            <button class="border-2 rounded-md p-2 bg-blue-500 text-white">+ filter</button>
          </div>

        </div>
        <div class="item">Content</div>
      
      </div>
    </div>
  )
}

export default main_page
