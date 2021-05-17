const express = require('express');
const app = express();
const PORT = 3000;

app.listen(() => {
    console.log(`Server started at port ${PORT}`);
})