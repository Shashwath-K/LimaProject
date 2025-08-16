import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayEditor from './DayEditor';
import { FaCopy } from 'react-icons/fa';

// --- The Modal component now lives inside AddTT ---
const CopyScheduleModal = ({ isOpen, onClose, currentDay, weeklyData, onConfirm }) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [isCopying, setIsCopying] = useState(false);
    const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const availableDays = allDays.filter(day => day !== currentDay);

    const handleCheckboxChange = (day) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleConfirm = async () => {
        setIsCopying(true);
        await onConfirm(selectedDays);
        setIsCopying(false);
        onClose();
        setSelectedDays([]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md shadow-xl border border-gray-600">
                <h3 className="text-2xl font-bold mb-4">Copy from <span className="text-cyan-300">{currentDay}</span> to...</h3>
                <div className="space-y-3 my-6">
                    {availableDays.map(day => {
                        const isDisabled = weeklyData[day]?.length > 0;
                        return (
                            <label key={day} className={`flex items-center p-3 rounded-lg transition-colors ${isDisabled ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700/50 hover:bg-gray-700 cursor-pointer'}`}>
                                <input type="checkbox" disabled={isDisabled} checked={selectedDays.includes(day)} onChange={() => handleCheckboxChange(day)} className="w-5 h-5 rounded text-blue-500 bg-gray-600 border-gray-500 focus:ring-blue-600 disabled:opacity-50" />
                                <span className="ml-3 text-lg">{day}</span>
                                {isDisabled && <span className="ml-auto text-xs italic">(has tasks)</span>}
                            </label>
                        );
                    })}
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-5 rounded-lg">Cancel</button>
                    <button onClick={handleConfirm} disabled={selectedDays.length === 0 || isCopying} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg disabled:bg-blue-800 disabled:cursor-not-allowed">
                        {isCopying ? 'Copying...' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
};


const AddTT = ({ setTimeTableView }) => {
    const [month, setMonth] = useState('January');
    const [year, setYear] = useState(new Date().getFullYear());
    const [weeklyData, setWeeklyData] = useState({});
    const [message, setMessage] = useState({ type: '', content: '' });
    const [editingDay, setEditingDay] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    
    // --- State for the copy modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dayToCopyFrom, setDayToCopyFrom] = useState(null);

    const initialDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        const fetchTimetableData = async () => {
            if (!year || isNaN(parseInt(year))) {
                setWeeklyData(initialDays.reduce((acc, day) => ({ ...acc, [day]: [] }), {}));
                return;
            }
            setIsFetching(true);
            setMessage({ type: '', content: '' });
            try {
                const response = await axios.get(`http://localhost:3001/timetables/${year}/${month}`);
                const groupedData = initialDays.reduce((acc, day) => ({ ...acc, [day]: [] }), {});
                response.data.forEach(task => {
                    if (groupedData[task.day]) {
                        groupedData[task.day].push({ ...task, id: Date.now() + Math.random() });
                    }
                });
                setWeeklyData(groupedData);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setWeeklyData(initialDays.reduce((acc, day) => ({ ...acc, [day]: [] }), {}));
                } else {
                    setMessage({ type: 'error', content: 'Could not load schedule data.' });
                }
            } finally {
                setIsFetching(false);
            }
        };
        fetchTimetableData();
    }, [month, year]);

    const updateTasksForDay = (day, newTasks) => {
        setWeeklyData(prevData => ({ ...prevData, [day]: newTasks }));
    };

    const getUniqueTasksForDay = (day) => {
        const tasks = weeklyData[day] || [];
        const uniqueTasks = [];
        const taskKeys = new Set();
        tasks.forEach(task => {
            const key = `${task.task}|${task.startTime}|${task.endTime}`;
            if (!taskKeys.has(key)) {
                uniqueTasks.push(task);
                taskKeys.add(key);
            }
        });
        return uniqueTasks;
    };

    // --- Logic for handling the copy action ---
    const handleConfirmCopy = async (targetDays) => {
        if (!dayToCopyFrom || targetDays.length === 0) return;
        
        const sourceTasks = getUniqueTasksForDay(dayToCopyFrom);
        const tasksToSave = [...sourceTasks.map(t => ({...t, day: dayToCopyFrom}))];

        targetDays.forEach(targetDay => {
            const copiedTasks = sourceTasks.map(t => ({ ...t, day: targetDay }));
            tasksToSave.push(...copiedTasks);
        });

        try {
            await axios.put(`http://localhost:3001/timetables/update`, {
                month,
                year,
                weeklyData: tasksToSave.map(({ id, ...rest }) => rest), // Remove client-side ID before sending
            });

            // Update local state to reflect the change
            setWeeklyData(prevData => {
                const newData = { ...prevData };
                targetDays.forEach(day => {
                    newData[day] = sourceTasks.map(t => ({...t, id: Date.now() + Math.random()}));
                });
                return newData;
            });
            setMessage({ type: 'success', content: `Schedule copied to ${targetDays.join(', ')}.` });
        } catch (error) {
            setMessage({ type: 'error', content: 'Failed to copy schedule.' });
        }
    };

    if (editingDay) {
        return (
            <DayEditor
                dayName={editingDay}
                tasks={getUniqueTasksForDay(editingDay)}
                updateTasks={newTasks => updateTasksForDay(editingDay, newTasks)}
                onBack={() => setEditingDay(null)}
                month={month}
                year={year}
            />
        );
    }

    return (
        <>
            <CopyScheduleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentDay={dayToCopyFrom}
                weeklyData={weeklyData}
                onConfirm={handleConfirmCopy}
            />
            <div className="text-white bg-gray-800 p-8 rounded-lg w-full max-w-4xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Add/Edit Weekly Timetable</h2>
                <div>
                    {/* Month/Year Selection */}
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <div className="flex-1">
                            <label htmlFor="month-select" className="block mb-2 text-sm font-medium text-gray-300">Select Month</label>
                            <select id="month-select" value={month} onChange={(e) => setMonth(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="year-input" className="block mb-2 text-sm font-medium text-gray-300">Enter Year</label>
                            <input id="year-input" type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.g., 2025" />
                        </div>
                    </div>

                    {isFetching ? ( <p className="text-center p-10 animate-pulse">Loading schedule...</p> ) : (
                        <div className="space-y-4">
                            {initialDays.map(day => {
                                const taskCount = getUniqueTasksForDay(day).length;
                                const progress = Math.min((taskCount / 5) * 100, 100);
                                return (
                                    <div key={day} className="bg-gray-700/50 p-4 rounded-lg flex items-center justify-between">
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-xl text-cyan-300">{day}</h3>
                                            <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2"><div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div></div>
                                            <p className="text-xs text-gray-400 mt-1">{taskCount} unique task{taskCount !== 1 ? 's' : ''} added</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                disabled={taskCount === 0}
                                                onClick={() => { setDayToCopyFrom(day); setIsModalOpen(true); }}
                                                className="ml-6 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
                                                title="Copy this day's schedule"
                                            >
                                                <FaCopy />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditingDay(day)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg"
                                            >
                                                View / Edit
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    
                    {message.content && ( <div className={`mt-6 p-4 rounded-lg text-center ${message.type === 'success' ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'}`}>{message.content}</div> )}
                    <div className="flex items-center justify-start mt-8">
                        <button type="button" onClick={() => setTimeTableView('menu')} className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-500">Back to Menu</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTT;
