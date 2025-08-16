import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const DayEditor = ({ dayName, tasks, updateTasks, onBack, month, year }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddTask = () => {
        const newTask = {
            id: Date.now(),
            task: '',
            startTime: '',
            endTime: '',
            level: 'Default',
            customLevel: '',
        };
        updateTasks([...tasks, newTask]);
    };

    const handleRemoveTask = (taskId) => {
        updateTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleInputChange = (taskId, field, value) => {
        updateTasks(
            tasks.map(task => {
                if (task.id === taskId) {
                    const updatedTask = { ...task, [field]: value };
                    if (field === 'level' && value !== 'Custom') {
                        updatedTask.customLevel = '';
                    }
                    return updatedTask;
                }
                return task;
            })
        );
    };

    const handleSaveAndReturn = async () => {
        if (!year || isNaN(parseInt(year)) || year < 1900) {
            setErrorMessage('A valid year must be entered on the previous screen.');
            return;
        }
        setIsSaving(true);
        setErrorMessage('');
        try {
            const tasksToSave = tasks.map(({ id, ...taskData }) => ({ day: dayName, ...taskData }));
            await axios.put('http://localhost:3001/timetables/update', {
                month,
                year,
                weeklyData: tasksToSave,
            });
            onBack();
        } catch (error) {
            console.error("Failed to save day's schedule:", error);
            setErrorMessage('Failed to save schedule. Please check your connection and try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="text-white bg-gray-800 p-8 rounded-lg w-full max-w-5xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Editing <span className="text-cyan-300">{dayName}</span></h2>
                <button onClick={handleAddTask} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">
                    <FaPlus size={14} /> Add Task
                </button>
            </div>

            <div className="space-y-3">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div key={task.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-gray-700/50 p-3 rounded-lg">
                            <input type="text" placeholder="Task Name" value={task.task} onChange={(e) => handleInputChange(task.id, 'task', e.target.value)}
                                className="md:col-span-3 bg-gray-600 rounded p-2 focus:ring-2 focus:ring-cyan-400 outline-none" />
                            
                            <input type="time" value={task.startTime} onChange={(e) => handleInputChange(task.id, 'startTime', e.target.value)}
                                className="md:col-span-2 bg-gray-600 rounded p-2 focus:ring-2 focus:ring-cyan-400 outline-none" />
                            <input type="time" value={task.endTime} onChange={(e) => handleInputChange(task.id, 'endTime', e.target.value)}
                                className="md:col-span-2 bg-gray-600 rounded p-2 focus:ring-2 focus:ring-cyan-400 outline-none" />

                            <select value={task.level} onChange={(e) => handleInputChange(task.id, 'level', e.target.value)}
                                className="md:col-span-2 bg-gray-600 rounded p-2 focus:ring-2 focus:ring-cyan-400 outline-none">
                                <option>Default</option>
                                <option>Priority</option>
                                <option>Travel</option>
                                <option>Custom</option>
                            </select>

                            <div className="md:col-span-2">
                                {task.level === 'Custom' && (
                                    <input type="text" placeholder="Custom Tag" value={task.customLevel} onChange={(e) => handleInputChange(task.id, 'customLevel', e.target.value)}
                                        className="w-full bg-gray-600 rounded p-2 focus:ring-2 focus:ring-cyan-400 outline-none" />
                                )}
                            </div>
                            
                            <button type="button" onClick={() => handleRemoveTask(task.id)}
                                className="md:col-span-1 flex justify-center items-center bg-red-600 hover:bg-red-700 text-white p-2 rounded-md">
                                <FaTrash />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center italic py-4">No tasks scheduled. Click "Add Task" to begin.</p>
                )}
            </div>

            {errorMessage && ( <div className="mt-6 p-3 rounded-lg text-center font-medium bg-red-500/30 text-red-300">{errorMessage}</div> )}

            <div className="flex justify-start items-center mt-8">
                <button onClick={handleSaveAndReturn} disabled={isSaving} className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 disabled:bg-green-800">
                    {isSaving ? 'Saving...' : 'Confirm & Return'}
                </button>
            </div>
        </div>
    );
};

export default DayEditor;

