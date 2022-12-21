import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
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
app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    await res.send(data.products);
    console.log('data =', data.products);
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/products/slug/:slug', async (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    await res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    await res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
