import React from 'react';
import ProductCatalog from './components/ProductCatalog.js';
import Layout from './components/Layout.js';

export default function App({ url }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Product Catalog - React Server Components Demo</title>
      </head>
      <body>
        <div id="root">
          <Layout>
            <ProductCatalog url={url} />
          </Layout>
        </div>
      </body>
    </html>
  );
}

