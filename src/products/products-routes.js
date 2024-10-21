
import express from 'express';
import Products from './products-model.js';
import multer from 'multer';
import fs from 'fs';
const directory = 'uploads/products'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(!fs.existsSync(directory)){
            fs.mkdirSync(directory,{recursive:true});
        }
       
      cb(null, 'uploads/products')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extensionArray = file.originalname.split('.')
      const extension = extensionArray[extensionArray.length -1];
      cb(null,`${file.fieldname}-${uniqueSuffix}.${extension}`);
    }
  })
  
  const upload = multer({ storage })
export const productsRouter = express.Router();




productsRouter.get('/', async (req, res) => {
    const products = await Products.find();
    res.send(products);
});

productsRouter.post('/', upload.single('image'), async (req, res) => {

    const product = new Products({ 
        name: req.body.name, 
        stock: req.body.stock, 
        price: req.body.price, 
        imageURL : `${req.file.path.replaceAll(`\\` , '/')}`
    });
    await product.save();
    res.send(product);
});

productsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await Products.findOneAndDelete(id);
    res.send(deletedProduct)
});