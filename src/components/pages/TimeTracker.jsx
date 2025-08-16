import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    FaRegCalendarAlt,
    FaStopwatch,
    FaListUl,
    FaPlus,
    FaBars,
    FaTable,         // <-- Added icon for TimeTable
    FaChartBar,      // <-- Added icon for Summary
} from "react-icons/fa";

import CardDesign from "./TimeTracker/CardDesign";
import ScheduleView from "./TimeTracker/ScheduleView";
import MenuView from "./TimeTracker/MenuView";
import AddTaskView from "./TimeTracker/AddTaskView";
// --- You will create these components next ---
import TimeTable from "./TimeTracker/TimeTable";
import Summary from "./TimeTracker/Summary";
// ---------------------------------------------

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
                        title="Add Task"
                        icon={FaPlus}
                        onClick={() => setView("addTask")}
                    />
                    <CardDesign
                        title="View Schedule"
                        icon={FaRegCalendarAlt}
                        onClick={() => setView("schedule")}
                    />
                    {/* --- New TimeTable Card --- */}
                    <CardDesign
                        title="TimeTable"
                        icon={FaTable}
                        onClick={() => setView("timeTable")}
                    />
                    {/* --- New Summary Card --- */}
                    <CardDesign
                        title="Summary"
                        icon={FaChartBar}
                        onClick={() => setView("summary")}
                    />
                    <CardDesign
                        title="Start Timer"
                        icon={FaStopwatch}
                        onClick={() => alert("Timer logic not implemented")}
                    />
                     <CardDesign
                        title="Main Menu"
                        icon={FaBars}
                        onClick={() => setView("mainMenu")}
                    />
                    {/* The original "Data Entry" card can be removed or kept based on your needs */}
                    {/* <CardDesign
                        title="Data Entry"
                        icon={FaListUl}
                        onClick={() => alert("Data Entry logic not implemented")}
                    /> */}
                </div>
            )}

            {view === "schedule" && (
                <ScheduleView entries={entries} loading={loading} setView={setView} />
            )}
            {view === "mainMenu" && <MenuView setView={setView} />}
            {view === "addTask" && <AddTaskView setView={setView} />}

            {/* --- Added conditional rendering for new components --- */}
            {view === "timeTable" && <TimeTable setView={setView} />}
            {view === "summary" && <Summary setView={setView} />}
            {/* -------------------------------------------------------- */}
        </div>
    );
};

export default TimeTracker;