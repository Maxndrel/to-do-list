import React from 'react';

/**
 * TaskForm Component
 * Form for adding or editing tasks
 */
const TaskForm = ({ isOpen, editIndex, title, setTitle, description, setDescription, priority, setPriority, dueDateTime, setDueDateTime, error, handleSubmit, resetForm }) => {
  if (!isOpen) return null;

  return (
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
          onSubmit={handleSubmit}
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
                resetForm();
              }}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
