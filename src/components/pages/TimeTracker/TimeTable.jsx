import React, { useState } from 'react';
import { FaPlus, FaEdit, FaEye } from 'react-icons/fa';
import CardDesign from './CardDesign'; // Assuming CardDesign is in the same folder
import AddTT from './TimeTable/AddTT';
import UpdateTT from './TimeTable/UpdateTT';
import ViewTT from './TimeTable/ViewTT';

const TimeTable = ({ setView: setMainView }) => {
    // State to manage which view is active within the TimeTable feature
    const [timeTableView, setTimeTableView] = useState('menu');

    const renderView = () => {
        switch (timeTableView) {
            case 'add':
                return <AddTT setTimeTableView={setTimeTableView} />;
            case 'edit':
                return <UpdateTT setTimeTableView={setTimeTableView} />;
            case 'view':
                return <ViewTT setTimeTableView={setTimeTableView} />;
            case 'menu':
            default:
                return (
                    <div className="w-full max-w-5xl text-center">
                        <h1 className="text-4xl font-bold text-white mb-12">TimeTable Options</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            <CardDesign
                                title="Add TimeTable"
                                icon={FaPlus}
                                onClick={() => setTimeTableView('add')}
                            />
                            <CardDesign
                                title="Edit TimeTable"
                                icon={FaEdit}
                                onClick={() => setTimeTableView('edit')}
                            />
                            <CardDesign
                                title="View TimeTable"
                                icon={FaEye}
                                onClick={() => setTimeTableView('view')}
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Back button to return to the main TimeTracker menu */}
            <div className="w-full max-w-5xl mb-8">
                <button
                    onClick={() => setMainView('menu')}
                    className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    &larr; Back to Main Menu
                </button>
            </div>
            {renderView()}
        </div>
    );
};

export default TimeTable;
