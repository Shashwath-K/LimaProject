import React from 'react';

// A small component to render the color-coded task tags, consistent with ViewTT.jsx
const TaskTag = ({ level, customLevel }) => {
    let tagColor = 'bg-gray-500'; let text = level;
    switch (level) {
        case 'Priority': tagColor = 'bg-red-500'; break;
        case 'Travel': tagColor = 'bg-blue-500'; break;
        case 'Custom': tagColor = 'bg-purple-500'; text = customLevel || 'Custom'; break;
        case 'Default': tagColor = 'bg-green-600'; break;
    }
    return <span className={`inline-block text-white text-[10px] font-semibold px-2 py-0.5 rounded-full ${tagColor}`}>{text}</span>;
};

/**
 * This component renders the weekly schedule on a background image,
 * preparing it for export.
 * @param {Object} props - The component props.
 * @param {Object} props.schedule - The weekly schedule data, grouped by day.
 * @param {string} props.weekRange - The formatted date range for the week.
 * @param {Function} props.onClose - Function to close the export view.
 */
const ExportTT = ({ schedule, weekRange, onClose }) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // IMPORTANT: Place 'report_img.png' in your project's `public` folder.
    const backgroundImageUrl = '/report_img.png';

    return (
        // Modal container to overlay the screen
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            
            <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl">
                {/* This is the container that will be exported */}
                <div 
                    id="export-content" 
                    className="relative w-full h-[595px] bg-cover bg-center text-gray-800 p-8 flex flex-col" 
                    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                >
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-gray-700">Weekly Schedule</h1>
                        <h2 className="text-xl font-semibold text-gray-600">{weekRange}</h2>
                    </div>

                    {/* Schedule Grid */}
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 overflow-y-auto pr-2">
                        {daysOfWeek.map(day => {
                            const tasksForDay = schedule[day] || [];
                            return (
                                <div key={day}>
                                    <h3 className="text-lg font-bold text-cyan-700 border-b-2 border-cyan-500 pb-1 mb-2">{day}</h3>
                                    <div className="space-y-2">
                                        {tasksForDay.length > 0 ? (
                                            tasksForDay.map((task, index) => (
                                                <div key={index} className="bg-gray-100/80 p-2 rounded-md flex justify-between items-center">
                                                    <div>
                                                        <p className="font-semibold">{task.task}</p>
                                                        <p className="text-xs text-gray-600">{`${task.startTime} - ${task.endTime}`}</p>
                                                    </div>
                                                    <TaskTag level={task.level} customLevel={task.customLevel} />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">No tasks scheduled.</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Action Buttons (outside the exported content) */}
                <div className="bg-gray-100 p-4 flex justify-end gap-4 rounded-b-lg">
                    <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                        Close
                    </button>
                    <button 
                        onClick={() => alert("Export logic to be added here using a library like html2canvas.")} 
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Download as Image
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportTT;
