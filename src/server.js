
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { productsRouter } from './products/products-routes.js';
import { OrderRouter } from './order/order-routes.js';
import { userRouter } from './user/user-router.js';
import { authRouter } from './user/auth-router.js';

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
app.use('/order',OrderRouter)
app.use('/User',userRouter)
app.use('/auth',authRouter)

app.listen(port, () => {
    console.log(`Ecommerce app running at port: ${ port }`);
})
