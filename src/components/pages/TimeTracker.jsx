import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    FaRegCalendarAlt,
    FaPlus,
    FaTable,
    FaChartBar,
} from "react-icons/fa";

// --- Sub-components are now defined inside or imported as needed ---
import ScheduleView from "./TimeTracker/ScheduleView";
import AddTaskView from "./TimeTracker/AddTaskView";
import TimeTable from "./TimeTracker/TimeTable";
import Summary from "./TimeTracker/Summary";

// A new, more stylish card component for the main menu
const MenuCard = ({ title, description, icon: Icon, onClick }) => (
    <div
        onClick={onClick}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-cyan-500/20"
    >
        <div className="flex justify-center mb-4">
            <div className="bg-gray-700 p-4 rounded-full">
                <Icon className="text-cyan-400 text-3xl" />
            </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);


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
            // Ensure you have a /data endpoint or change this URL
            const response = await axios.get("http://localhost:3001/data");
            setEntries(response.data);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
        setLoading(false);
    };

    // Main render function
    const renderContent = () => {
        switch (view) {
            case "schedule":
                return <ScheduleView entries={entries} loading={loading} setView={setView} />;
            case "addTask":
                return <AddTaskView setView={setView} />;
            case "timeTable":
                return <TimeTable setView={setView} />;
            case "summary":
                // Assuming you have a placeholder Summary component
                return <Summary setView={setView} />;
            case "menu":
            default:
                return (
                    <div className="w-full max-w-4xl text-center animate-fade-in">
                        <h1 className="text-5xl font-bold text-white mb-4">
                            Time Tracker Dashboard
                        </h1>
                        <p className="text-gray-300 mb-12 text-lg">
                            Select an option to manage your tasks and schedules.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <MenuCard
                                title="Add Task"
                                description="Log a new task or event with its duration and timestamp."
                                icon={FaPlus}
                                onClick={() => setView("addTask")}
                            />
                            <MenuCard
                                title="View Schedule"
                                description="See a list of all your previously logged tasks and events."
                                icon={FaRegCalendarAlt}
                                onClick={() => setView("schedule")}
                            />
                            <MenuCard
                                title="TimeTable"
                                description="Create, edit, and view your weekly schedule templates."
                                icon={FaTable}
                                onClick={() => setView("timeTable")}
                            />
                            <MenuCard
                                title="Summary"
                                description="Get a summarized view of your tasks and priorities."
                                icon={FaChartBar}
                                onClick={() => setView("summary")}
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
            {renderContent()}
        </div>
    );
};

export default TimeTracker;
