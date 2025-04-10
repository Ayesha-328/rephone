import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import sellerRoutes from './routes/sellerRoutes.js';
import productRoutes from './routes/productRoutes.js';
import buyerRoutes from './routes/buyerRoutes.js';


dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/seller", sellerRoutes)
app.use("/api/buyer", buyerRoutes)
app.use("/api/product", productRoutes)


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});