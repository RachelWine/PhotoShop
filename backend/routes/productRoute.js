import express from 'express';
import Product from '../models/productModel';

const router = express.Router();

router.get("/", async(req, res) =>  {
    const products = await Product.find({});
    res.send(products);
});

router.get("/:id", async(req, res) =>  {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product)
            res.send(product);
        else
            res.status(404).send({msg: "Product Not Found."});
});

router.post("/", async(req, res) => {
    const product = new Product({
        name : req.body.name,
        price : req.body.price,
        category : req.body.category,
        img : req.body.img,
        description : req.body.description,
        count : req.body.count,
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: 'Error in Creating product' });
});

router.put("/:id", async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.category = req.body.category;
        product.img = req.body.img;
        product.description = req.body.description;
        product.count = req.body.count;

        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
        }
    }
    return res.status(500).send({ message: 'Error in Updating product' });
});

router.delete("/:id", async(req, res) => {
    const deltedProduct = await Product.findById(req.params.id);
    if (deltedProduct) {
        await deltedProduct.remove();
        res.send({ message: 'Product Deleted' });
    } else {
        res.send('Error in Deleteing product');
    }
});

export default router;