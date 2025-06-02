import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import "ol/ol.css";
import "ol-ext/dist/ol-ext.css";

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
