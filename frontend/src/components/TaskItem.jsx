import React from 'react';
import Button from './Button';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out transform hover:scale-[1.02] ${task.completed ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task._id, task.completed)}
              className="mr-3 h-5 w-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <div>
              <h3 className={`font-medium text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`mt-1 text-gray-600 dark:text-gray-400 ${task.completed ? 'line-through' : ''}`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;