import express from 'express';
import bcrypt from 'bcrypt';
import User from './user-model.js';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './auth-middleware.js';

export const authRouter = express.Router();


authRouter.get('/me', authMiddleware, async (req, res) => {
    const userId = req.user._id;
    console.log(userId);
    const user = await User.findOne({ _id: userId });
    res.status(200).send({
        email: user.email,
        username: user.username,
        cart: user.cart,
        _id: user._id,
    });
});

authRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).send({ message: "email and password are required to log in" });
        return;
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).send({ message: "the email is incorrect" });
        return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log('ispassword correct', isPasswordCorrect)
    if (!isPasswordCorrect) {
        res.status(400).send({ message: "The password is incorrect" });
        return;
    }

    const token = jwt.sign({
        username: user.username,
        _id: user._id,
        email: user.email
    }, process.env.JWT_SECRET)

    res.send({ token });
});