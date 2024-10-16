
import express from 'express';
import Products from './products-model.js';
export const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    const products = await Products.find();
    res.send(products);
});

productsRouter.post('/', async (req, res) => {
    const product = new Products({ name: req.body.name, stock: req.body.stock });
    await product.save();
    res.send(product);
});

productsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await Products.findOneAndDelete(id);
    res.send(deletedProduct)
});