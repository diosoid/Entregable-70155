import fs from 'fs/promises';

class ProductManager {
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

  async getAll() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error al leer el archivo JSON:", error);
      return [];
    }
  }
  

  async getById(id) {
    const products = await this.getAll();
    return products.find(p => p.id == id);
  }

  async add(product) {
    const products = await this.getAll();
    product.id = this._generateId(products);
    products.push(product);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return product;
  }

  async update(id, updatedFields) {
    const products = await this.getAll();
    const index = products.findIndex(p => p.id == id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
      return products[index];
    }
    return null;
  }

  async delete(id) {
    try {
      // Leer todos los productos
      const products = await this.getAll();
      
      // Filtrar el producto a eliminar
      const filteredProducts = products.filter(product => product.id != id);
  
      // Escribir los productos actualizados en el archivo
      await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
      
      // Retornar un mensaje de éxito
      return { message: 'Producto eliminado correctamente' };
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }
  

  _generateId(products) {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }
}

export default ProductManager;
