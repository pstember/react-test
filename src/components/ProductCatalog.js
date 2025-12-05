import React, { Suspense } from 'react';
import ProductList from './ProductList.js';
import CategoryFilter from './CategoryFilter.js';

export default function ProductCatalog({ url }) {
  const searchParams = new URL(url, 'http://localhost:3000').searchParams;
  const category = searchParams.get('category') || null;

  return (
    <div>
      <CategoryFilter currentCategory={category} />
      <Suspense fallback={<div className="loading">Loading products...</div>}>
        <ProductList category={category} />
      </Suspense>
    </div>
  );
}


