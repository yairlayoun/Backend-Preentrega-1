import express from 'express';
import * as productsController from '../controllers/productsController.js';

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('GET /api/products'); // Agrega este mensaje
    const products = await productsController.getProducts();
    res.json(products);
  });

router.get('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await productsController.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  try {
    const createdProduct = await productsController.addProduct(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ error: 'Datos de producto inválidos' });
  }
});

router.put('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedProductData = req.body;
  try {
    const result = await productsController.updateProduct(productId, updatedProductData);
    if (result) {
      res.json(updatedProductData);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Datos de producto inválidos' });
  }
});

router.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const result = await productsController.deleteProduct(productId);
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;
