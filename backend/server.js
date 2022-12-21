import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use('/api/seed', seedRouter);

app.use(cors());

app.use('/api/products', productRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
