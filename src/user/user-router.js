import express from 'express';
import User from './user-model.js';
import bcrypt from 'bcrypt';

export const userRouter = express.Router();

userRouter.get('/userId', async(req,res) => {
    const userId = req.params.userId;
    const foundUser = await User.findOne({_id : id});

    res.send({
        username :foundUser.username,
    });
});

userRouter.post('/', async (req,res) =>{
    const {username, email, password} = req.body;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(email)){
        res.status(400).send({message: 'email format invalid'});
        return;
    }
    const hashedPassword = await hashPassword(password);
    const CreatedUser = await User.create({username,email,password : hashedPassword})
    res.status(201).send({
        username: CreatedUser.username,
        email : CreatedUser.email,
    });
});

 function hashPassword(password) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds);
    
 }

