import { Router } from 'express';
import CartManager from '../services/CartManager.js';

const router = Router();
const cartManager = new CartManager('./src/data/carts.json');

// POST / - Crear un nuevo carrito
router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.json(newCart);
});

// GET /:cid - Obtener productos del carrito por ID
router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getById(req.params.cid);
  res.json(cart);
});

// POST /:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const updatedCart = await cartManager.addProductToCart(cid, pid);
  res.json(updatedCart);
});

export default router;
