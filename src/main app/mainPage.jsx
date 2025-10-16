import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  SearchIcon,
  Add02Icon,
  TickDouble03Icon,
  PropertyEditIcon,
  Delete02Icon,
} from '@hugeicons/core-free-icons';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // store all tasks
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDateTime, setDueDateTime] = useState('');
  const [error, setError] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // ✅ Add or Edit Task
  const addTask = (e) => {
    e.preventDefault();

    if (!title || !description || !priority || !dueDateTime) {
      setError('⚠️ Please fill in all fields before adding a task.');
      return;
    }

    if (editIndex !== null) {
      // Edit mode
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = {
        title,
        description,
        priority,
        dueDateTime,
        createdAt: tasks[editIndex].createdAt,
        updatedAt: new Date().toLocaleString(),
        isDone: tasks[editIndex].isDone,
      };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // Add new task
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

    setError('');
    setTitle('');
    setDescription('');
    setPriority('');
    setDueDateTime('');
    setIsOpen(false);
  };

  // ✅ Delete Task
  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  // ✅ Edit Task
  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setPriority(taskToEdit.priority);
    setDueDateTime(taskToEdit.dueDateTime);
    setEditIndex(index);
    setIsOpen(true);
  };

  // ✅ Toggle Task Completion
  const toggleDone = (index) => {
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, isDone: !t.isDone } : t
    );
    setTasks(updated);
  };

  // ✅ Helper: Format date/time
  const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  // ✅ Priority Color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-500 bg-red-100 ml-3 font-semibold rounded-md p-1 w-fit text-sm';
      case 'Medium':
        return 'text-yellow-500 bg-yellow-100 ml-3 font-semibold rounded-md p-1 w-fit text-sm';
      case 'Low':
        return 'text-green-500 bg-green-100 ml-3 font-semibold rounded-md p-1 w-fit text-sm';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <body className="flex gap-[10px] flex-row items-center h-full w-full mx-3 mt-1">
      {/* Sidebar */}
      <section className="w-[20%] h-150 border fixed">
        <Sidebar />
      </section>

      {/* Main Section */}
      <section className="w-[80%] h-150 border ml-[18rem] px-5">
        <div className="fixed backdrop-blur-sm bg-white w-[70%]">
          {/* Header */}
          <section className="item flex justify-between">
            <div className="pt-5 pb-7">
              <h1 className="text-2xl font-semibold">Today's Tasks</h1>
              <p className="text-sm">Manage your tasks efficiently</p>
            </div>
            <p className="pt-8 text-sm">Friday, October 12, 2025</p>
          </section>

          {/* Search + Add */}
          <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg">
            <form>
              <input
                type="text"
                placeholder="Search task"
                className="border-2 rounded-md p-2 w-180 relative"
              />
              <button
                type="submit"
                className="rounded-xl p-2 text-white absolute right-45 top-29.5"
              >
                <HugeiconsIcon icon={SearchIcon} size={24} color="grey" />
              </button>
            </form>
            <button
              className="p-2.5 bg-sky-950 hover:bg-sky-900 rounded-lg ml-2 text-white flex gap-1"
              onClick={() => setIsOpen(true)}
            >
              <HugeiconsIcon icon={Add02Icon} size={18} className="mt-0.5" />{' '}
              {editIndex !== null ? 'Edit Task' : 'Add Task'}
            </button>
          </div>
        </div>

        {/* Popup Form */}
        {isOpen && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="bg-white rounded-lg p-6 w-180 shadow-lg relative">
              <h2 className="text-xl text-center font-semibold mb-2">
                {editIndex !== null ? 'Edit Task' : 'Add New Task'}
              </h2>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 bg-red-100 border border-red-400 p-3 rounded-xl w-fit text-center mx-auto mb-2">
                  {error}
                </p>
              )}

              {/* Form */}
              <form
                onSubmit={addTask}
                className="flex justify-center flex-col gap-4 mt-5 w-1/2 mx-auto"
              >
                <input
                  type="text"
                  placeholder="Task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="border-2 rounded-md p-2 w-full"
                />

                <input
                  type="text"
                  placeholder="Describe task"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="border-2 rounded-md p-2 w-full"
                />

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

                <div className="text-base flex justify-between">
                  <label>Set Deadline:</label>
                  <input
                    type="datetime-local"
                    value={dueDateTime}
                    onChange={(e) => setDueDateTime(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="border-2 rounded-lg p-2 bg-sky-950 hover:bg-sky-900 text-white"
                  >
                    {editIndex !== null ? 'Update Task' : 'Add Task'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setEditIndex(null);
                      setError('');
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="mt-6 pt-43">
          <ul className="mt-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="bg-gray-100 p-5 rounded-lg mb-2 flex gap-4"
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() => toggleDone(index)}
                  className="w-[25px] my-auto h-[25px] rounded-sm border p-0.5 flex justify-center items-center"
                >
                  {task.isDone && (
                    <HugeiconsIcon icon={TickDouble03Icon} size={18} />
                  )}
                </button>

                {/* Task Details */}
                <div className="flex justify-between w-full px-2">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-bold uppercase text-lg">
                        {task.title}
                      </h4>
                      <span className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </span>
                    </div>
                    <p
                      className={`${
                        task.isDone
                          ? 'line-through text-gray-500'
                          : 'text-black'
                      }`}
                    >
                      {task.description}
                    </p>
                    <p className="text-sm">
                      Due: {formatDateTime(task.dueDateTime)}{' '}
                      <span className="ml-10">
                        Created: {formatDateTime(task.createdAt)}
                      </span>
                    </p>
                  </div>

                  {/* Edit / Delete */}
                  <div className="flex w-fit items-center gap-3">
                    <button onClick={() => editTask(index)}>
                      <HugeiconsIcon icon={PropertyEditIcon} />
                    </button>
                    <button onClick={() => deleteTask(index)}>
                      <HugeiconsIcon icon={Delete02Icon} color="red" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </body>
  );
};

export default MainPage;
