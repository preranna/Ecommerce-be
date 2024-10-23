import express from 'express';
import Products from '../products/products-model.js';

export const OrderRouter = express.Router();


 OrderRouter.post("/buy-now",async (req,res) =>{
    const productId = req.body.productId;
    const product = await Products.findOne({_id: productId});
    if(!product){
        res.status(400).send({message : "Product does not exit"});    
        return;
    }
    if(product.stock <= 0){
        res.status(400).send({message : "The product is out of stock"});    
        return;
    }
    Products.updateOne({_id :productId},{
        stock:product.stock -1

    });
res.send("Puchase successfully.")
 });


