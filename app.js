require('dotenv').config();
const express = require('express');
const sdk = require('api')('@render-api/v1.0#1bmwdf1d2bezs7'); // החבילה שהעתקת מהתיעוד

const app = express();
const port = process.env.PORT || 3000;

// הגדרת ה-API Key
sdk.auth(process.env.RENDER_API_KEY);

app.get('/api/services', async (req, res) => {
    try {
        const { data } = await sdk.getServices({ limit: '20' });
        res.json(data); // החזרת רשימת השירותים כ-JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching services from Render');
    }
});

app.listen(port, () => {
    console.log(`Node app listening at http://localhost:${port}`);
});