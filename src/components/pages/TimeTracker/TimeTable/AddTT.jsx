import React, { useState } from 'react';
import axios from 'axios';
import DayEditor from './DayEditor'; // <-- Import the new component

const AddTT = ({ setTimeTableView }) => {
    const [month, setMonth] = useState('January');
    const [year, setYear] = useState(new Date().getFullYear());

    const initialDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const initialWeeklyData = initialDays.reduce((acc, day) => ({ ...acc, [day]: [] }), {});
    
    const [weeklyData, setWeeklyData] = useState(initialWeeklyData);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    // State to manage which day is being edited. If null, show the main list.
    const [editingDay, setEditingDay] = useState(null);

    // This function is passed to DayEditor to update the main state
    const updateTasksForDay = (day, newTasks) => {
        setWeeklyData(prevData => ({
            ...prevData,
            [day]: newTasks,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', content: '' });

        const payload = Object.entries(weeklyData).flatMap(([day, tasks]) => 
            tasks.filter(task => task.task.trim()).map(task => ({
                day,
                task: task.task,
                startTime: task.startTime,
                endTime: task.endTime,
            }))
        );

        if (payload.length === 0) {
            setMessage({ type: 'error', content: 'Please add at least one task.' });
            setIsLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:3001/timetables/save', { month, year, weeklyData: payload });
            setMessage({ type: 'success', content: 'Timetable saved successfully!' });
            setWeeklyData(initialWeeklyData);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred.';
            setMessage({ type: 'error', content: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // If a day is being edited, render the DayEditor component
    if (editingDay) {
        return (
            <DayEditor
                dayName={editingDay}
                tasks={weeklyData[editingDay]}
                updateTasks={newTasks => updateTasksForDay(editingDay, newTasks)}
                onBack={() => setEditingDay(null)} // Function to return to the main list
            />
        );
    }

    // Otherwise, render the main dashboard view
    return (
        <div className="text-white bg-gray-800 p-8 rounded-lg w-full max-w-4xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Weekly Timetable</h2>
            
            <form onSubmit={handleSubmit}>
                {/* Month/Year Selection */}
                <div className="flex justify-center items-center gap-4 mb-8">
                    {/* Month and year inputs remain the same as before */}
                </div>

                {/* Days List with Progress Bars */}
                <div className="space-y-4">
                    {initialDays.map(day => {
                        const taskCount = weeklyData[day].filter(t => t.task.trim()).length;
                        const progress = Math.min((taskCount / 5) * 100, 100); // Progress bar caps at 5 tasks for visual clarity

                        return (
                            <div key={day} className="bg-gray-700/50 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex-grow">
                                    <h3 className="font-bold text-xl text-cyan-300">{day}</h3>
                                    <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                                        <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{taskCount} task{taskCount !== 1 ? 's' : ''} added</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setEditingDay(day)}
                                    className="ml-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg transition-colors"
                                >
                                    View / Edit
                                </button>
                            </div>
                        );
                    })}
                </div>
                
                {/* Message Display & Action Buttons */}
                {message.content && (
                    <div className={`mt-6 p-4 rounded-lg text-center ${message.type === 'success' ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'}`}>
                        {message.content}
                    </div>
                )}
                <div className="flex items-center justify-between mt-8">
                    <button type="button" onClick={() => setTimeTableView('menu')} className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors">Back to Menu</button>
                    <button type="submit" disabled={isLoading} className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-800">
                        {isLoading ? 'Saving...' : 'Save Full Timetable'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTT;
