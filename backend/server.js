require('dotenv').config();
const express = require('express');
const { connectDB } = require('./dbConfig');
const campusRoutes = require('./Routes/campus.routes')

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.get('/', (req, res) => {
    res.send('BONJOUR ET BIENVENUE');
});

// CORS CONFIGURATION
const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOption));

// Pour accepter du JSON dans les requêtes
app.use(express.json());


app.use('/api/campus', campusRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
