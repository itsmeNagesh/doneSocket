import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { DataProvider } from './context/DataContext.jsx'; // Import Context Provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>  {/* Wrap App with Context */}
      <App />
    </DataProvider>
  </StrictMode>
);
