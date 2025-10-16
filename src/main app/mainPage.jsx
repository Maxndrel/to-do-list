import React from 'react'
import Sidebar from '../component/Sidebar'
import { HugeiconsIcon } from '@hugeicons/react';
import { SearchIcon, Add02Icon, TickDouble03Icon, PropertyEditIcon, Delete02Icon } from '@hugeicons/core-free-icons';
import { useState } from 'react';

const mainPage = () => {




  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState([""]);

  const [tasks, setTasks] = useState([]); // stores all tasks
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDateTime, setDueDateTime] = useState("");
  const [error, setError] = useState("");
   const [editIndex, setEditIndex] = useState(null);
  
  // function to add a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Task Added: ${task}`);
    setTask("");
    setIsOpen(false);

    
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const addTask = (e) => {
    e.preventDefault();

    // Validation check
    if (!title || !description || !priority || !dueDateTime) {
      setError("⚠️ Please fill in all fields before adding a task.");
      return;
    }

     if (editIndex !== null) {
      // Update existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = {
        ...task,
        createdAt: tasks[editIndex].createdAt, // keep original creation time
        updatedAt: new Date().toLocaleString(), // new updated time
      };
      setTasks(updatedTasks);
      setEditIndex(null); // exit edit mode
    } else {
      // If all fields are filled
      const newTask = {
        title,
        description,
        priority,
        dueDateTime,
        createdAt: new Date().toISOString(),
        isDone: false,
      };
      setTasks((prev) => [...prev, newTask]);
    }

    setTasks([...tasks, newTask]);
    setError("");

    // Clear inputs
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDateTime("");

    setIsOpen(false);
  };

   // Delete function
  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  // ✏️ Edit Task
  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setFormData({
      title: taskToEdit.title,
      description: taskToEdit.description,
      priority: taskToEdit.priority,
      dueDateTime: taskToEdit.dueDateTime,
    });
    setEditIndex(index);
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
        return "text-red-500 bg-red-100 ml-3 font-semibold rounded-md p-1 w-fit text-sm";
      case "Medium":
        return "text-yellow-500 bg-yellow-100 ml-3 font-semibold rounded-md p-1 w-fit text-sm";
      case "Low":
        return "text-green-500 bg-green-100 ml-3 font-semibold rounded-md p-1 w-fit text-sm";
      default:
        return "text-gray-500";
    }
  };

  const toggleDone = (index) => {
  const updated = tasks.map((t, i) =>
    i === index ? { ...t, isDone: !t.isDone } : t
  );
  setTasks(updated);
};

  
  

  return (
    <div className="flex gap-[10px] flex-row items-center flex-nowrap h-full mx-3 mt-1">
      {/* left side or side bar */}
      <div className="w-[20%] h-150 border-2 fixed">
      <Sidebar/>
      </div>
      
      {/* right side */}
      <div className=" w-[80%] h-150 border-2 pr-15 pl-15 ml-[18rem]">
        <div className='fixed backdrop:blur-sm bg-white w-[70%]'>
          <div className="item flex justify-between">
            <div className='pt-5 pb-7'>
              <h1 className='text-2xl font-semibold'>Today's Tasks</h1>
              <p className='text-sm'>Manage your tasks efficently</p>
            </div>

            <p className='pt-8 text-sm'>Friday, October 12, 2025 </p>
          </div>

          <div className='flex justify-center items-center bg-gray-100 p-4 rounded-lg'>
            <form action="#" method="get">
              <input type="text" placeholder="Search task" className="border-2 rounded-md p-2 w-180 relative"/>
              <button type="submit" className=" rounded-xl p-2 text-white absolute right-45 top-29.5"><HugeiconsIcon icon={SearchIcon} size={24} color='grey'/></button>
            </form>
            <button className='p-2.5 bg-sky-950 hover:bg-sky-900 rounded-lg ml-2 text-white flex gap-1' onClick={() => setIsOpen(true)}> <HugeiconsIcon icon={Add02Icon} size={18} className='mt-0.5' /> Add Task</button>
          </div>
        </div>

        <div className="item mt-50">

          {isOpen && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
              {/* Popup Box */}
              <div className="bg-white rounded-lg p-6 w-180 shadow-lg relative">
                <h2 className="text-xl text-center font-semibold mb-2">Add New Task</h2>

                {/* Show Error Message */}
                <div className='flex justify-center items-center ml-6'>
                  {error && (
                    <p className="text-red-500 bg-red-100 border border-red-400 p-3 rounded-xl w-fit text-center mx-auto">
                      {error}
                    </p>
                  )}
                </div>

                {/* Form */}
                <div className='flex justify-center items-center'>
                    <form  onSubmit={handleSubmit} className='flex justify-center flex-col gap-4 mt-5 w-1/2'>
                      <input 
                      type="text" 
                      placeholder="task title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required 
                      className="border-2 rounded-md p-2 w-100"/>

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
                        onSubmit={addTask}                   
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
                    onClick={() => toggleDone(index)}
                    className='w-[25px] h-[25px] rounded-sm border-1 p-0.5'> {isDone && <span className=""><HugeiconsIcon icon={TickDouble03Icon } size={18}/></span>}</button>
                  </div>

                  <div className='flex justify-between w-full px-2'>
                    <div>
                      <div className='flex items-center'>
                        <h4 className={'font-bold uppercase text-lg'}>{task.title} </h4>
                        <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                      </div>
                      <p className={task.isDone ? "line-through text-gray-500" : "text-black"}>
                        {task.description}
                      </p>
                      <p className='text-sm'>Due: {formatDateTime(task.dueDateTime)} <span className='ml-10'>Created: {formatDateTime(task.createdAt)}</span></p>
                    </div>

                    <div className='flex w-fit items-center gap-3'>
                      <button
                      onClick={() => editTask(index)}
                      ><HugeiconsIcon icon={PropertyEditIcon} /></button>
                      <button
                      onClick={() => deleteTask(index)}
                      >
                      <HugeiconsIcon icon={Delete02Icon} color='red'/></button>
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


export default mainPage
