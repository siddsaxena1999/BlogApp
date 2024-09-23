import express from 'express';
import { createPost, deletePost, getPosts, postInfo, updatePost } from '../controllers/post.controllers.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post('/post', upload.single('file'), createPost);
router.get('/posts', getPosts);
router.get('/post/:id', postInfo);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);


export default router;