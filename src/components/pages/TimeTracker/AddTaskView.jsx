import React, { useState } from 'react';
import axios from 'axios';

const AddTaskView = ({ setView }) => {
    // State to manage the form inputs
    const [task, setTask] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');

    // State for loading and user feedback messages
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    /**
     * Handles the form submission to save a new task.
     */
    const handleAddTask = async () => {
        // Basic validation to ensure all fields are filled
        if (!task || !duration || !date) {
            setMessage({ type: 'error', content: 'Please fill out all fields.' });
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', content: '' });

        try {
            // Send a POST request to the /save endpoint
            const response = await axios.post('http://localhost:3001/save', {
                task,
                duration,
                timestamp: date, // The backend expects this field as 'timestamp'
            });

            if (response.status === 200) {
                setMessage({ type: 'success', content: 'Task saved successfully!' });
                // Reset form fields after a successful submission
                setTask('');
                setDuration('');
                setDate('');
            }
        } catch (error) {
            setMessage({ type: 'error', content: 'Failed to save task. Please try again.' });
            console.error("Error saving task:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Add Task or Scheduled Event</h2>
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Task / Event Name"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <input
                    type="text"
                    placeholder="Duration (e.g. 1h 30m)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="p-4 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    style={{ colorScheme: 'dark' }} // Ensures the calendar icon is visible in dark mode
                />
                <button
                    onClick={handleAddTask}
                    disabled={isLoading}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg transition-colors disabled:bg-green-800 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Saving...' : 'Save Task'}
                </button>
            </div>

            {/* Displays success or error messages to the user */}
            {message.content && (
                <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
                    message.type === 'success' ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'
                }`}>
                    {message.content}
                </div>
            )}

            <button onClick={() => setView("menu")} className="text-blue-400 hover:underline w-full text-center mt-6">
                ← Back to Menu
            </button>
        </div>
    );
};

export default AddTaskView;
