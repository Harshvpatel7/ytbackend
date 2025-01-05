import dotenv from "dotenv";
import connectDB from './db/index.js';
import { app } from "./app.js"
dotenv.config({
    path: './env'
});



connectDB()// it returns the promise, so we cn use . then and .catch to handel function and errors.
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`app is listning on PORT: ${process.env.PORT}`);
    });
})//accepts callback function into then and catch
.catch((error)=>{
    console.log(`mongoDB connection error:`, error);
    app.on("error",(error)=>{
        console.log("application not responding error: ", error);
        throw error;
    })
})


















// import express from "express";

// const app = express()
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.CONN_STRING}/${dbm}`)
        
//         // app.on("error", (error) => {
//         //     console.log("error: ", error)
//         //     throw error
//         // })
        
//         app.listen(process.env.PORT)
//     } catch (error) {
//         console.error("error occured: ", error)
//         throw error
//     }
// } )()