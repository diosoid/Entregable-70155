import fs from 'fs/promises';
import Product from '../models/Product.js';

class ProductManager {
  constructor(path) {
    this.path = path;
    //this._initializeFile();
  }

  // Método para agregar un producto
  async add(product) {
    try {
      const newProduct = await Product.create(product); // Crear un nuevo producto en MongoDB
      return newProduct;
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      throw error;
    }
  }
  
  // Método para obtener todos los productos
  async getAll() {
    try {
      const products = await Product.find(); // Obtener todos los productos de MongoDB
      return products;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }
  
  // Método para obtener un producto por su ID
  async getById(productId) {
    try {
      const product = await Product.findById(productId); // Buscar el producto por su ID en MongoDB
      return product;
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      throw error;
    }
  }
  
  // Método para eliminar un producto por su ID
  async delete(productId) {
    try {
      await Product.findByIdAndDelete(productId); // Eliminar producto por ID en MongoDB
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw error;
    }
  }
  
  // Método para actualizar un producto por su ID
  async update(productId, updatedProduct) {
    try {
      const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
      return product;
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw error;
    }
  }
  
  
}

export default ProductManager;

//Metodos viejos

// async add(product) {
  //   try {
    //       const { title, description, code, price, stock, category, thumbnails } = product;
    
    //       if (!title || !description || !code || price === undefined || stock === undefined || !category ) {
      //           throw new Error('Por favor, complete todos los campos requeridos: title, description, code, price, status, stock, category y thumbnails.');
      //       }
      //       const products = await this.getAll();
      //       product.id = this._generateId(products);
      //       products.push(product);
      //       await fs.writeFile(this.path, JSON.stringify(products, null, 2));
      //       return product;
      //   } catch (error) {
        //       console.error('Error al agregar el producto:', error);
        //       throw error;
        //   }
        // }
        
        
        //   async add(product) {
          //     // Validación de campos requeridos
          //     const { title, description, code, price, stock, category, thumbnails } = product;
          
          //     if (!title || !description || !code || price === undefined || stock === undefined || !category ) {
            //         throw new Error('Por favor, complete todos los campos requeridos: title, description, code, price, status, stock, category y thumbnails.');
            //     }
            
            //     const products = await this.getAll();
            //         // Validaciones...
            //         products.push(product);
            //         await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            //         return product;
            // }
            // async update(id, updatedFields) {
              //   const products = await this.getAll();
              //   const index = products.findIndex(p => p.id == id);
              
              //   // Verificar si el producto existe
              //   if (index === -1) {
                //     throw new Error('Producto no encontrado');
                //   }
                
                //   // Asegurarse de que el campo "id" no se pueda actualizar
                //   if (updatedFields.id) {
                  //     throw new Error('No se puede actualizar el campo "id"');
                  //   }
                  
                  //   // Actualizar el producto con los nuevos campos
                  //   products[index] = { ...products[index], ...updatedFields };
                  //   await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                  //   return products[index];
                  // }
                  
                  
                  // async delete(id) {
                    //   try {
                      //     const products = await this.getAll();
                      
                      //     const filteredProducts = products.filter(product => product.id != id);
                      //     await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
                      //     io.emit('productList', filteredProducts); // Emitir lista actualizada
                      //     return { message: 'Producto eliminado correctamente' };
                      //   } catch (error) {
                        //     console.error("Error al eliminar el producto:", error);
                        //     throw error;
                        //   }
                        // }
                        
                        
                        // _generateId(products) {
                          //   if (products.length === 0) {
                            //     return 1; // Si no hay productos, el primer ID será 1
                            //   }
                            
                            //   const lastProduct = products[products.length - 1];
                            //   return lastProduct.id + 1; // Si hay productos, el nuevo ID será el del último producto + 1
                            // }
                            // async getAll() {
                              //   try {
                                //     const data = await fs.readFile(this.path, 'utf-8');
                                //     return data ? JSON.parse(data) : [];
                                //   } catch (error) {
                                  //     console.error("Error al leer el archivo JSON:", error);
                                  //     return [];
                                  //   }
                                  // }
                                  
                                  
                                  // async getById(id) {
                                    //   const products = await this.getAll();
                                    //   const product = products.find(p => p.id == id);
                                    //   if (!product) {
                                      //       throw new Error('Producto no encontrado');
                                      //   }
                                      //   return product;
                                      // }
                                      // async _initializeFile() {
                                      //   try {
                                      //     await fs.access(this.path);
                                      //   } catch {
                                      //     await fs.writeFile(this.path, JSON.stringify([]));
                                      //   }
                                      // }