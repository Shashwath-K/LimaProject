// src/views/AddTaskView.jsx
import React from "react";

const AddTaskView = ({ task, setTask, duration, setDuration, date, setDate, handleAddTask, setView }) => (
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
        <h2 className="text-2xl font-bold mb-4">Add Task or Scheduled Event</h2>
        <div className="flex flex-col gap-4 mb-6">
            <input
                type="text"
                placeholder="Task / Event Name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="p-4 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none"
            />
            <input
                type="text"
                placeholder="Duration (e.g. 1h)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="p-4 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none"
            />
            <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-4 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none"
            />
            <button
                onClick={handleAddTask}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl shadow"
            >
                Save
            </button>
        </div>
        <button onClick={() => setView("menu")} className="text-blue-400 underline">
            ← Back to Menu
        </button>
    </div>
);

export default AddTaskView;
