import React from 'react'
import Sidebar from '../component/Sidebar'
import { HugeiconsIcon } from '@hugeicons/react';
import { SearchIcon, Add02Icon, TickDouble03Icon, PropertyEditIcon, Delete02Icon } from '@hugeicons/core-free-icons';
import { useState } from 'react';

const main_page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState([""]);
    
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Task Added: ${task}`);
    setTask("");
    setIsOpen(false);
  }
  
  const [tasks, setTasks] = useState([]); // stores all tasks
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDateTime, setDueDateTime] = useState("");

  // function to add a new task
  const addTask = () => {
    const newTask = {
      title,
      description,
      priority,
      dueDateTime,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]); // add new task to the list

    // clear inputs
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDateTime("");
  };

  // Helper function to format date & time
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Function to pick text color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-600/25 ml-3 rounded-md p-1 w-fit text-sm";
      case "Medium":
        return "text-yellow-600 bg-yellow-600/25 ml-3  rounded-md p-1 w-fit text-sm";
      case "Low":
        return "text-green-600 bg-green-600/25 ml-3  rounded-md p-1 w-fit text-sm";
      default:
        return "text-gray-500";
    }
  };

  const [isDone, setIsDone] = useState(false); 

  const toggleDone = () => {
    setIsDone(!isDone);
  };
  

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
                <h2 className="text-xl text-center font-semibold mb-2">Add New Task</h2>

                {/* Form */}
                <div className='flex justify-center items-center'>
                    <form  onSubmit={handleSubmit} className='flex flex-col gap-4 mt-5 w-1/2'>
                      <input 
                      type="text" 
                      placeholder="task title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required 
                      class="border-2 rounded-md p-2 w-100"/>

                      <input 
                      type="text" 
                      placeholder="Describe task" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required 
                      class="border-2 rounded-md p-2 w-100"/>

                      <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      required
                      className="border rounded-lg p-2 w-40"
                      >
                        <option value="">- Priority Level -</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>

                      <div className='text-base flex justify-between'>
                        <label>Set Deadline: </label>
                        <input 
                        type="datetime-local" 
                        value={dueDateTime}
                        onChange={(e) => setDueDateTime(e.target.value)} />
                      </div>
                    
                      <div className='flex gap-2'>
                        <button 
                        type="submit" 
                        onClick={addTask}
                        class="border-2 rounded-lg p-2 bg-sky-950 hover:bg-sky-900 text-white ">
                          Add Task
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsOpen(false)}
                          className="bg-red-600 text-gray-800 px-3 py-1 rounded-md hover:bg-red-500"
                        > 
                          Cancel
                        </button>
                      </div>
                    </form>
                </div>
              </div>
            </div>
          )}

        </div>

        <div>
          {/* task list */}
          <div className='mt-6'>
            <ul className="mt-2">
              {tasks.map((task, index) => (
                <li key={index} className="bg-gray-100 p-5 rounded-lg mb-2 flex gap-4">
                  <div className='flex justify-center items-center'>
                    <button 
                    type="button"
                    onClick={toggleDone}
                    className='w-[25px] h-[25px] rounded-sm border-1 p-0.5'> {isDone && <span className=""><HugeiconsIcon icon={TickDouble03Icon } size={18}/></span>}</button>
                  </div>

                  <div className='flex justify-between w-full px-2'>
                    <div>
                      <div className='flex items-center'>
                        <h4 className={'font-bold uppercase text-lg'}>{task.title} </h4>
                        <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                      </div>
                      <p className={`${isDone ? "line-through text-gray-500" : "text-black"}`}>{task.description}</p>
                      <p className='text-sm'>Due: {formatDateTime(task.dueDateTime)} <span className='ml-10'>Created: {formatDateTime(task.createdAt)}</span></p>
                    </div>

                    <div className='flex w-fit items-center gap-3'>
                      <button><HugeiconsIcon icon={PropertyEditIcon} /></button>
                      <button><HugeiconsIcon icon={Delete02Icon} color='red' /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default main_page
