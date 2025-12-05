import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import React from 'react';
import App from './src/App.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use('/src', express.static('src'));

// Mock product data (in real app, this would come from a database)
const products = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, description: 'Premium noise-cancelling headphones', category: 'Electronics' },
  { id: 2, name: 'Smart Watch', price: 249.99, description: 'Fitness tracking and notifications', category: 'Electronics' },
  { id: 3, name: 'Laptop Stand', price: 49.99, description: 'Ergonomic adjustable stand', category: 'Accessories' },
  { id: 4, name: 'Mechanical Keyboard', price: 129.99, description: 'RGB backlit mechanical switches', category: 'Accessories' },
  { id: 5, name: 'USB-C Hub', price: 79.99, description: 'Multi-port adapter for laptops', category: 'Accessories' },
];

// API endpoint for products
app.get('/api/products', (req, res) => {
  const category = req.query.category;
  const filtered = category 
    ? products.filter(p => p.category === category)
    : products;
  res.json(filtered);
});

// API endpoint for single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Main route - render React Server Components
app.get('*', async (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return;
  }

  // Set headers for streaming
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // Render React Server Components to stream
  const { pipe, abort } = renderToPipeableStream(
    React.createElement(App, { url: req.url }),
    {
      bootstrapScripts: ['/client.js'],
      onShellReady() {
        res.statusCode = 200;
        pipe(res);
      },
      onShellError(error) {
        console.error('Shell error:', error);
        res.statusCode = 500;
        res.send('<!doctype html><html><head><title>Error</title></head><body><h1>Server Error</h1><pre>' + error.message + '</pre></body></html>');
      },
      onError(error) {
        console.error('Streaming error:', error);
      }
    }
  );

  // Handle client disconnect
  req.on('close', () => {
    abort();
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📦 React Server Components enabled`);
});

