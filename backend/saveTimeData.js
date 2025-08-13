// backend/saveTimeData.js

import express from 'express';
import cors from 'cors';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

const app = express();
const PORT = 3001;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());

// Enable CORS for all origins (dev use only)
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

// Routes
app.post('/save', (req, res) => {
    try {
        const { task, duration, timestamp } = req.body;
        if (!task || !duration || !timestamp) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const date = new Date(timestamp);
        const weekNumber = getWeekNumber(date);
        const month = date.toLocaleString('default', { month: 'long' });

        const dir = join(__dirname, '../data', month);
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

    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Helper: Get week number of year
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
