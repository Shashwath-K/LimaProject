import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaCalendarDay, FaTh, FaThList } from 'react-icons/fa';

// Helper function to get the start of the week (Monday) for a given date
const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
};

const ViewTT = ({ setTimeTableView }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [schedule, setSchedule] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isGridView, setIsGridView] = useState(true); // State for layout toggle

    const startOfWeek = getStartOfWeek(currentDate);
    const month = startOfWeek.toLocaleString('default', { month: 'long' });
    const year = startOfWeek.getFullYear();

    // Fetch data whenever the displayed month/year changes
    useEffect(() => {
        const fetchSchedule = async () => {
            setIsLoading(true);
            setMessage('');
            try {
                const response = await axios.get(`http://localhost:3001/timetables/${year}/${month}`);
                
                // --- FIX: De-duplicate tasks to get the base template ---
                const scheduleByDay = {};
                const uniqueTaskKeys = {};

                response.data.forEach(task => {
                    if (!scheduleByDay[task.day]) {
                        scheduleByDay[task.day] = [];
                        uniqueTaskKeys[task.day] = new Set();
                    }
                    const taskKey = `${task.task}|${task.startTime}|${task.endTime}`;
                    if (!uniqueTaskKeys[task.day].has(taskKey)) {
                        scheduleByDay[task.day].push(task);
                        uniqueTaskKeys[task.day].add(taskKey);
                    }
                });
                setSchedule(scheduleByDay);

            } catch (error) {
                setMessage(error.response?.status === 404 ? `No schedule found for ${month} ${year}.` : 'Error fetching schedule data.');
                setSchedule({});
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchedule();
    }, [month, year]);

    const changeWeek = (offset) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + (7 * offset));
            return newDate;
        });
    };

    const handleDateChange = (e) => {
        const [year, month, day] = e.target.value.split('-').map(Number);
        setCurrentDate(new Date(year, month - 1, day, 12));
    };

    const renderWeek = () => {
        const weekDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + i);
            return date;
        });

        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const today = new Date();

        return weekDates.map((date, index) => {
            const dayName = daysOfWeek[index];
            const tasksForDay = schedule[dayName] || [];
            const isToday = today.toDateString() === date.toDateString();
            
            // Common header for both layouts
            const dayHeader = (
                <div className={`text-center mb-2 ${isGridView ? '' : 'md:w-40 md:text-left'}`}>
                    <p className={`font-bold text-lg ${isToday ? 'text-cyan-300' : 'text-white'}`}>{dayName}</p>
                    <p className="text-sm text-gray-400">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
            );

            // Common task rendering logic
            const taskList = (
                <div className={`mt-1 flex-grow ${isGridView ? 'space-y-2 overflow-y-auto' : 'flex flex-wrap gap-2'}`}>
                    {tasksForDay.length > 0 ? tasksForDay.map((task, idx) => (
                        <div key={idx} className={`bg-gray-700 p-2 rounded-md ${isGridView ? '' : 'w-48'}`}>
                            <p className="font-semibold text-white truncate">{task.task}</p>
                            <p className="text-gray-400 text-xs">{`${task.startTime} - ${task.endTime}`}</p>
                            <TaskTag level={task.level} customLevel={task.customLevel} />
                        </div>
                    )) : (
                        <div className={`text-gray-500 text-sm ${isGridView ? 'text-center pt-4' : 'self-center'}`}>No Tasks</div>
                    )}
                </div>
            );

            if (isGridView) {
                return (
                    <div key={dayName} className={`border border-gray-700 rounded-lg p-3 flex flex-col ${isToday ? 'bg-cyan-900/50' : 'bg-gray-800'}`}>
                        {dayHeader}
                        {taskList}
                    </div>
                );
            } else {
                return (
                    <div key={dayName} className={`border border-gray-700 rounded-lg p-3 flex flex-col md:flex-row md:items-start gap-4 ${isToday ? 'bg-cyan-900/50' : 'bg-gray-800'}`}>
                        {dayHeader}
                        <div className="border-t md:border-l md:border-t-0 border-gray-600 flex-grow md:pl-4">
                           {taskList}
                        </div>
                    </div>
                );
            }
        });
    };
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const weekRange = `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

    return (
        <div className="text-white bg-gray-900 p-6 rounded-lg w-full max-w-7xl shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <button onClick={() => setTimeTableView('menu')} className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600">&larr; Back to Menu</button>
                <div className="flex items-center gap-2">
                    <button onClick={() => changeWeek(-1)} className="p-3 rounded-full hover:bg-gray-700"><FaChevronLeft /></button>
                    <h2 className="text-2xl font-bold text-center w-64">{weekRange}</h2>
                    <button onClick={() => changeWeek(1)} className="p-3 rounded-full hover:bg-gray-700"><FaChevronRight /></button>
                </div>
                <div className="flex items-center gap-2">
                    <input type="date" onChange={handleDateChange} className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-white" style={{colorScheme: 'dark'}}/>
                    <button onClick={() => setCurrentDate(new Date())} className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg flex items-center gap-2">
                        <FaCalendarDay /> Today
                    </button>
                    {/* --- NEW: Layout Toggle Button --- */}
                    <button onClick={() => setIsGridView(!isGridView)} className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg">
                        {isGridView ? <FaThList title="Switch to List View"/> : <FaTh title="Switch to Grid View"/>}
                    </button>
                </div>
            </div>

            {isLoading ? ( <p className="text-center p-20 text-lg animate-pulse">Loading Schedule...</p> ) : 
             message ? ( <p className="text-center p-20 text-xl text-yellow-400">{message}</p> ) : 
             ( <div className={isGridView ? 'grid grid-cols-1 md:grid-cols-7 gap-4' : 'flex flex-col gap-4'} style={{ minHeight: '65vh' }}>{renderWeek()}</div> )}
        </div>
    );
};

const TaskTag = ({ level, customLevel }) => {
    let tagColor = 'bg-gray-500'; let text = level;
    switch (level) {
        case 'Priority': tagColor = 'bg-red-500'; break;
        case 'Travel': tagColor = 'bg-blue-500'; break;
        case 'Custom': tagColor = 'bg-purple-500'; text = customLevel || 'Custom'; break;
        case 'Default': tagColor = 'bg-green-600'; break;
    }
    return <span className={`mt-1 inline-block text-white text-[10px] font-semibold px-2 py-0.5 rounded-full ${tagColor}`}>{text}</span>;
};

export default ViewTT;
