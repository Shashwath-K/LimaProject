import React, { useState } from 'react';
import { FaCalendarCheck, FaEye } from 'react-icons/fa';
import AddTT from './TimeTable/AddTT';
import ViewTT from './TimeTable/ViewTT';

const TimeTable = ({ setView: setMainView }) => {
    // State to manage which view is active: 'menu', 'add_edit', or 'view'
    const [timeTableView, setTimeTableView] = useState('menu');

    /**
     * A styled card component for the menu options.
     */
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

    /**
     * Renders the active view based on the component's state.
     */
    const renderView = () => {
        switch (timeTableView) {
            case 'add_edit':
                // The AddTT component handles both adding and editing schedules.
                return <AddTT setTimeTableView={setTimeTableView} />;
            case 'view':
                return <ViewTT setTimeTableView={setTimeTableView} />;
            case 'menu':
            default:
                // This is the main dashboard view with menu options.
                return (
                    <div className="w-full max-w-4xl text-center animate-fade-in mt-8">
                        <h1 className="text-5xl font-bold text-white mb-4">
                            Timetable Dashboard
                        </h1>
                        <p className="text-gray-300 mb-12 text-lg">
                            Create, modify, and view your weekly schedules.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <MenuCard
                                title="Add / Edit Schedule"
                                description="Create a new weekly template or modify an existing one for any month."
                                icon={FaCalendarCheck}
                                onClick={() => setTimeTableView('add_edit')}
                            />
                            <MenuCard
                                title="View Timetable"
                                description="See your weekly schedule applied to a calendar or weekly view."
                                icon={FaEye}
                                onClick={() => setTimeTableView('view')}
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full flex flex-col items-center px-4">
            <div className="w-full max-w-4xl">
                <button
                    onClick={() => setMainView('menu')}
                    // --- FIX: Removed mb-8 from parent, added small mb-4 to button ---
                    className="bg-gray-700/80 text-white py-2 px-5 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 mb-4"
                >
                    &larr;
                    <span className="hidden sm:inline">Back to Main Menu</span>
                </button>
            </div>
            {renderView()}
        </div>
    );
};

export default TimeTable;
