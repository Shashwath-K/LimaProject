import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPlus, FaCalendarAlt, FaSearch, FaChartPie } from "react-icons/fa";

const ICONS = {
    add: <FaPlus size={40} />,
    calendar: <FaCalendarAlt size={40} />,
    search: <FaSearch size={40} />,
    summary: <FaChartPie size={40} />,
};

const Card = ({ title, icon, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/20 cursor-pointer flex flex-col items-center justify-center transition"
    >
        {icon}
        <p className="mt-4 text-white text-lg font-semibold">{title}</p>
    </motion.div>
);

const TimeTracker = () => {
    const [view, setView] = useState("menu");
    const [task, setTask] = useState("");
    const [duration, setDuration] = useState("");
    const [entries, setEntries] = useState([]);

    const handleAddTask = async () => {
        if (!task || !duration) return;

        const now = new Date();
        const timestamp = now.toISOString();

        try {
            await axios.post("http://localhost:3001/save", {
                type: "task",
                task,
                duration,
                timestamp,
            });

            setEntries([...entries, { task, duration, timestamp, type: "task" }]);
            setTask("");
            setDuration("");
        } catch (err) {
            console.error("Error saving task:", err);
        }
    };

    const loadSchedule = async () => {
        // Mocking for now; later we’ll fetch from CSV
        const today = new Date().toISOString();
        setEntries([
            {
                type: "schedule",
                task: "Morning Workout",
                duration: "1h",
                timestamp: today,
            },
            {
                type: "task",
                task: "Client Meeting",
                duration: "2h",
                timestamp: today,
            },
        ]);
    };

    useEffect(() => {
        if (view === "schedule") {
            loadSchedule();
        }
    }, [view]);

    return (
        <div className="p-6 max-w-5xl mx-auto text-white">
            {view === "menu" && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <Card title="Add Task" icon={ICONS.add} onClick={() => setView("add")} />
                    <Card title="View Schedule" icon={ICONS.calendar} onClick={() => setView("schedule")} />
                    <Card title="Search" icon={ICONS.search} onClick={() => alert("Search coming soon!")} />
                    <Card title="Summary" icon={ICONS.summary} onClick={() => alert("Summary coming soon!")} />
                </motion.div>
            )}

            {view === "add" && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20"
                >
                    <h2 className="text-2xl font-bold mb-4">Add Task (Today & Future)</h2>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Task Name"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className="flex-1 p-4 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Duration (e.g. 1h)"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="flex-1 p-4 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none"
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
                </motion.div>
            )}

            {view === "schedule" && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20"
                >
                    <h2 className="text-2xl font-bold mb-4">Monthly Schedule View</h2>
                    <div className="overflow-auto max-h-96">
                        <table className="w-full text-white">
                            <thead className="bg-white/10">
                                <tr>
                                    <th className="p-4 text-left">Type</th>
                                    <th className="p-4 text-left">Task</th>
                                    <th className="p-4 text-left">Duration</th>
                                    <th className="p-4 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((entry, index) => (
                                    <tr key={index} className="hover:bg-white/5 transition">
                                        <td className="p-4 capitalize">{entry.type}</td>
                                        <td className="p-4">{entry.task}</td>
                                        <td className="p-4">{entry.duration}</td>
                                        <td className="p-4">{new Date(entry.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={() => setView("menu")} className="text-blue-400 underline mt-4">
                        ← Back to Menu
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default TimeTracker;
