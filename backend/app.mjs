
import "express-async-errors"
import cors from "cors"
import express from "express"
import dotenv from 'dotenv';

const app = express()
dotenv.config();



app.use(express.json());
app.use(cors());

//connect to DB
import connectDB from "./db/connect.js";

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