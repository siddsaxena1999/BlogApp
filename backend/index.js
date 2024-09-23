import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.routes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

try {
    mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");
} catch (error) {
    console.log(error.message);
}


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());
app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/uploads', express.static(__dirname + '/uploads'))

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

})