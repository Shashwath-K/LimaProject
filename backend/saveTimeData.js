// backend/saveTimeData.js

import express, { json } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createObjectCsvWriter as csvWriter } from 'csv-writer';
const app = express();
const PORT = 3001;

app.use(json());

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
