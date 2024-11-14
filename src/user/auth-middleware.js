import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ message: 'authorization header is missing' });
        return;
    }

    const token = authorization.replace('Bearer ', '');
    try {
        const userInfo = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userInfo;
    } catch (e) {
        res.status(401).send({ message: 'invalid token' })
        return;
    }

    next();
}