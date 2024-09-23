import mongoose, { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true, versionKey: false });

const postModel = model('Post', postSchema);

export default postModel;