import React, { useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import Progressbar from '../component/ui_logic/Progressbar';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import ReminderPopup from '../components/ReminderPopup';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import { useReminders } from '../hooks/useReminders';
import { loadTasksFromStorage, saveTasksToStorage } from '../utils';
import { HugeiconsIcon } from '@hugeicons/react';
import { SearchIcon, Add02Icon, PropertyEditIcon, TickDouble03Icon, Delete02Icon } from '@hugeicons/core-free-icons';

/**
 * MainPage Component
 * This component renders the main to-do list application interface.
 * It includes functionality for adding, editing, deleting, and filtering tasks,
 * with localStorage persistence and user alerts.
 */
const MainPage = () => {
  // State variables for managing the application's data and UI
  const [isOpen, setIsOpen] = useState(false); // Controls visibility of the add/edit task popup form
  const [tasks, setTasks] = useState([]); // Array to store all tasks
  const [title, setTitle] = useState(''); // Current task title input
  const [description, setDescription] = useState(''); // Current task description input
  const [priority, setPriority] = useState(''); // Current task priority input
  const [dueDateTime, setDueDateTime] = useState(''); // Current task due date and time input
  const [error, setError] = useState(''); // Error message for form validation
  const [editIndex, setEditIndex] = useState(null); // Index of the task being edited (null if adding new)
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date for display
  const [searchQuery, setSearchQuery] = useState(''); // Search query for filtering tasks
  const [filter, setFilter] = useState('all'); // Filter type: 'all', 'active', 'completed', etc.
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' }); // State for displaying alerts
  const [confirmDelete, setConfirmDelete] = useState({ show: false, index: null }); // State for delete confirmation dialog


  useEffect(() => {
    // Function to calculate milliseconds until next midnight
    const getTimeUntilMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return tomorrow - now;
    };

    // Schedule an update at midnight
    const timeout = setTimeout(() => {
      setCurrentDate(new Date());
    }, getTimeUntilMidnight());

    // Cleanup when component unmounts
    return () => clearTimeout(timeout);
  }, []); // Removed [currentDate] to prevent re-renders

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    setTasks(loadTasksFromStorage());
  }, []);

  // Use the custom reminder hook
  const { reminder, setReminder } = useReminders(tasks, setTasks, saveTasksToStorage);

  // Handle Form Submission (Add or Edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !priority || !dueDateTime) {
      setError('⚠️ Please fill in all fields before adding a task.');
      return;
    }

    if (editIndex !== null) {
      handleEditTask();
    } else {
      handleAddTask();
    }

    resetForm();
  };

  // Add New Task
  const handleAddTask = () => {
    const newTask = {
      title,
      description,
      priority,
      dueDateTime,
      createdAt: new Date().toISOString(),
      isDone: false,
      reminded: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    console.log('Task added and saved to localStorage:', newTask);

    // Show success alert
    setAlert({ show: true, message: 'Task added successfully!', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 2000);
  };

  // Edit Existing Task
  const handleEditTask = () => {
    const updatedTasks = [...tasks];
    const originalTask = updatedTasks[editIndex];
    const dueDateChanged = originalTask.dueDateTime !== dueDateTime;

    updatedTasks[editIndex] = {
      ...originalTask,
      title,
      description,
      priority,
      dueDateTime,
      updatedAt: new Date().toLocaleString(),
      reminded: dueDateChanged ? false : originalTask.reminded, // Reset reminded flag if due date changed
    };
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    console.log('Task edited and saved to localStorage:', updatedTasks[editIndex]);
    setEditIndex(null);

    // Show success alert
    setAlert({ show: true, message: 'Task updated successfully!', type: 'success' });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 2000);
  };

  // Reset Form Fields
  const resetForm = () => {
    setError('');
    setTitle('');
    setDescription('');
    setPriority('');
    setDueDateTime('');
    setIsOpen(false);
  };

  // Confirm Delete Task
  const confirmDeleteTask = (index) => {
    setConfirmDelete({ show: true, index });
  };

  // Delete Task
  const deleteTask = () => {
    const indexToDelete = confirmDelete.index;
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    console.log('Task deleted and saved to localStorage');

    // Show success alert
    setAlert({ show: true, message: 'Task deleted successfully!', type: 'danger' });
    setTimeout(() => setAlert({ show: false, message: '', type: 'danger' }), 2000);
    setConfirmDelete({ show: false, index: null });
  };

  // Edit Task
  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setPriority(taskToEdit.priority);
    setDueDateTime(taskToEdit.dueDateTime);
    setEditIndex(index);
    setIsOpen(true);
  };

  // Toggle Task Completion
  const toggleDone = (index) => {
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, isDone: !t.isDone, updatedAt: new Date().toLocaleString() } : t
    );
    setTasks(updated);
    saveTasksToStorage(updated);
    console.log('Task completion toggled and saved to localStorage');

    // Show success alert if task is marked as completed
    if (updated[index].isDone) {
      setAlert({ show: true, message: 'Task marked as completed!', type: 'success' });
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 2000);
    }
  };

  // Helper: Format date/time
  const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  // Helper: Check if task is overdue
  const isOverdue = (dueDateTime) => {
    if (!dueDateTime) return false;
    return new Date(dueDateTime) < new Date();
  };

  // Priority Color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-500 bg-red-100 ml-3 font-semibold rounded-md p-1 w-fit text-sm';
      case 'Medium':
        return 'text-yellow-500 bg-yellow-100 ml-3 font-semibold rounded-md p-1 w-fit text-sm';
      case 'Low':
        return 'text-blue-500 bg-blue-100 ml-3 font-semibold rounded-md p-1 w-fit text-sm';
      default:
        return 'text-gray-500';
    }
  };




  return (
    <div className="flex gap-[10px] flex-col md:flex-row h-full m-3">
      {/* Sidebar */}
      <div className="w-fit md:w-[25%] lg:w-[20%] h-fit md:fixed rounded-xl shadow-[0_0_6px_rgba(128,128,128,0.70)]">
        <Sidebar tasks={tasks} setFilter={setFilter} filter={filter} />
      </div>

      {/* Main Section */}
      <div className="w-fit md:w-[72%] lg:w-[77%] md:fixed h-[94%] px-4 md:px-12 md:ml-[18rem] lg:ml-[18rem] rounded-xl shadow-[0_0_6px_rgba(128,128,128,0.70)] overflow-y-auto pb-10">
        {/* Header */}
        <div className="fixed shadow-[0_2px_0_rgba(128,128,128,0.10)] backdrop-blur-sm bg-white w-full md:w-[70%] lg:w-[70%]">
          <div className="item flex justify-between">
            <div className="pt-5 pb-7">
              <h1 className="text-2xl font-semibold">Today's Tasks</h1>
              <p className="text-sm">Manage your tasks efficiently</p>
            </div>
            <p className="pt-8 text-base">{formattedDate}</p>
          </div>

          {/* Search + Add */}
          <div className="flex flex-col md:flex-row justify-center items-center bg-gray-100 p-4 rounded-lg gap-4 md:gap-0">
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Search task"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-2 rounded-md p-2 w-full md:w-[50rem] relative"
              />
              <button
                type="submit"
                className="rounded-xl p-2 text-white absolute right-[15%] top-[66%] md:right-[15%] md:top-[66%]"
              >
                <HugeiconsIcon icon={SearchIcon} size={24} color="grey" />
              </button>
            </form>
            <button
              className="p-2 bg-sky-950 hover:bg-sky-900 rounded-lg w-full md:w-auto md:ml-2 text-white text-md font-medium flex gap-1 justify-center"
              onClick={() => setIsOpen(true)}
            >
              <HugeiconsIcon icon={Add02Icon} size={17} className="mt-0.5" />{' '}
              {editIndex !== null ? 'Edit Task' : 'Add Task'}
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {alert.show && (
          <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-lg shadow-lg z-50`}>
            {alert.message}
          </div>
        )}

        {/* Confirmation Dialog */}
        <ConfirmDeleteDialog
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          deleteTask={deleteTask}
        />

        {/* Reminder Popup */}
        <ReminderPopup
          reminder={reminder}
          setReminder={setReminder}
        />

        {/* Popup Form */}
        <TaskForm
          isOpen={isOpen}
          editIndex={editIndex}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          priority={priority}
          setPriority={setPriority}
          dueDateTime={dueDateTime}
          setDueDateTime={setDueDateTime}
          error={error}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
        />

        {/* Task List */}
        <div className="mt-[12rem]">
          <ul className="mt-2">
            {tasks.filter(task => {
              const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesFilter = filter === 'all' ||
                (filter === 'active' && !task.isDone) ||
                (filter === 'completed' && task.isDone) ||
                (filter === 'high' && task.priority === 'High') ||
                (filter === 'medium' && task.priority === 'Medium') ||
                (filter === 'low' && task.priority === 'Low');
              return matchesSearch && matchesFilter;
            }).map((task, index) => (
              <li
                key={index}
                className="bg-gray-100 p-5 rounded-lg mb-2 flex flex-col md:flex-row gap-4"
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() => toggleDone(index)}
                  className="w-[25px] my-auto h-[25px] rounded-sm border p-0.5 flex justify-center items-center self-start md:self-center"
                >
                  {task.isDone && (
                    <HugeiconsIcon icon={TickDouble03Icon} size={18} />
                  )}
                </button>

                {/* Task Details */}
                <div className="flex flex-col md:flex-row justify-between w-full px-2 gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
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
                      Due: <span className={isOverdue(task.dueDateTime) ? 'text-red-600 font-semibold' : ''}>{formatDateTime(task.dueDateTime)}</span>{' '}
                      <span className="ml-0 md:ml-10">
                        {task.updatedAt ? `Updated: ${formatDateTime(task.updatedAt)}` : `Created: ${formatDateTime(task.createdAt)}`}
                      </span>
                    </p>
                  </div>

                  {/* Edit / Delete */}
                  <div className="flex w-fit items-center gap-3 self-end md:self-center">
                    <button onClick={() => editTask(index)}>
                      <HugeiconsIcon icon={PropertyEditIcon} />
                    </button>
                    <button onClick={() => confirmDeleteTask(index)}>
                      <HugeiconsIcon icon={Delete02Icon} color="red" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainPage;