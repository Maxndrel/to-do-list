import React from 'react'

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
            <form className='flex flex-col gap-4 mt-10 w-1/2'>
              <input 
              type="text" 
              placeholder="task header" 
              class="border-2 rounded-md p-2 w-100"/>

              <input 
              type="text" 
              placeholder="Describe task" 
              class="border-2 rounded-md p-2 w-100"/>

              <select
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

              <button type="submit" class="border-2 rounded-lg p-2 bg-sky-950 hover:bg-sky-900 text-white ">Add Task</button>
            </form>
        </div>

    </div>
  )
}

export default addTaskForm