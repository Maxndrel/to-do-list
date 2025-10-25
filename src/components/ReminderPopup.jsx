import React from 'react';

/**
 * ReminderPopup Component
 * Displays reminder notifications for tasks
 */
const ReminderPopup = ({ reminder, setReminder }) => {
  if (!reminder.show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <h2 className="text-xl text-center font-semibold mb-4">
          {reminder.type === 'due' ? '⚠️ Task Due' : '⏰ Reminder'}
        </h2>
        <p className="text-center mb-6">
          {reminder.type === 'due'
            ? `Your task "${reminder.task.title}" is now due!`
            : `Your task "${reminder.task.title}" is due in 5 minutes!`
          }
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => setReminder({ show: false, task: null, type: 'reminder' })}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderPopup;
