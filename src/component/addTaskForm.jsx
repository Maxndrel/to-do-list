import React from 'react'

const addTaskForm = () => {
  return (
    <div>
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
  )
}

export default addTaskForm