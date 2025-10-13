import React from 'react'
import { useState } from 'react';

const addTaskForm = () => {
    const [task, setTask] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Task Added: ${task}`);
        setTask("");
        setIsOpen(false);
      }
  return (
    <div>
       <div className='flex justify-center items-center'>
            <form  onSubmit={handleSubmit} className='flex flex-col gap-4 mt-10 w-1/2'>
              <input 
              type="text" 
              placeholder="task header"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required 
              class="border-2 rounded-md p-2 w-100"/>

              <input 
              type="text" 
              placeholder="Describe task" 
              onChange={(e) => setTask(e.target.value)}
              required 
              class="border-2 rounded-md p-2 w-100"/>

              <select
              required
              className="border rounded-lg p-2 w-40"
              >
                <option value="">- Priority Level -</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input 
              type="datetime-local" 
              name="" 
              id="" />
            
                <div className='flex gap-2'>
              <button 
              type="submit" 
              class="border-2 rounded-lg p-2 bg-sky-950 hover:bg-sky-900 text-white ">
                Add Task
              </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400"
                > 
                    Cancel
                </button>
              </div>
            </form>
        </div>

    </div>
  )
}

export default addTaskForm