import express from 'express';
import Products from '../products/products-model.js';
import { authMiddleware } from '../user/auth-middleware.js';
import User from '../user/user-model.js';

export const orderRouter = express.Router();
orderRouter.use(authMiddleware);

orderRouter.post("/buy-now", async (req, res) => {
    const productId = req.body.productId;
    const product = await Products.findOne({ _id: productId });

    if (!product) {
        res.status(400).send({ message: "The product does not exist" });
        return;
    }

    if (product.stock <= 0) {
        res.status(400).send({ message: "The product is Out of Stock" });
        return;
    }

    await Products.updateOne({ _id: productId }, {
        stock: product.stock - 1,
    });

    const updatedProduct = await Products.findOne({ _id: productId });
    res.send(updatedProduct);
});


orderRouter.post('/add-to-cart', async (req, res) => {
    const { productId } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(401).send({ message: "user not found" })
    }

    if (user.cart.productIds.includes(productId)) {

    } else {
        user.cart.productIds.push(productId);
    }
    await user.save();
    res.send({ message: 'added product to cart' })
});