'use client';

import React from 'react';

// Client Component - handles user interactions
export default function CategoryFilter({ currentCategory }) {
  const categories = ['All', 'Electronics', 'Accessories'];

  const handleCategoryChange = (category) => {
    const url = category === 'All' 
      ? '/'
      : `/?category=${category}`;
    window.location.href = url;
  };

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      flexWrap: 'wrap'
    }}>
      {categories.map(category => {
        const isActive = (category === 'All' && !currentCategory) || 
                        (category === currentCategory);
        return (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              background: isActive 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : '#f0f0f0',
              color: isActive ? 'white' : '#666',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: isActive ? '600' : '400',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = '#e0e0e0';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = '#f0f0f0';
              }
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}


