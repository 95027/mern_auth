import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import Jwt  from "jsonwebtoken";

export const signup = async (req, res, next) => {

    const {username, email, password} = req.body;
    
    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    const newUser = new User({username, email, password:hashedPassword});
    
    try {
        await newUser.save()
        res.status(201).json({message : "user created successfully"});  
    } catch (error) {
        //res.status(500).json(error.message);
        next(error);
    }
}

export const signin = async (req, res, next) => {
    
    const { email, password} =  req.body;

    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User not found'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, "Invalid credentials"));

        // jwt token
        const token = Jwt.sign({id : validUser._id}, process.env.JWT_SECRET);

        // for removing password
        const {password : hashedPassword, ...rest} = validUser._doc;

        // for expiring the coockie
        const expiryDate = new Date(Date.now() + 3600000 * 24 ); // 1 hour

        // for storing the session in coockie
        res.cookie('access_token', token, {httpOnly : true, expires : expiryDate}).status(200).json(rest);
        
    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({email : req.body.email});

        if(user){
            const token = Jwt.sign({id : user._id}, process.env.JWT_SECRET);
            const {password : hashedPassword, ...rest} = user._id;
            const expiryDate = new Date(Date.now() +  3600000 * 24);

            res.cookie('access_token', token, {httpOnly: true, expires : expiryDate}).status(200).json(rest);
        }
        else{
            // for 8 digit password, for 16 digit twice
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username : req.body.name.split(' ').join("").toLowerCase() + Math.round(Math.random() * 10000).toString(),
                email : req.body.email,
                password : hashedPassword,
                profilePicture : req.body.photo,
            });
            await newUser.save();

            const token = Jwt.sign({id : newUser._id}, process.env.JWT_SECRET);
            const {password : hashedPassword2, ...rest} = newUser._doc;
            const expiryDate = new Date(Date.now() +  3600000 * 24);

            res.cookie('access_token', token, {httpOnly: true, expires : expiryDate}).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }

}