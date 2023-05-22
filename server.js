require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3500;
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const colors = require('colors')
const app = express();
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const { logEvents, logger } = require('./middlewares/logger');


connectDB();

app.use(logger);
// app.use(cors(corsOptions));

//middlewares
app.use(express.json());
// app.use(cookieParser);


//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/userRoutes'));

// default routes
app.use('/', require('./routes/root'));
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: ' 404 Not found' });
    } else {
        req.type('txt').send('404 Not found');
    }
});
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Deployment successfully pinged, connection established'.blue.bold)
    app.listen(PORT, ()=>{console.log(`Serving on port ${PORT}`.green.bold)})
});

mongoose.connection.on('error', err => {
    console.log(err.red.bold);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrorLoqs.log')
})
