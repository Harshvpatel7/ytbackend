import mongoose from "mongoose";
import {dbm} from "../constants.js";


const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.CONN_STRING}/${dbm}`);
        // console.log(connectionInstance);
        console.log(`mongodb connected!! and host: ${connectionInstance}`);
    }catch(error){
        console.log("ERROR OCCURED: ", error);
        process.exit(1);
    }
}

export default connectDB;