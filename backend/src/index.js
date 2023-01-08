import app from "./server.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config("../.env");

const port = process.env.PORT || 5000;

// Connecting to the MongoDB database
mongoose.set('strictQuery', true);

mongoose
    .connect(process.env.DB_URI, {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true,
        dbName: process.env.DB_NAME,
    })

    .catch((err) => {
        console.error(err.stack);
        process.exit(1);
    })

    .then(async () => {
        console.log("Connected to Mongoose");
        app.listen(port, () => {
            console.log(`Listening on port ${port}.`);
        });
    });

