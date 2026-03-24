require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path'); // <-- הוספנו את זה

const app = express();
const port = process.env.PORT || 10000; // Render מעדיף 10000

app.use(cors());

// --- הוספנו את השורה הזו כדי שהשרת יכיר את הקבצים של React ---
app.use(express.static(__dirname)); 

app.get('/api/services', async (req, res) => {
    try {
        const apiKey = process.env.RENDER_API_KEY;
        const response = await axios.get('https://api.render.com/v1/services?limit=20', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json'
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error("Error from Render API:", err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Error fetching services', details: err.message });
    }
});

// --- שינינו את הנתיב הראשי כדי שיציג את דף ה-React ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Node app listening at http://localhost:${port}`);
});