import express from 'express';
// import mongoose, { get } from 'mongoose';
// import Product from '../models/product.model.js';
import { createProduct, deleteProduct, updateProduct, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.patch('/:id', updateProduct);

router.get('/', getProducts);

export default router;
