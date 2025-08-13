// src/TimeTracker.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import MenuView from "./TimeTracker/MenuView";
import AddTaskView from "./TimeTracker/AddTaskView";
import ScheduleView from "./TimeTracker/ScheduleView";

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
            {view === "menu" && <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}><MenuView setView={setView} /></motion.div>}
            {view === "add" && <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}><AddTaskView task={task} setTask={setTask} duration={duration} setDuration={setDuration} date={date} setDate={setDate} handleAddTask={handleAddTask} setView={setView} /></motion.div>}
            {view === "schedule" && <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}><ScheduleView entries={entries} loading={loading} setView={setView} /></motion.div>}
        </div>
    );
};

export default TimeTracker;
