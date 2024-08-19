import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CartManager {
    constructor() {
        this.path = path.join(__dirname, '../data/carts.json');
    }

    async getCarts() {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id);
    }

    async addCart() {
        const carts = await this.getCarts();
        const newCart = { id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1, products: [] };
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cartId);
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.product === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        }
    }
}

export default CartManager;
