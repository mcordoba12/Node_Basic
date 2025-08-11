import mongoose from "mongoose";
import { UserInput } from "../interfaces";



export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    delete: Date;

}

const userSchema = new mongoose.Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index : true },
    password: { type: String, required: true },
},{
    timestamps: true,
    collection: "users"
});

export const UserModel = mongoose.model<UserDocument>("User", userSchema);