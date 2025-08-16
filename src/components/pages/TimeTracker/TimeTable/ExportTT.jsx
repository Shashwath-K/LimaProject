import React, { useState } from 'react';

// A small component to render the color-coded task tags
const TaskTag = ({ level, customLevel, fontSize }) => {
    let tagColor = 'bg-gray-500'; let text = level;
    switch (level) {
        case 'Priority': tagColor = 'bg-red-500'; break;
        case 'Travel': tagColor = 'bg-blue-500'; break;
        case 'Custom': tagColor = 'bg-purple-500'; text = customLevel || 'Custom'; break;
        case 'Default': tagColor = 'bg-green-600'; break;
    }
    // --- FIX: Changed from inline-block to inline-flex and added items-center ---
    return <span className={`inline-flex items-center text-white font-semibold px-2 py-0.5 rounded-full ${tagColor}`} style={{ fontSize: `${fontSize - 2}px` }}>{text}</span>;
};

const ExportTT = ({ schedule, weekRange, onClose }) => {
    const [exportType, setExportType] = useState('week');
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [layoutStyle, setLayoutStyle] = useState('grid'); // 'grid' or 'list'
    const [headingSize, setHeadingSize] = useState(18);
    const [bodySize, setBodySize] = useState(12);
    const [cardSize, setCardSize] = useState(100); // in pixels
    const [listGridSize, setListGridSize] = useState('4x4'); // '3x3' or '4x4'

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    const imageBackgroundUrl = '/assets/report/report_img.png';
    const pdfBackgroundUrl = '/assets/report/report_img_a4.png'; // Assuming you have this for PDF

    const captureElementAsImage = (element, backgroundUrl) => {
        return new Promise((resolve) => {
            const originalBg = element.style.backgroundImage;
            element.style.backgroundImage = `url(${backgroundUrl})`;
            
            window.html2canvas(element, { useCORS: true, scale: 2, backgroundColor: null })
                .then(canvas => {
                    element.style.backgroundImage = originalBg;
                    resolve(canvas);
                });
        });
    };

    const handleDownloadImage = async () => {
        const exportContent = document.getElementById('export-content');
        if (window.html2canvas && exportContent) {
            const canvas = await captureElementAsImage(exportContent, imageBackgroundUrl);
            const link = document.createElement('a');
            const fileName = exportType === 'week' 
                ? `Timetable - ${weekRange}.png`
                : `Timetable - ${selectedDay}.png`;
            link.download = fileName;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } else {
            alert("Could not export. The html2canvas library is missing or not loaded yet.");
        }
    };

    const handleDownloadPdf = async () => {
        const exportContent = document.getElementById('export-content');
        if (window.html2canvas && window.jspdf && exportContent) {
            const canvas = await captureElementAsImage(exportContent, pdfBackgroundUrl);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new window.jspdf.jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [986, 541] // Match the image dimensions
            });
            pdf.addImage(imgData, 'PNG', 0, 0, 986, 541);
            pdf.save(`Timetable - ${weekRange}.pdf`);
        } else {
            alert("Could not export. A required library (jsPDF or html2canvas) is missing or not loaded yet.");
        }
    };

    const renderContent = () => {
        const daysToRender = exportType === 'week' ? daysOfWeek : [selectedDay];
        const isSingleDay = daysToRender.length === 1;

        if (layoutStyle === 'list') {
            const maxTasks = listGridSize === '4x4' ? 16 : 9;
            const gridCols = listGridSize === '4x4' ? 'grid-cols-4' : 'grid-cols-3';
            const tasksToRender = (schedule[selectedDay] || []).slice(0, maxTasks);

            return (
                <div className="w-full h-full flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="font-bold text-gray-700" style={{ fontSize: `${headingSize + 8}px` }}>{`${selectedDay}'s Schedule`}</h1>
                        <h2 className="font-semibold text-gray-600" style={{ fontSize: `${headingSize}px` }}>{weekRange}</h2>
                    </div>
                    <div className={`flex-grow grid ${gridCols} gap-2 content-start`}>
                        {tasksToRender.map((task, index) => (
                            <div key={index} className="bg-gray-100/80 p-2 rounded-md flex flex-col justify-between aspect-square" style={{ width: `${cardSize}px` }}>
                                <div>
                                    <p className="font-semibold" style={{ fontSize: `${bodySize}px` }}>{task.task}</p>
                                    <p className="text-gray-600" style={{ fontSize: `${bodySize - 2}px` }}>{`${task.startTime} - ${task.endTime}`}</p>
                                </div>
                                <div className="self-end">
                                    <TaskTag level={task.level} customLevel={task.customLevel} fontSize={bodySize} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="font-bold text-gray-700" style={{ fontSize: `${headingSize + 8}px` }}>{isSingleDay ? `${selectedDay}'s Schedule` : 'Weekly Schedule'}</h1>
                    <h2 className="font-semibold text-gray-600" style={{ fontSize: `${headingSize}px` }}>{weekRange}</h2>
                </div>
                <div className={`flex-grow overflow-y-auto pr-2 grid grid-cols-${isSingleDay ? 2 : 4} gap-x-4`}>
                    {daysToRender.map(day => (
                        <div key={day}>
                            <h3 className="font-bold border-b-2 pb-1 mb-2 text-cyan-700 border-cyan-500" style={{ fontSize: `${headingSize}px` }}>{day}</h3>
                            <div className="space-y-1">
                                {(schedule[day] || []).map((task, index) => (
                                    <div key={index} className="bg-gray-100/80 p-1.5 rounded-md flex justify-between items-center" style={{ minHeight: `${cardSize / 2}px` }}>
                                        <div>
                                            <p className="font-semibold" style={{ fontSize: `${bodySize}px` }}>{task.task}</p>
                                            <p className="text-gray-600" style={{ fontSize: `${bodySize - 2}px` }}>{`${task.startTime} - ${task.endTime}`}</p>
                                        </div>
                                        <TaskTag level={task.level} customLevel={task.customLevel} fontSize={bodySize} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" async></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" async></script>
            
            <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div id="export-container" className="relative rounded-lg shadow-2xl" style={{ width: '986px', height: '541px' }}>
                    <div id="export-content" className="w-full h-full bg-cover bg-center text-gray-800 flex flex-col" style={{ backgroundImage: `url(${imageBackgroundUrl})`, padding: '25px 30px 80px 30px' }}>
                        {renderContent()}
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs flex flex-col gap-4">
                    {/* Control Panel with updated inputs */}
                    <div>
                        <label className="font-bold text-white mb-2 block">Export Type</label>
                        <div className="flex bg-gray-700 rounded-lg p-1">
                            <button onClick={() => setExportType('week')} className={`w-1/2 py-2 rounded ${exportType === 'week' ? 'bg-cyan-600' : ''}`}>Week</button>
                            <button onClick={() => setExportType('day')} className={`w-1/2 py-2 rounded ${exportType === 'day' ? 'bg-cyan-600' : ''}`}>Day</button>
                        </div>
                        {exportType === 'day' && <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="w-full bg-gray-700 text-white p-2 mt-2 rounded">{daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}</select>}
                    </div>
                    <div>
                        <label className="font-bold text-white mb-2 block">Layout Style</label>
                        <div className="flex bg-gray-700 rounded-lg p-1">
                            <button onClick={() => setLayoutStyle('grid')} className={`w-1/2 py-2 rounded ${layoutStyle === 'grid' ? 'bg-cyan-600' : ''}`} disabled={exportType === 'week' && layoutStyle === 'list'}>Grid</button>
                            <button onClick={() => setLayoutStyle('list')} className={`w-1/2 py-2 rounded ${layoutStyle === 'list' ? 'bg-cyan-600' : ''}`} disabled={exportType === 'week'}>List</button>
                        </div>
                        {layoutStyle === 'list' && (
                            <div className="flex bg-gray-700 rounded-lg p-1 mt-2">
                                <button onClick={() => setListGridSize('3x3')} className={`w-1/2 py-2 rounded ${listGridSize === '3x3' ? 'bg-cyan-600' : ''}`}>3x3</button>
                                <button onClick={() => setListGridSize('4x4')} className={`w-1/2 py-2 rounded ${listGridSize === '4x4' ? 'bg-cyan-600' : ''}`}>4x4</button>
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="font-bold text-white mb-2 block">Sizing (px)</label>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2"><span className="w-20">Heading</span><input type="number" min="14" max="24" value={headingSize} onChange={e => setHeadingSize(Number(e.target.value))} className="w-full bg-gray-700 text-white p-1 rounded"/></div>
                            <div className="flex items-center gap-2"><span className="w-20">Body</span><input type="number" min="8" max="16" value={bodySize} onChange={e => setBodySize(Number(e.target.value))} className="w-full bg-gray-700 text-white p-1 rounded"/></div>
                            <div className="flex items-center gap-2"><span className="w-20">Card Size</span><input type="number" min="50" max="150" value={cardSize} onChange={e => setCardSize(Number(e.target.value))} className="w-full bg-gray-700 text-white p-1 rounded"/></div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-4 flex flex-col gap-3">
                         <button onClick={handleDownloadImage} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded">Download as Image</button>
                         {exportType === 'week' && <button onClick={handleDownloadPdf} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded">Download as PDF</button>}
                         <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportTT;
