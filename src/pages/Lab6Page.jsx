import React from 'react';
import { ProductManager } from '../components/ProductManager';
import './Lab6Page.css';

export default function Lab6Page() {
  return (
    <div className="lab-page">
      <header className="lab-header">
        <h1 className="lab-title">LISTS & KEYS</h1>
        <p className="lab-subtitle">Робота зі списками, ключами та оптимізація</p>
      </header>
      <main className="lab-main">
        <ProductManager />
      </main>
    </div>
  );
}
