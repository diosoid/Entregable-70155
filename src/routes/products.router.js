import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./src/data/productos.json');

router.get('/', async (req, res) => {
  const products = await productManager.getAll();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const product = await productManager.getById(req.params.pid);
  res.json(product);
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  const addedProduct = await productManager.add(newProduct);
  res.json(addedProduct);
});

router.put('/:pid', async (req, res) => {
  const updatedProduct = await productManager.update(req.params.pid, req.body);
  res.json(updatedProduct);
});

router.delete('/:pid', async (req, res) => {
  const result = await productManager.delete(req.params.pid);
  res.json(result);
});

export default router;
