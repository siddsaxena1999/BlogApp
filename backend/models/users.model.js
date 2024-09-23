import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true, versionKey: false });

const userModel = model("User", userSchema);

export default userModel;