// Client-side hydration script
import { hydrateRoot } from 'react-dom/client';
import React from 'react';
import App from '/src/App.js';

// Get the initial URL from the current page
const url = window.location.pathname + window.location.search;

// Hydrate the React app on the client
const root = document.getElementById('root');
if (root) {
  hydrateRoot(root, React.createElement(App, { url }));
}

