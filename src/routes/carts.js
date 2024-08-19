import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
    await cartManager.addCart();
    res.status(201).send('Cart created');
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(parseInt(req.params.cid));
    res.json(cart || { error: 'Cart not found' });
});

router.post('/:cid/product/:pid', async (req, res) => {
    await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
    res.status(201).send('Product added to cart');
});

export default router;
