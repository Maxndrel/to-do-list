import { useEffect, useState } from 'react';

/**
 * Custom hook for managing task reminders
 * @param {Array} tasks - Array of tasks
 * @param {Function} setTasks - Function to update tasks
 * @param {Function} saveTasksToStorage - Function to save tasks to storage
 * @returns {Object} - Reminder state and functions
 */
export const useReminders = (tasks, setTasks, saveTasksToStorage) => {
  const [reminder, setReminder] = useState({ show: false, task: null, type: 'reminder' });

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      console.log('Checking reminders at:', now.toLocaleString());
      tasks.forEach((task, index) => {
        if (!task.isDone) {
          const dueDate = new Date(task.dueDateTime);
          const timeDiff = dueDate - now;
          const minutesDiff = timeDiff / (1000 * 60);
          console.log(`Task "${task.title}": due at ${dueDate.toLocaleString()}, minutesDiff: ${minutesDiff}, reminded: ${task.reminded}`);
          if (minutesDiff <= 5 && minutesDiff > 0 && !task.reminded) {
            console.log('Triggering 5-minute reminder for task:', task.title);
            setReminder({ show: true, task, type: 'reminder' });
            // Mark as reminded
            const updatedTasks = [...tasks];
            updatedTasks[index].reminded = true;
            setTasks(updatedTasks);
            saveTasksToStorage(updatedTasks);
          } else if (minutesDiff <= 0 && !task.reminded) {
            console.log('Triggering due reminder for task:', task.title);
            setReminder({ show: true, task, type: 'due' });
            // Mark as reminded to avoid repeated popups
            const updatedTasks = [...tasks];
            updatedTasks[index].reminded = true;
            setTasks(updatedTasks);
            saveTasksToStorage(updatedTasks);
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 30000); // Check every 30 seconds
    // Also check immediately when tasks change
    checkReminders();
    return () => clearInterval(interval);
  }, [tasks, setTasks, saveTasksToStorage]);

  return { reminder, setReminder };
};
