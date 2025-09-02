import mongoose from "mongoose";
import { UserInput } from "../interfaces";
export type Role = "admin" | "user" | "moderator";



export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    delete: Date;
    role: Role;

}

const userSchema = new mongoose.Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index : true },
    password: { type: String, required: true, select : false},
    role: { type: String, enum: ["admin", "user", "moderator"], required: true }, // 👈 nuevo

},{
    timestamps: true,
    collection: "users"
});

export const UserModel = mongoose.model<UserDocument>("User", userSchema);