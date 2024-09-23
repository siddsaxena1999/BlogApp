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

router.post('/api/post', upload.single('file'), createPost);
router.get('/api/posts', getPosts);
router.get('/api/post/:id', postInfo);
router.put('/api/post/:id', updatePost);
router.delete('/api/post/:id', deletePost);


export default router;