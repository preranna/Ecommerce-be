
import express from 'express';
import mongoose from 'mongoose';
import { productsRouter } from './products/products-routes.js';

const app = express();
app.use(express.json());

const port = 20000;

const main = async () => {
    await mongoose.connect('mongodb+srv://ravitmg:admin@cluster0.zfcpv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('connected to database successfully')
}

main().catch(err => console.log(err));

app.use('/products', productsRouter);

app.listen(port, () => {
    console.log(`Ecommerce app running at port: ${ port }`);
})
