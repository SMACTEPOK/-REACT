import React from 'react';
import Lab6Page from './pages/Lab6Page';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <span className="app__brand-mark">✱</span>
          CRAFTMARKET
          <span className="app__brand-tag">LAB 6</span>
        </div>
      </header>
      <main className="app__main">
        <Lab6Page />
      </main>
      <footer className="app__footer">
        <p>© 2026 CRAFTMARKET · Лабораторна робота 6 · Списки та ключі</p>
      </footer>
    </div>
  );
}

export default App;
