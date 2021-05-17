const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.LOCAL_PORT;
let cors = require('cors');
let userRoutes = require('./routes/userRoutes');
let momentRoutes = require('./routes/momentRoutes');
let { NotFound, InternalServerError } = require('./middleware/httpStatusCode.json');

app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/moment', momentRoutes);

app.use((req, res, next) => {
    const response = {};
    response.status = NotFound;
    response.message = 'Not Found';
    res.status(NotFound).send(response);
})

app.use((error, req, res, next) => {
    let response = {
        success: false,
        status: InternalServerError,
        message: error.message
    };
    res.json(response);
})


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
    require('./dbConfig/db.connection');
})