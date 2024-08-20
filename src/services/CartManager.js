import fs from 'fs/promises';

class CartManager {
  constructor(path) {
    this.path = path;
    this._initializeFile();
  }

  async _initializeFile() {
    try {
      await fs.access(this.path);
    } catch {
      await fs.writeFile(this.path, JSON.stringify([]));
    }
  }

  async createCart() {
    const carts = await this.getAll();
    const newCart = {
      id: this._generateId(carts),
      products: []
    };
    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getById(id) {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      const carts = JSON.parse(data);
      return carts.find(cart => cart.id == id); 
    } catch (error) {
      console.error("Error al leer el archivo JSON:", error);
      throw error;
    }
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getAll();
    const cart = carts.find(c => c.id == cartId);

    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product == productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
º
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }

  async getAll() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  _generateId(carts) {
    return carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1;
  }
}

export default CartManager;
