import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegCalendarAlt, FaStopwatch, FaListUl, FaPlus, FaBars } from "react-icons/fa";
import CardDesign from "./TimeTracker/CardDesign";
import ScheduleView from "./TimeTracker/ScheduleView";
import MenuView from "./TimeTracker/MenuView";
import AddTaskView from "./TimeTracker/AddTaskView";

const TimeTracker = () => {
    const [view, setView] = useState("menu");
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (view === "schedule") {
            fetchData();
        }
    }, [view]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3001/data");
            setEntries(response.data);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
            {view === "menu" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl">
                    <CardDesign
                        title="View Schedule"
                        icon={FaRegCalendarAlt}
                        onClick={() => setView("schedule")}
                    />
                    <CardDesign
                        title="Main Menu"
                        icon={FaBars}
                        onClick={() => setView("mainMenu")}
                    />
                    <CardDesign
                        title="Add Task"
                        icon={FaPlus}
                        onClick={() => setView("addTask")}
                    />
                    <CardDesign
                        title="Start Timer"
                        icon={FaStopwatch}
                        onClick={() => alert("Timer logic not implemented")}
                    />
                    <CardDesign
                        title="Data Entry"
                        icon={FaListUl}
                        onClick={() => alert("Data Entry logic not implemented")}
                    />
                </div>
            )}

            {view === "schedule" && (
                <ScheduleView entries={entries} loading={loading} setView={setView} />
            )}
            {view === "mainMenu" && <MenuView setView={setView} />}
            {view === "addTask" && <AddTaskView setView={setView} />}
        </div>
    );
};

export default TimeTracker;
