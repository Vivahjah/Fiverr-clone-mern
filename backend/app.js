require('express-async-errors')
const cors = require('cors')
require('dotenv').config();
const express = require('express')
const app = express()


app.use(express.json());
app.use(cors());

//connect to DB
const connectDB = require('./db/connect')

//error-handler
// const notFoundMiddleware = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');

//routes



// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);








const port = process.env.PORT || 5500;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Connect to DB || running on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();