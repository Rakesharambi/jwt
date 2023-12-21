const express = require ("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./DB/connectDB");
const userRoute = require("./Routes/user");
const notFound = require("./Middleware/not-found");


const errorHandlerMiddleware = require("./Middleware/errorHandler");

app.use(express.json());

app.use(cookieParser());

app.use(userRoute)

app.use (notFound);
app.use(errorHandlerMiddleware);

const port = process.env.port || 8000;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server listening at port ${port}`));
    }catch (error) {
console.log(error);
    }
};

start();