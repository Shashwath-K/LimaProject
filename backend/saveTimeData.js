// backend/saveTimeData.js

import express, { json } from 'express';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'fs';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createObjectCsvWriter as csvWriter } from 'csv-writer';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(json());
app.use(cors());

// POST: Save time tracking data
app.post('/save', (req, res) => {
    const { task, duration, timestamp } = req.body;
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

    const writer = csvWriter({
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
    const dataDir = join(__dirname, '../data');
    if (!existsSync(dataDir)) {
        return res.json([]); // No data yet
    }

    try {
        const months = readdirSync(dataDir);
        let allData = [];

        months.forEach(month => {
            const monthDir = join(dataDir, month);
            const files = readdirSync(monthDir);

            files.forEach(file => {
                const filePath = join(monthDir, file);
                const content = readFileSync(filePath, 'utf-8');
                const rows = content.split('\n').filter(Boolean);
                const headers = rows.shift().split(',');
                rows.forEach(row => {
                    const values = row.split(',');
                    let obj = {};
                    headers.forEach((h, i) => obj[h] = values[i]);
                    allData.push(obj);
                });
            });
        });

        res.json(allData);
    } catch (err) {
        console.error('Error reading data:', err);
        res.status(500).json({ error: 'Failed to read data' });
    }
});

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
