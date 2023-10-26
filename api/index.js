import express, { json } from 'express';
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

app.listen(3000, () => {
    console.log('server running on port number 3000');
});

app.use('/api/user', userRouters);
app.use('/api/auth', authRouters);