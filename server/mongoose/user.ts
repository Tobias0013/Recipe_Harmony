import {Schema, model, Types, Document} from "mongoose";

interface IUser extends Document {
    _id: Types.ObjectId,
    full_name: string,
    password: string,
    email: string,
    joined: Date,
    favorite_recipes: string[]
};

const userSchema: Schema = new Schema<IUser>(
    {
        _id: {
            type:Schema.Types.ObjectId,
            auto:true
        },
        full_name:String,
        password:String,
        email:{
            type:String,
            unqie:true,
            required:true
        },
        joined:Date,
        favorite_recipes:[String]
    }
)

export default model<IUser>("User", userSchema, "Users");