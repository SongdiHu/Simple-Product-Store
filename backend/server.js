import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use("/api/products", productRoutes);

// console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log('Server is running on port 5000, at http://localhost:5000');
});

//uBUS92ARGzKAt3QG