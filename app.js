require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // שימוש ב-Axios במקום sdk

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/services', async (req, res) => {
    try {
        const apiKey = process.env.RENDER_API_KEY;
        
        const response = await axios.get('https://api.render.com/v1/services?limit=20', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json'
            }
        });

        res.json(response.data); // החזרת הנתונים ל-React
    } catch (err) {
        console.error("Error from Render API:", err.response ? err.response.data : err.message);
        res.status(500).json({ 
            error: 'Error fetching services from Render',
            details: err.message 
        });
    }
});

// נתיב בדיקה לראות שהשרת למעלה
app.get('/', (req, res) => {
    res.send('Server is running! Try /api/services');
});

app.listen(port, () => {
    console.log(`Node app listening at http://localhost:${port}`);
});