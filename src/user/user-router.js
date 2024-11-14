import express from 'express';
import User from './user-model.js';
import bcrypt from 'bcrypt';
import { authMiddleware } from './auth-middleware.js';

export const userRouter = express.Router()

userRouter.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const foundUser = await User.findOne({ _id: userId });

    res.send({
        username: foundUser.username,
        email: foundUser.email
    });
});

userRouter.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!emailRegex.test(email)) {
        res.status(400).send({ messsage: 'Email format is invalid'});
        return;
    }

    const hashedPassword = await hashPassword(password);

    const createdUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).send({
        username: createdUser.username,
        email: createdUser.email,
    });
});

function hashPassword (password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}