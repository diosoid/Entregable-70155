import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(parseInt(req.params.pid));
    res.json(product || { error: 'Product not found' });
});

router.post('/', async (req, res) => {
    const newProduct = req.body;
    await productManager.addProduct(newProduct);
    res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
    const updatedFields = req.body;
    await productManager.updateProduct(parseInt(req.params.pid), updatedFields);
    res.status(204).send();
});

router.delete('/:pid', async (req, res) => {
    await productManager.deleteProduct(parseInt(req.params.pid));
    res.status(204).send();
});

export default router;
