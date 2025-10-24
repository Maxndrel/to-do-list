// Utility functions for the To-Do List application

/**
 * Formats a date/time string into a readable format
 * @param {string} dateTime - The date/time string to format
 * @returns {string} - Formatted date/time string
 */
export const formatDateTime = (dateTime) => {
  if (!dateTime) return '';
  const date = new Date(dateTime);
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

/**
 * Checks if a task is overdue
 * @param {string} dueDateTime - The due date/time string
 * @returns {boolean} - True if the task is overdue
 */
export const isOverdue = (dueDateTime) => {
  if (!dueDateTime) return false;
  return new Date(dueDateTime) < new Date();
};

/**
 * Returns the CSS class for priority color
 * @param {string} priority - The priority level ('High', 'Medium', 'Low')
 * @returns {string} - CSS class string
 */
export const getPriorityColor = (priority) => {
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

/**
 * Loads tasks from localStorage
 * @returns {Array} - Array of tasks
 */
export const loadTasksFromStorage = () => {
  try {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (Array.isArray(savedTasks)) {
      console.log('Loaded tasks from localStorage:', savedTasks);
      return savedTasks;
    }
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
  }
  return [];
};

/**
 * Saves tasks to localStorage
 * @param {Array} tasksToSave - Array of tasks to save
 */
export const saveTasksToStorage = (tasksToSave) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasksToSave));
    console.log('Successfully saved tasks to localStorage:', tasksToSave);
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};
