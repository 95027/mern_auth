import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouters from './routes/user.route.js';

// for acceessing .env variables in backend
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() =>console.log('connected to db'))
.catch((err) => console.log(err));

const app = express();

app.listen(3000, () => {
    console.log('server running on port number 3000');
});

app.use('/api/user', userRouters);