import express, { json } from 'express';
import { existsSync, mkdirSync, readFileSync, promises as fsPromises } from 'fs';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

// --- SETUP ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 3001;
app.use(json());
app.use(cors());

// --- DIRECTORY SETUP ---
const dataDir = join(__dirname, '../data'); // For individual tasks
const timetableDir = join(__dirname, '../timetables'); // For timetable schedules
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
if (!existsSync(timetableDir)) mkdirSync(timetableDir, { recursive: true });

// --- HELPER FUNCTIONS ---
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getDatesForDayInMonth(year, month, targetDay) {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDayIndex = days.indexOf(targetDay);
    const dates = [];
    const date = new Date(year, monthIndex, 1);
    while (date.getMonth() === monthIndex) {
        if (date.getDay() === targetDayIndex) {
            dates.push(new Date(date));
        }
        date.setDate(date.getDate() + 1);
    }
    return dates;
}

// =================================================================
//                 INDIVIDUAL TASK ROUTES (Restored)
// =================================================================
app.post('/save', (req, res) => {
    const { task, duration, timestamp } = req.body;
    const date = new Date(timestamp);
    const weekNumber = getWeekNumber(date);
    const month = date.toLocaleString('default', { month: 'long' });
    const dir = join(dataDir, month);
    const filePath = join(dir, `week-${weekNumber}.csv`);

    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    const writer = createCsvWriter({
        path: filePath,
        header: [
            { id: 'task', title: 'Task' },
            { id: 'duration', title: 'Duration' },
            { id: 'timestamp', title: 'Timestamp' },
        ],
        append: existsSync(filePath),
    });

    writer.writeRecords([{ task, duration, timestamp }])
        .then(() => res.status(200).json({ success: true }))
        .catch((err) => {
            console.error('CSV Write Error:', err);
            res.status(500).json({ error: 'Failed to write data' });
        });
});

// =================================================================
//                 TIMETABLE ROUTES
// =================================================================

app.put('/timetables/update', async (req, res) => {
    const { month, year, weeklyData } = req.body;
    if (!month || !year || !weeklyData || !Array.isArray(weeklyData)) {
        return res.status(400).json({ message: 'Missing or invalid data for update.' });
    }

    const fileName = `${month}-${year}.csv`;
    const filePath = join(timetableDir, fileName);
    
    const tasksByDay = weeklyData.reduce((acc, task) => {
        if (!acc[task.day]) acc[task.day] = [];
        acc[task.day].push(task);
        return acc;
    }, {});

    const expandedData = [];
    for (const dayToUpdate in tasksByDay) {
        const datesForDay = getDatesForDayInMonth(year, month, dayToUpdate);
        const tasksForThisDay = tasksByDay[dayToUpdate];
        
        datesForDay.forEach(date => {
            const weekNum = getWeekNumber(date);
            tasksForThisDay.forEach(task => {
                expandedData.push({
                    week: `Week ${weekNum}`, day: task.day, task: task.task,
                    startTime: task.startTime, endTime: task.endTime, level: task.level,
                    customLevel: task.customLevel || '',
                });
            });
        });
    }

    let existingData = [];
    if (existsSync(filePath)) {
        const fileContent = await fsPromises.readFile(filePath, 'utf-8');
        fileContent.split('\n').filter(Boolean).forEach((row, index) => {
            if (index === 0) return;
            const [week, day, task, startTime, endTime, level, customLevel] = row.split(',');
            existingData.push({ week, day, task, startTime, endTime, level, customLevel });
        });
    }

    const daysToUpdate = Object.keys(tasksByDay);
    const otherDaysData = existingData.filter(row => !daysToUpdate.includes(row.day));
    const finalData = [...otherDaysData, ...expandedData];

    const headers = [
        { id: 'week', title: 'Week' }, { id: 'day', title: 'Day' }, { id: 'task', title: 'Task' },
        { id: 'startTime', title: 'StartTime' }, { id: 'endTime', title: 'EndTime' },
        { id: 'level', title: 'Level' }, { id: 'customLevel', title: 'CustomLevel' },
    ];
    const writer = createCsvWriter({ path: filePath, header: headers });
    try {
        await writer.writeRecords(finalData);
        res.status(200).json({ success: true, message: `Timetable for ${month} ${year} updated.` });
    } catch (err) {
        console.error('Timetable CSV Update Error:', err);
        res.status(500).json({ error: 'Failed to update timetable data.' });
    }
});

app.get('/timetables/:year/:month', (req, res) => {
    const { year, month } = req.params;
    const fileName = `${month}-${year}.csv`;
    const filePath = join(timetableDir, fileName);
    if (!existsSync(filePath)) {
        return res.status(404).json({ message: 'Timetable not found.' });
    }
    const dayTemplates = {};
    readFileSync(filePath, 'utf-8').split('\n').filter(Boolean).forEach((row, index) => {
        if (index === 0) return;
        const [week, day, task, startTime, endTime, level, customLevel] = row.split(',');
        if (!dayTemplates[day]) {
            dayTemplates[day] = [];
        }
        dayTemplates[day].push({ day, task, startTime, endTime, level, customLevel });
    });
    const results = Object.values(dayTemplates).flat();
    res.status(200).json(results);
});

// GET: List all available timetables (Restored)
app.get('/timetables/list', async (req, res) => {
    try {
        const files = await fsPromises.readdir(timetableDir);
        const timetableIds = files.map(file => file.replace('.csv', ''));
        res.status(200).json(timetableIds);
    } catch (err) {
        console.error('Error reading timetable directory:', err);
        res.status(500).json({ error: 'Failed to retrieve timetable list.' });
    }
});

// --- SERVER START ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
