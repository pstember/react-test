import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
          }
          header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
          }
          .subtitle {
            opacity: 0.9;
            font-size: 1.1rem;
          }
          main {
            padding: 30px;
          }
          .loading {
            text-align: center;
            padding: 40px;
            color: #666;
          }
          .error {
            background: #fee;
            color: #c33;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
        `}</style>
      <div className="container">
        <header>
          <h1>🛍️ Product Catalog</h1>
          <p className="subtitle">Powered by React Server Components</p>
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}

