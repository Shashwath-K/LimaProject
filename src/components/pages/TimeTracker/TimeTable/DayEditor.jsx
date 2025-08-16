import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const DayEditor = ({ dayName, tasks, updateTasks, onBack }) => {

    // Adds a new, empty task slot to the current day
    const handleAddTask = () => {
        const newTask = {
            id: Date.now(), // Unique ID for React key and removal logic
            task: '',
            startTime: '',
            endTime: '',
        };
        updateTasks([...tasks, newTask]);
    };

    // Removes a task, identified by its unique ID
    const handleRemoveTask = (taskId) => {
        updateTasks(tasks.filter(task => task.id !== taskId));
    };

    // Handles input changes for a specific task
    const handleInputChange = (taskId, field, value) => {
        updateTasks(
            tasks.map(task =>
                task.id === taskId ? { ...task, [field]: value } : task
            )
        );
    };

    return (
        <div className="text-white bg-gray-800 p-8 rounded-lg w-full max-w-4xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                    Editing Timetable for <span className="text-cyan-300">{dayName}</span>
                </h2>
                <button
                    onClick={handleAddTask}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                    <FaPlus size={14} /> Add Task
                </button>
            </div>

            {/* Task Input Rows */}
            <div className="space-y-3">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div key={task.id} className="grid grid-cols-1 md:grid-cols-10 gap-3 items-center bg-gray-700/50 p-3 rounded-lg">
                            <input
                                type="text"
                                placeholder="Task Name"
                                value={task.task}
                                onChange={(e) => handleInputChange(task.id, 'task', e.target.value)}
                                className="md:col-span-4 bg-gray-600 rounded p-2 placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 outline-none"
                            />
                            <input
                                type="time"
                                value={task.startTime}
                                onChange={(e) => handleInputChange(task.id, 'startTime', e.target.value)}
                                className="md:col-span-2 bg-gray-600 rounded p-2 focus:ring-2 focus:ring-cyan-400 outline-none"
                            />
                            <input
                                type="time"
                                value={task.endTime}
                                onChange={(e) => handleInputChange(task.id, 'endTime', e.target.value)}
                                className="md:col-span-2 bg-gray-600 rounded p-2 focus:ring-2 focus:ring-cyan-400 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveTask(task.id)}
                                className="md:col-span-2 flex justify-center items-center bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition-colors"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center italic py-4">No tasks scheduled for {dayName}. Click "Add Task" to begin.</p>
                )}
            </div>

            {/* Back Button */}
            <div className="mt-8">
                <button
                    onClick={onBack}
                    className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors"
                >
                    &larr; Back to Week Overview
                </button>
            </div>
        </div>
    );
};

export default DayEditor;
