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

router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await CartManager.deleteProduct(cid, pid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const cart = await CartManager.updateCart(cid, products);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await CartManager.updateProductQuantity(cid, pid, quantity);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await CartManager.clearCart(cid);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




export default router;
