import React from 'react';

const UpdateTT = ({ setTimeTableView }) => {
    return (
        <div className="text-white bg-gray-800 p-8 rounded-lg w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Edit Existing TimeTable</h2>
            <p className="text-center mb-6">This is where you will modify an existing monthly schedule or change specific days.</p>
            <div className="flex justify-center">
                <button
                    onClick={() => setTimeTableView('menu')}
                    className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Back to TimeTable Menu
                </button>
            </div>
        </div>
    );
};

export default UpdateTT;
