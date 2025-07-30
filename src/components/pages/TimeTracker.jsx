import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const TimeTracker = () => {
    const [entries, setEntries] = useState([]);
    const [task, setTask] = useState("");
    const [duration, setDuration] = useState("");

    const addEntry = async () => {
        if (!task || !duration) return;

        const newEntry = {
            task,
            duration,
            timestamp: new Date().toISOString(),
        };

        try {
            await axios.post("http://localhost:3001/save", newEntry);
            setEntries([...entries, newEntry]);
            setTask("");
            setDuration("");
        } catch (err) {
            console.error("Failed to save entry:", err);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <motion.div
                className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold text-white mb-6">Weekly Time Tracker</h2>

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
                        placeholder="Duration (e.g. 2h)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="flex-1 p-4 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none"
                    />
                    <button
                        onClick={addEntry}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-xl shadow"
                    >
                        Add
                    </button>
                </div>

                <div className="overflow-auto max-h-96">
                    <table className="w-full text-white rounded-xl">
                        <thead className="bg-white/10 rounded-xl">
                            <tr>
                                <th className="p-4 text-left">Task</th>
                                <th className="p-4 text-left">Duration</th>
                                <th className="p-4 text-left">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={index} className="hover:bg-white/5 transition">
                                    <td className="p-4">{entry.task}</td>
                                    <td className="p-4">{entry.duration}</td>
                                    <td className="p-4">{new Date(entry.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default TimeTracker;
