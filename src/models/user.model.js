import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        fullname:{
            type: String,
            require: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //we'll use cloudnery 
            require: true,
        },
        coverImage: { 
            type: String, //we'll use cloudnery 
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        password: {
            type: String,
            require: [true, `password is required`],
        },
        refreshTocken:{
            type:String,
        }
    },
    
    {
        Timestamp : true
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified(password)) {
        next();
    }

    this.password = bcrypt.hash(this.password,10);
    next();
});



userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
};

userSchema.methods.generateAccessToken = async function (){
    return await jwt.sign(
        {
            _id = this._id,
            email = this.email,
            fullName = this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn = process.env.ACCESS_TOKEN_EXPIRY;
        },
    );
};

userSchema.methods.generateRefreshToken = async function (){
    return await jwt.sign(
        {
            _id = this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn = process.env.REFRESH_TOKEN_EXPIRY;
        },
    );
};
export const user = mongoose.model("User", userSchema);