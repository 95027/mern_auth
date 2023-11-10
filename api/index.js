import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouters from './routes/user.route.js';
import authRouters from './routes/auth.route.js';

// for acceessing .env variables in backend
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() =>console.log('connected to db'))
.catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.use('/api/user', userRouters);
app.use('/api/auth', authRouters);

// middleware for error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    return res.status(statusCode).json({
        success : false,
        message,
        statusCode
    });
})

app.listen(3000, () => {
    console.log('server running on port number 3000');
});