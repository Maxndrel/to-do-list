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
       
    </div>
  )
}

export default addTaskForm