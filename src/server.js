
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { productsRouter } from './products/products-routes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const port = 15000;

const main = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to database successfully')
}

main().catch(err => console.log(err));

app.use('/products', productsRouter);

app.listen(port, () => {
    console.log(`Ecommerce app running at port: ${ port }`);
})
