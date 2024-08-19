import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, '../data/products.json');
    }

    async getProducts() {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }

    async addProduct(product) {
        const products = await this.getProducts();
        product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields, id: products[index].id };
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        }
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        products = products.filter(product => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }
}

console.log(__dirname)

export default ProductManager;
