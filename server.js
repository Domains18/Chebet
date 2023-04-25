const express = require('express');
const PORT = process.env.PORT;
require('dotenv').config();





















express.application.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
