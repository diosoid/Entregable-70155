import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./src/data/productos.json');

router.get('/', async (req, res) => {
  const products = await productManager.getAll();
  res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getAll();
  res.render('realTimeProducts', { products });
});

export default router;
