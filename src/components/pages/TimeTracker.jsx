// src/TimeTracker.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import MenuView from "./TimeTracker/MenuView";
import AddTaskView from "./TimeTracker/AddTaskView";
import ScheduleView from "./TimeTracker/ScheduleView";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    hover: { scale: 1.05, boxShadow: "0px 10px 25px rgba(0,0,0,0.2)" }
};

const TimeTracker = () => {
    const [view, setView] = useState("menu");
    const [task, setTask] = useState("");
    const [duration, setDuration] = useState("");
    const [date, setDate] = useState("");
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAddTask = async () => {
        if (!task || !duration) return;
        const timestamp = date ? new Date(date).toISOString() : new Date().toISOString();
        try {
            await axios.post("http://localhost:3001/save", { task, duration, timestamp });
            setEntries([...entries, { task, duration, timestamp }]);
            setTask("");
            setDuration("");
            setDate("");
            setView("menu");
        } catch (err) {
            console.error("Error saving task:", err);
        }
    };

    const loadSchedule = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:3001/data");
            setEntries(res.data);
        } catch (err) {
            console.error("Error fetching schedule:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (view === "schedule") {
            loadSchedule();
        }
    }, [view]);

    return (
        <div className="p-6 max-w-6xl mx-auto text-white">
            <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
                ⏳ Time Tracker Dashboard
            </h1>

            {view === "menu" && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
                >
                    {/* Original 4 cards */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl shadow-lg w-64 h-40 flex flex-col items-center justify-center cursor-pointer transition-all"
                        onClick={() => setView("add")}
                    >
                        <h2 className="text-xl font-semibold mb-2">Add Task</h2>
                        <p className="text-sm opacity-80 text-center">Create a new task with duration and date.</p>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-gradient-to-br from-pink-500 to-red-500 p-6 rounded-2xl shadow-lg w-64 h-40 flex flex-col items-center justify-center cursor-pointer transition-all"
                        onClick={() => setView("schedule")}
                    >
                        <h2 className="text-xl font-semibold mb-2">View Schedule</h2>
                        <p className="text-sm opacity-80 text-center">See your saved tasks and timelines.</p>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg w-64 h-40 flex flex-col items-center justify-center cursor-pointer transition-all"
                        onClick={() => alert("Reports Coming Soon!")}
                    >
                        <h2 className="text-xl font-semibold mb-2">Reports</h2>
                        <p className="text-sm opacity-80 text-center">Analyze productivity over time.</p>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-2xl shadow-lg w-64 h-40 flex flex-col items-center justify-center cursor-pointer transition-all"
                        onClick={() => alert("Settings Coming Soon!")}
                    >
                        <h2 className="text-xl font-semibold mb-2">Settings</h2>
                        <p className="text-sm opacity-80 text-center">Adjust preferences and themes.</p>
                    </motion.div>

                    {/* New Dummy Card 1 */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-2xl shadow-lg w-64 h-40 flex flex-col items-center justify-center cursor-pointer transition-all"
                        onClick={() => alert("Stats Coming Soon!")}
                    >
                        <h2 className="text-xl font-semibold mb-2">Stats</h2>
                        <p className="text-sm opacity-80 text-center">View your performance metrics.</p>
                    </motion.div>

                    {/* New Dummy Card 2 */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-gradient-to-br from-fuchsia-500 to-purple-700 p-6 rounded-2xl shadow-lg w-64 h-40 flex flex-col items-center justify-center cursor-pointer transition-all"
                        onClick={() => alert("Calendar Coming Soon!")}
                    >
                        <h2 className="text-xl font-semibold mb-2">Calendar</h2>
                        <p className="text-sm opacity-80 text-center">Check your upcoming events.</p>
                    </motion.div>
                </motion.div>
            )}

            {view === "add" && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                    <AddTaskView
                        task={task}
                        setTask={setTask}
                        duration={duration}
                        setDuration={setDuration}
                        date={date}
                        setDate={setDate}
                        handleAddTask={handleAddTask}
                        setView={setView}
                    />
                </motion.div>
            )}

            {view === "schedule" && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                    <ScheduleView entries={entries} loading={loading} setView={setView} />
                </motion.div>
            )}
        </div>
    );
};

export default TimeTracker;
