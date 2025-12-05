import React, { use } from 'react';

// Server Component - fetches data on the server
// In a real RSC setup, this would use direct database access
// For this demo, we'll use a simple in-memory data source
const products = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, description: 'Premium noise-cancelling headphones', category: 'Electronics' },
  { id: 2, name: 'Smart Watch', price: 249.99, description: 'Fitness tracking and notifications', category: 'Electronics' },
  { id: 3, name: 'Laptop Stand', price: 49.99, description: 'Ergonomic adjustable stand', category: 'Accessories' },
  { id: 4, name: 'Mechanical Keyboard', price: 129.99, description: 'RGB backlit mechanical switches', category: 'Accessories' },
  { id: 5, name: 'USB-C Hub', price: 79.99, description: 'Multi-port adapter for laptops', category: 'Accessories' },
];

async function fetchProducts(category) {
  // Simulate async operation (in real app, this would be a database query)
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (category) {
    return products.filter(p => p.category === category);
  }
  return products;
}

export default function ProductList({ category }) {
  // Use React's use() hook to unwrap the promise
  // This is a Server Component, so this runs on the server
  const productsPromise = fetchProducts(category);
  const products = use(productsPromise);

  if (products.length === 0) {
    return (
      <div className="loading">
        <p>No products found in this category.</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '20px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      background: 'white'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        height: '200px',
        borderRadius: '6px',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3rem'
      }}>
        {product.name.charAt(0)}
      </div>
      <h3 style={{ marginBottom: '8px', color: '#333' }}>{product.name}</h3>
      <p style={{ 
        color: '#666', 
        fontSize: '0.9rem', 
        marginBottom: '12px',
        lineHeight: '1.5'
      }}>
        {product.description}
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15px'
      }}>
        <span style={{
          background: '#f0f0f0',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '0.85rem',
          color: '#666'
        }}>
          {product.category}
        </span>
        <span style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#667eea'
        }}>
          ${product.price}
        </span>
      </div>
    </div>
  );
}

