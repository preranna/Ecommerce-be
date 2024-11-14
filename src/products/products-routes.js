import express from 'express';
import Products from './products-model.js';
import multer from 'multer';
import fs from 'fs';
import { authMiddleware } from '../user/auth-middleware.js';

const directory = 'uploads/products';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        cb(null, directory);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extensionArray = file.originalname.split('.');
        const extension = extensionArray[extensionArray.length - 1];
        cb(null, `${ file.fieldname }-${ uniqueSuffix }.${ extension }`);
    },
});
const upload = multer({ storage });
export const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    const products = await Products.find();
    res.send(products);
});

productsRouter.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    const product = new Products({
        name: req.body.name,
        stock: req.body.stock,
        imageUrl: `${ req.file.path.replaceAll(`\\`, '/') }`,
        price: req.body.price,
    });
    await product.save();
    res.send(product);
});

productsRouter.delete('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;

    const product = await Products.findOne({ _id: id });
    await Products.deleteOne({ _id: id });

    if (fs.existsSync(product.imageUrl)) {
        console.log('product image exists. deleting now')
        // delete the image if it exists
        fs.unlinkSync(product.imageUrl)
    }
    res.send(product);
});