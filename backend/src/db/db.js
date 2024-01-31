import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// database sathe jyare communicate karishu tyere time lagshe mate async await no use karvo
// try and catch block no use krvo error ne handle ksrva
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error ", error);
        process.exit(1);
    }
}

export default connectDB;