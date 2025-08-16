import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayEditor from './DayEditor';

const AddTT = ({ setTimeTableView }) => {
    const [month, setMonth] = useState('January');
    const [year, setYear] = useState(new Date().getFullYear());

    const initialDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const initialWeeklyData = initialDays.reduce((acc, day) => ({ ...acc, [day]: [] }), {});
    
    const [weeklyData, setWeeklyData] = useState(initialWeeklyData);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [editingDay, setEditingDay] = useState(null);
    const [isFetching, setIsFetching] = useState(false); // <-- New state for loading

    // --- NEW: useEffect to fetch data when month/year changes ---
    useEffect(() => {
        const fetchTimetableData = async () => {
            // Don't fetch if the year isn't valid
            if (!year || isNaN(parseInt(year))) {
                setWeeklyData(initialWeeklyData); // Reset if year is cleared
                return;
            }

            setIsFetching(true);
            setMessage({ type: '', content: '' }); // Clear previous messages

            try {
                const response = await axios.get(`http://localhost:3001/timetables/${year}/${month}`);
                
                // Group the flat data from the CSV into the structure the component needs
                const groupedData = initialDays.reduce((acc, day) => ({ ...acc, [day]: [] }), {});
                response.data.forEach(task => {
                    if (groupedData[task.day]) {
                        // Add a unique ID for React's key prop and editing logic
                        groupedData[task.day].push({ ...task, id: Date.now() + Math.random() });
                    }
                });
                setWeeklyData(groupedData);

            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // This is expected if no schedule exists yet. Reset to a blank slate.
                    setWeeklyData(initialWeeklyData);
                } else {
                    // Handle actual network or server errors
                    setMessage({ type: 'error', content: 'Could not load schedule data. Please try again.' });
                    console.error("Error fetching timetable:", error);
                }
            } finally {
                setIsFetching(false);
            }
        };

        fetchTimetableData();
    }, [month, year]); // This effect re-runs whenever the month or year changes

    const updateTasksForDay = (day, newTasks) => {
        setWeeklyData(prevData => ({ ...prevData, [day]: newTasks }));
    };

    const handleCopyToDays = (sourceTasks, targetDays) => {
        setWeeklyData(prevData => {
            const newData = { ...prevData };
            targetDays.forEach(day => { newData[day] = sourceTasks; });
            return newData;
        });
        setMessage({type: 'success', content: `Schedule copied to ${targetDays.join(', ')}.`});
    };

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (editingDay) {
        return (
            <DayEditor
                dayName={editingDay}
                tasks={weeklyData[editingDay]}
                updateTasks={newTasks => updateTasksForDay(editingDay, newTasks)}
                onBack={() => {
                    setEditingDay(null);
                    setMessage({ type: '', content: '' });
                }}
                weeklyData={weeklyData}
                onCopyToDays={handleCopyToDays}
                month={month}
                year={year}
            />
        );
    }

    return (
        <div className="text-white bg-gray-800 p-8 rounded-lg w-full max-w-4xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Add/Edit Weekly Timetable</h2>
            
            <div>
                <div className="flex justify-center items-center gap-4 mb-8">
                    <div className="flex-1">
                        <label htmlFor="month-select" className="block mb-2 text-sm font-medium text-gray-300">Select Month</label>
                        <select id="month-select" value={month} onChange={(e) => setMonth(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="year-input" className="block mb-2 text-sm font-medium text-gray-300">Enter Year</label>
                        <input id="year-input" type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.g., 2025" />
                    </div>
                </div>

                {/* --- Conditional rendering for loading state --- */}
                {isFetching ? (
                    <div className="text-center p-10">
                        <p className="text-lg text-gray-400 animate-pulse">Loading schedule for {month} {year}...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {initialDays.map(day => {
                            const taskCount = weeklyData[day]?.filter(t => t.task.trim()).length || 0;
                            const progress = Math.min((taskCount / 5) * 100, 100);

                            return (
                                <div key={day} className="bg-gray-700/50 p-4 rounded-lg flex items-center justify-between">
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-xl text-cyan-300">{day}</h3>
                                        <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                                            <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">{taskCount} task{taskCount !== 1 ? 's' : ''} added</p>
                                    </div>
                                    <button type="button" onClick={() => setEditingDay(day)} className="ml-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg transition-colors">
                                        Add / Edit
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
                
                {message.content && (
                    <div className={`mt-6 p-4 rounded-lg text-center ${message.type === 'success' ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'}`}>
                        {message.content}
                    </div>
                )}
                <div className="flex items-center justify-start mt-8">
                    <button type="button" onClick={() => setTimeTableView('menu')} className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors">
                        Back to Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTT;
