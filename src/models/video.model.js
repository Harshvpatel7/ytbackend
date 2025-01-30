import mongoose, {Schema} from "mongoose";

const Video = new Schema(
    {
        videofile: {
            type: String,  //cloudnery
            require: true,
        },

        thumbnail: {
            type: String,  //cloudnery
            require: true,
        },

        description: {
            type: String,  //cloudnery
            require: true,
        },

        title : {
            type: String,  //cloudnery
            require: true,
        },

        duration : {
            type: Number,  //cloudnery
            require: true,
        },

        view: {
            type: Number,  //cloudnery
            default:0,
        },

        isPublished: {
            type: Boolean,
            require: true,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }

    },
    {
        timestamps: true
    } 
);