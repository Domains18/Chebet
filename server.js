const express = require('express');
const PORT = process.env.PORT || 3500;
const path = require('path');
require('dotenv').config();


//static files
express.application.use('/', express.static(path.join(__dirname, 'public')));


//routes
express.application.use('/', require('./routes/root'));












express.application.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
