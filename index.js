const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const port = process.env.PORT || 5000;



/**
 * ________________________________________
 *        MIDDDLE WARE
 * __________________________________________
 */

app.use(express.static("public"));



app.use(express.json());
app.use(cookieParser());

/**
 * --------------------------------------------------
 *                    CORS 
 * -------------------------------------------------
 */
const corsOptions = {
    origin: [
        'http://192.168.0.102:5173',
        'http://192.168.0.102:5174',
        'http://192.168.0.102:5175',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:3000',
    ],
    credentials: true,
};

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', corsOptions.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Use the CORS middleware
app.use(cors(corsOptions));

//---------------------------------------------------------------------------------------







//---------------------routes import---------------------------------------------------
const CandidateDataRoutes = require('./Routes/CandidateData.Routes');
const DasboardRoutes = require('./Routes/Dashboard.Routes')

// Use the route modules
app.use('/ayykori', CandidateDataRoutes); // routes for candidate data
app.use('/ayykori',DasboardRoutes) ; //routes for dashboard data






app.get('/', (req, res) => {
    res.send('ayykori-hr-recruitement');
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error err req res next');
});


app.listen(port, () => {
    console.log('Server is running on port', port);
});