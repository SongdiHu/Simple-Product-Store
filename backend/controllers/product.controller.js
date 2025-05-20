import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createProduct = async(req, res) => {
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
}

export const deleteProduct = async(req, res) => {
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
}

export const updateProduct = async(req, res) => {
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
}

export const getProducts = async(req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}
