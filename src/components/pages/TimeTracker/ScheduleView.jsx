// src/views/ScheduleView.jsx
import React from "react";

const ScheduleView = ({ entries, loading, setView }) => (
    <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
        <h2 className="text-2xl font-bold mb-4">Monthly Schedule View</h2>
        {loading ? (
            <p>Loading schedule...</p>
        ) : (
            <div className="overflow-auto max-h-[500px]">
                <table className="w-full text-white">
                    <thead className="bg-white/10 sticky top-0">
                        <tr>
                            <th className="p-4 text-left">Task/Event</th>
                            <th className="p-4 text-left">Duration</th>
                            <th className="p-4 text-left">Date & Time</th>
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
        )}
        <button onClick={() => setView("menu")} className="text-blue-400 underline mt-4">
            ← Back to Menu
        </button>
    </div>
);

export default ScheduleView;
