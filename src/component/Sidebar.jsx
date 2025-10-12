import React from 'react'
import Progressbar from './ui_logic/Progressbar'

const Sidebar = () => {
  return (
    <>
      <div class="flex gap-[20px] flex-col items-center p-5">
            <div class="w-[250px] grow">
                <h2 class="text-xl font-semibold">
                    My Tasks
                </h2>
                <div>
                    <h3>Todays Progress</h3>
                    <div class="mt-2">
                    <Progressbar />
                    </div>
                </div>
            </div>


            <div class="w-[250px] grow">
                <h3>All Tasks</h3>
                <div>
                    <p>Active</p>
                    <p>Completed</p>
                </div>
            </div>


            <div class="w-[250px] grow">
                <h3>Priority</h3>
                <div>
                    <p>High</p>
                    <p>Medium</p>
                    <p>Low</p>
                </div>

            </div>
        </div>
    </>
  )
}

export default Sidebar
