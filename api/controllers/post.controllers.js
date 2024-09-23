import postModel from '../models/posts.model.js';
import jwt from 'jsonwebtoken';

export const createPost = async (req, res) => {
    const { title, summary, content } = req.body;
    const cover = req.file.path;

    const { token } = req.cookies;

    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
        if (err) console.log(err.message);
        try {
            const postDoc = await postModel({ title, summary, content, cover, author: info.id });
            postDoc.save();
            res.status(201).json({ message: "Posted successfully!" })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ "message": "Internal Server Error" });
        }
    })

}

export const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('author', ['userName']).sort({ createdAt: -1 }).limit(20);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            "message": "Internal Server Error"
        });
    }
}

export const postInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const postDoc = await postModel.findById(id).populate('author', ['userName']);
        res.json(postDoc);
    } catch (error) {
        res.status(500).json({ "message": "Internal Server Error" });
    }
}

export const updatePost = async (req, res) => {
    let cover = null;
    const { id } = req.params;
    const { title, summary, content } = req.body;
    const { token } = req.cookies;
    if (req.file) {
        cover = req.file.path;
    }

    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
        if (err) console.log(err.message);
        try {
            const postDoc = await postModel.findById(id);
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
            if (!isAuthor) {
                res.status(400).json({ "message": "Unauthorized" });
            }
            const newDoc = await postModel.findByIdAndUpdate(id, {
                title,
                summary,
                content,
                cover: cover ? cover : postDoc.cover
            })
            res.status(201).json({ "message": "Updated!" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ "message": "Internal Server Error" });
        }
    })
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await postModel.findOneAndDelete(id);
        res.status(200).json({ "message": "Deleted" });
    } catch (error) {
        res.status(500).json({ "message": "Internal Server Error" });
    }
}