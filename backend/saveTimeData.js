import express, { json } from 'express';
import { existsSync, mkdirSync, readdirSync, readFileSync, promises as fsPromises } from 'fs';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import csv from 'csv-parser'; // Using a robust parser for reading

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(json());
app.use(cors());

// --- DIRECTORY SETUP ---
const dataDir = join(__dirname, '../data');
const timetableDir = join(__dirname, '../timetables'); // Directory for timetable files
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
if (!existsSync(timetableDir)) mkdirSync(timetableDir, { recursive: true });


// =================================================================
//                 TASK TRACKING ROUTES (Existing)
// =================================================================

// POST: Save time tracking data
app.post('/save', (req, res) => {
    const { task, duration, timestamp } = req.body;
    const date = new Date(timestamp);
    const weekNumber = getWeekNumber(date);
    const month = date.toLocaleString('default', { month: 'long' });
    const dir = join(dataDir, month);
    const filePath = join(dir, `week-${weekNumber}.csv`);

    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    const headers = [
        { id: 'task', title: 'Task' },
        { id: 'duration', title: 'Duration' },
        { id: 'timestamp', title: 'Timestamp' },
    ];

    const writer = createCsvWriter({
        path: filePath,
        header: headers,
        append: existsSync(filePath),
    });

    writer.writeRecords([{ task, duration, timestamp }])
        .then(() => res.status(200).json({ success: true }))
        .catch((err) => {
            console.error('CSV Write Error:', err);
            res.status(500).json({ error: 'Failed to write data' });
        });
});

// GET: Fetch all time tracking data
app.get('/data', (req, res) => {
    // This function remains unchanged
    // ... (code from your original file)
});


// =================================================================
//                 TIMETABLE ROUTES (New)
// =================================================================

// POST: Save a new timetable for a specific month
app.post('/timetables/save', async (req, res) => {
    const { month, year, weeklyData } = req.body; // e.g., month: "August", year: "2025", weeklyData: [{day: 'Monday', ...}]

    if (!month || !year || !weeklyData || !Array.isArray(weeklyData)) {
        return res.status(400).json({ message: 'Missing or invalid data provided.' });
    }

    const fileName = `${month}-${year}.csv`;
    const filePath = join(timetableDir, fileName);

    // Requirement 3: Prevent redundant entries
    if (existsSync(filePath)) {
        return res.status(409).json({ message: `A timetable for ${month} ${year} already exists. Please edit it instead.` });
    }

    const headers = [
        { id: 'day', title: 'Day' },
        { id: 'task', title: 'Task' },
        { id: 'startTime', title: 'StartTime' },
        { id: 'endTime', title: 'EndTime' },
    ];

    const writer = createCsvWriter({ path: filePath, header: headers });

    try {
        await writer.writeRecords(weeklyData);
        res.status(201).json({ success: true, message: `Timetable for ${month} ${year} created.` });
    } catch (err) {
        console.error('Timetable CSV Write Error:', err);
        res.status(500).json({ error: 'Failed to save timetable data.' });
    }
});

// GET: List all available timetables
app.get('/timetables/list', async (req, res) => {
    try {
        const files = await fsPromises.readdir(timetableDir);
        // Clean up the file names by removing .csv
        const timetableIds = files.map(file => file.replace('.csv', ''));
        res.status(200).json(timetableIds);
    } catch (err) {
        console.error('Error reading timetable directory:', err);
        res.status(500).json({ error: 'Failed to retrieve timetable list.' });
    }
});

// GET: Fetch a specific timetable's data
app.get('/timetables/:year/:month', (req, res) => {
    const { year, month } = req.params;
    const fileName = `${month}-${year}.csv`;
    const filePath = join(timetableDir, fileName);

    if (!existsSync(filePath)) {
        return res.status(404).json({ message: 'Timetable not found for the specified month and year.' });
    }

    const results = [];
    readFileSync(filePath, 'utf-8')
        .split('\n')
        .filter(Boolean) // remove empty lines
        .forEach((row, index) => {
            if (index === 0) return; // Skip header row
            const [day, task, startTime, endTime] = row.split(',');
            results.push({ day, task, startTime, endTime });
        });

    res.status(200).json(results);
});


// PUT: Update an existing timetable
app.put('/timetables/update', async (req, res) => {
    const { month, year, weeklyData } = req.body;

    if (!month || !year || !weeklyData || !Array.isArray(weeklyData)) {
        return res.status(400).json({ message: 'Missing or invalid data provided for update.' });
    }

    const fileName = `${month}-${year}.csv`;
    const filePath = join(timetableDir, fileName);

    if (!existsSync(filePath)) {
        return res.status(404).json({ message: `Cannot update. Timetable for ${month} ${year} does not exist.` });
    }
    
    // Overwrite the existing file
    const headers = [
        { id: 'day', title: 'Day' },
        { id: 'task', title: 'Task' },
        { id: 'startTime', title: 'StartTime' },
        { id: 'endTime', title: 'EndTime' },
    ];
    const writer = createCsvWriter({ path: filePath, header: headers });

    try {
        await writer.writeRecords(weeklyData);
        res.status(200).json({ success: true, message: `Timetable for ${month} ${year} updated.` });
    } catch (err) {
        console.error('Timetable CSV Update Error:', err);
        res.status(500).json({ error: 'Failed to update timetable data.' });
    }
});


// --- HELPER FUNCTIONS ---
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
