import { Router } from 'express';
import ProductManager from '../services/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./src/data/productos.json');
router.get('/', async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  try {
    const filter = query ? { category: query } : {};
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
    };
    const products = await Product.paginate(filter, options).lean();
    res.json({
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.hasPrevPage ? products.page - 1 : null,
      nextPage: products.hasNextPage ? products.page + 1 : null,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage ? `/products?page=${products.page - 1}` : null,
      nextLink: products.hasNextPage ? `/products?page=${products.page + 1}` : null,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});
// router.get('/', async (req, res) => {
//   const products = await productManager.getAll();
//   res.json(products);
// });

router.get('/:pid', async (req, res) => {
  try {
      const product = await productManager.getById(req.params.pid);
      res.status(200).json(product); // Código 200 si se encuentra el producto
  } catch (error) {
      res.status(404).json({ error: error.message }); // Código 404 si no se encuentra el producto
  }
});


router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await productManager.add(newProduct);
    res.json(addedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.put('/:pid', async (req, res) => {
  try {
      const updatedProduct = await productManager.update(req.params.pid, req.body);

      // Si el producto fue encontrado y actualizado
      res.status(200).json(updatedProduct);
  } catch (error) {
      // Manejo de errores específicos
      if (error.message === 'Producto no encontrado') {
          res.status(404).json({ error: error.message });
      } else if (error.message === 'No se puede actualizar el campo "id"') {
          res.status(400).json({ error: error.message });
      } else {
          // Error genérico del servidor
          res.status(500).json({ error: 'Error al actualizar el producto' });
      }
  }
});


router.delete('/:pid', async (req, res) => {
  const result = await productManager.delete(req.params.pid);
  res.json(result);
});

export default router;
