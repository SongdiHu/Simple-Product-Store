import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use("/api/products", productRoutes);

// console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log('Server is running on port ' + PORT + ', at http://localhost:' + PORT);
});

//uBUS92ARGzKAt3QG