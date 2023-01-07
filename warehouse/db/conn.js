import dotenv from "dotenv";
import mongoose from "mongoose";
mongoose.set('strictQuery', false);

class Database {

    constructor() {
        this.connect()
    }

    connect() {
        dotenv.config()
        mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log('Database connection successfully established')
            })
            .catch(err => {
                console.error('Database connection error: ' + err)
            })
    }
}

export default new Database()