import fs from 'fs/promises';
import Cart from '../models/Cart.js';

class CartManager {
  constructor(path) {
    this.path = path;
    //this._initializeFile();
  }

  // Método para crear un nuevo carrito
  async createCart() {
    try {
        const newCart = await Cart.create({ products: [] }); // Crear un carrito vacío
        return newCart;
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        throw error;
    }
}

// Método para obtener un carrito por su ID
async getCartById(cartId) {
    try {
        const cart = await Cart.findById(cartId).populate('products.product').lean(); // Obtener carrito y popular productos
        return cart;
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
}

// Método para agregar un producto al carrito
async addProductToCart(cartId, productId, quantity = 1) {
    try {
        const cart = await Cart.findById(cartId);
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex !== -1) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            cart.products[productIndex].quantity += quantity;
        } else {
            // Si el producto no está en el carrito, agregarlo
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        return cart;
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        throw error;
    }
}

// Método para eliminar un producto del carrito
async removeProductFromCart(cartId, productId) {
    try {
        const cart = await Cart.findById(cartId);
        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        return cart;
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        throw error;
    }
}

// Método para eliminar todos los productos del carrito
async clearCart(cartId) {
    try {
        const cart = await Cart.findById(cartId);
        cart.products = [];
        await cart.save();
        return cart;
    } catch (error) {
        console.error('Error al vaciar el carrito:', error);
        throw error;
    }
}

// Método para actualizar la cantidad de un producto en el carrito
async updateProductQuantity(cartId, productId, quantity) {
    try {
        const cart = await Cart.findById(cartId);
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            return cart;
        } else {
            throw new Error('Producto no encontrado en el carrito');
        }
    } catch (error) {
        console.error('Error al actualizar la cantidad del producto en el carrito:', error);
        throw error;
    }
}


}

export default CartManager;

//   async _initializeFile() {
//     try {
//       await fs.access(this.path);
//     } catch {
//       await fs.writeFile(this.path, JSON.stringify([]));
//     }
//   }

//   async createCart() {
//     const carts = await this.getAll();
//     const newCart = {
//       id: this._generateId(carts),
//       products: []
//     };
//     carts.push(newCart);
//     await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
//     return newCart;
//   }

//   async getById(id) {
//     try {
//       const data = await fs.readFile(this.path, 'utf-8');
//       const carts = JSON.parse(data);
//       return carts.find(cart => cart.id == id); 
//     } catch (error) {
//       console.error("Error al leer el archivo JSON:", error);
//       throw error;
//     }
//   }

//   async addProductToCart(cartId, productId) {
//     const carts = await this.getAll();
//     const cart = carts.find(c => c.id == cartId);

//     if (!cart) return null;

//     const existingProduct = cart.products.find(p => p.product == productId);

//     if (existingProduct) {
//       existingProduct.quantity += 1;
//     } else {
//       cart.products.push({ product: productId, quantity: 1 });
//     }
// º
//     await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
//     return cart;
//   }

//   async getAll() {
//     const data = await fs.readFile(this.path, 'utf-8');
//     return JSON.parse(data);
//   }

//   _generateId(carts) {
//     return carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1;
//   }