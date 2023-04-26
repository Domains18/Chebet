require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3500;
const path = require('path');


const app = express();

//static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
