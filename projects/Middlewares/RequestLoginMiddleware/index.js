const express = require('express');
const app = express();

// Middleware to log incoming requests (simplified)
const infoLogger = (req, res, next) => {
    console.log(`[INFO] Request received: ${req.method} ${req.url}`);
    next();
};

// Middleware to log detailed request information
const debugLogger = (req, res, next) => {
    console.log(`[DEBUG] Request details:
        Method: ${req.method}
        URL: ${req.url}
        IP: ${req.ip}
        Headers: ${JSON.stringify(req.headers)}
        Body: ${JSON.stringify(req.body)}
    `);
    next();
};

// Middleware usage
app.use(express.json()); // Middleware to parse JSON bodies
app.use(infoLogger); // Logs simplified request received message
app.use(debugLogger); // Logs detailed request information


app.post('/api/data', (req, res) => {
    console.log('Received data:', req.body);
    res.json({ message: 'Data received', data: req.body });
});


const PORT =  1000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
