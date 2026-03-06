import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Providers from './app/providers';

// eslint-disable-next-line no-console
console.log(`App version: ${__APP_VERSION__}`);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers />
  </StrictMode>,
);
