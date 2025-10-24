import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { TickDouble03Icon, PropertyEditIcon, Delete02Icon } from '@hugeicons/core-free-icons';
import { formatDateTime, isOverdue, getPriorityColor } from '../utils';

/**
 * TaskItem Component
 * Renders an individual task item with all its details and actions
 */
const TaskItem = ({ task, index, toggleDone, editTask, confirmDeleteTask }) => {
  return (
    <li className="bg-gray-100 p-5 rounded-lg mb-2 flex flex-col md:flex-row gap-4">
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
  );
};

export default TaskItem;
