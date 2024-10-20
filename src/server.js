
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { productsRouter } from './products/products-routes.js';

const app = express();
app.use(express.json());
app.use(cors());


const port = 15000;

const main = async () => {
    await mongoose.connect('mongodb+srv://prerana:admin@ecommerce.ghxgk.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce');
    console.log('connected to database successfully')
}

main().catch(err => console.log(err));

app.use('/products', productsRouter);

app.listen(port, () => {
    console.log(`Ecommerce app running at port: ${ port }`);
})
