import express from 'express';
import bcrypt from 'bcrypt';
import User from './user-model.js';
import jwt from 'jsonwebtoken';

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).send({ message: "email and password are required to log in" });
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
    }, 'topsecret')

    res.send({ token });
});