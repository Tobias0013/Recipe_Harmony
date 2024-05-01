import mongoose from "mongoose";

export const connect = (uri: string): void =>{
    mongoose.connect(uri)
    .then(() => console.log("MongoDB and Mongoose connected!"))
    .catch(error => console.error("Error in connection!", error));
};