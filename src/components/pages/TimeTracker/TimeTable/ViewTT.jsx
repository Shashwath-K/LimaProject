import React from 'react';

const ViewTT = ({ setTimeTableView }) => {
    return (
        <div className="text-white bg-gray-800 p-8 rounded-lg w-full max-w-6xl">
            <h2 className="text-3xl font-bold mb-6 text-center">View TimeTable</h2>
            <p className="text-center mb-6">This is where you will see the full calendar view of your monthly schedule.</p>
            <div className="flex justify-center">
                <button
                    onClick={() => setTimeTableView('menu')}
                    className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition-colors"
                >
                    Back to TimeTable Menu
                </button>
            </div>
        </div>
    );
};

export default ViewTT;