import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { limit } from "./constants";

const app = express();


app.use(cors(
    //this is cors origin will allow request form any device or url
    {
        origin: process.env.CORS_ORIGIN,
        Credential: true,
    }
));


/*

//lets take an example of white listing the urls for more security.
//lets make array of whilist urls.

whiteList = ['http://example1.com', 'http://example2.com'];


//this variable will dcide weather the url is whitelisted or not.

var corsOption  = {
    // defining the origin
    origin: function(origin, callback){
        if(whiteList.indexOf(origin) || !origin){
            callback(null, true); 
            //callback function is to call with the result of weather to allow or not.
            // null shows that there is no error and true allows to process further.
        }else{
            callback(new Error("Not allowed, secure by CORS"));
        }
    }
};

*/

//js not used to convert the json file to data directly we had to use json parser to do that.
app.use(express.json({limit: limit}));

//now to configure the ULRs that an app will get we will do the following config
app.use(express.urlencoded({extended: true, limit: limit}));
//we have used extended object to be more specific about the content of the url

//config the app to save the files on the server form the user
app.use(express.static("public")); 

//config for the cookies
app.use(cookieParser());

export { app };