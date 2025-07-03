import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import Card from '../components/Card';
import TaskItem from '../components/TaskItem';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

const Tasks = () => {
  const { darkMode } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;

    try {
      const response = await createTask({
        ...newTask,
        completed: false
      });
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' });
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    try {
      const response = await updateTask(taskId, { completed: !completed });
      setTasks(tasks.map(task =>
        task._id === taskId ? response.data : task
      ));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'completed' ? task.completed :
      filter === 'active' ? !task.completed : true
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Task Manager</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700"
                placeholder="Task title..."
              />
            </div>
            <div>
              <Button
                onClick={handleAddTask}
                className="w-full h-full"
                disabled={!newTask.title.trim()}
              >
                Add Task
              </Button>
            </div>
          </div>

          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="mt-2 w-full p-3 border rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700"
            placeholder="Description (optional)"
            rows="2"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'active', 'completed'].map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {filter === 'all'
                ? "No tasks yet. Add your first task!"
                : `No ${filter} tasks found.`}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Tasks;