import express from 'express';
import User from './user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authRouter = express.Router();

authRouter.post('/login', async(req, res) =>{
    const { username, password } = req.body;

    const user = await User.findOne({username});
    if(!user){
        res.status(400).send({message : 'the username is in correct'});
        return;
    }
    const isPasswordCorrect = bcrypt.compare(password, user.password);
    console.log('ispasswordCorrect', isPasswordCorrect)
    if(!isPasswordCorrect){
        res.status(400).send({message : 'the password is incorrect'});
    }
    const token = jwt.sign({
        username : user.name,
        _id : user._id,
        email: user.email

    },'topsecret');
    res.send({token})
})