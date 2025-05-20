import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.post('/api/products', async(req, res) => {
  const product = req.body;
  // Here you would save the product to the database

  if (!product.name || !product.price || !product.image || !product.description || 
    !product.brand || !product.category || !product.countInStock) {
    return res.status(400).json({ message: 'All fields are required. (name, price, ' + 
        'image, description, brand, category, and countInStock)' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error saving product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.delete('/api/products/:id', async(req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.patch('/api/products/:id', async(req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid product ID' });
  }

  try {
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.get('/api/products', async(req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log('Server is running on port 5000, at http://localhost:5000');
});

//uBUS92ARGzKAt3QG