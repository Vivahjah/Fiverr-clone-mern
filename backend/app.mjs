import "express-async-errors"
import cors from "cors"
import express from "express"
import dotenv from 'dotenv';
import userRouter from "./routes/user.js"
import orderRouter from "./routes/order.js"
import conversationRouter from "./routes/conversation.js"
import messageRouter from "./routes/message.js"
import gigRouter from "./routes/gig.js"
import reviewRouter from "./routes/review.js"
import authRouter from "./routes/auth.js"

const app = express()
dotenv.config();



app.use(express.json());
app.use(cors());

//connect to DB
import connectDB from "./db/connect.js";

//error-handler
// const notFoundMiddleware = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"

//routes

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/conversation', conversationRouter)
app.use('/api/v1/message', messageRouter)
app.use('/api/v1/gig', gigRouter)
app.use('/api/v1/review', reviewRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);








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