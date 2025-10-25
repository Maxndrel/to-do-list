import React from 'react';

/**
 * ConfirmDeleteDialog Component
 * Displays a confirmation dialog for deleting tasks
 */
const ConfirmDeleteDialog = ({ confirmDelete, setConfirmDelete, deleteTask }) => {
  if (!confirmDelete.show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <h2 className="text-xl text-center font-semibold mb-4">Confirm Delete</h2>
        <p className="text-center mb-6">Are you sure you want to delete this task?</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={deleteTask}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={() => setConfirmDelete({ show: false, index: null })}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
