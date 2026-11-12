import React, { useState, useCallback } from 'react';
import { initialProducts } from '../data/productsData';
import { ProductItem } from './ProductItem';

export function ProductManager() {
  const [products, setProducts] = useState(initialProducts);
  
  // Стан для додавання
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newInStock, setNewInStock] = useState(true);
  const [newCategory, setNewCategory] = useState('Кераміка');

  // Стан для редагування
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '' });

  // Стан для фільтрації та сортування (Завдання 5)
  const [filter, setFilter] = useState('all'); // all, inStock, outStock
  const [sort, setSort] = useState('none'); // none, nameAsc, nameDesc, priceAsc, priceDesc

  // Стан для згортання категорій (Індивідуальне 4)
  const [collapsedCats, setCollapsedCats] = useState({});

  // --- Callbacks (useCallback для оптимізації) ---
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim() || isNaN(newPrice) || Number(newPrice) <= 0) return;

    const newProduct = {
      id: Date.now() + Math.random(),
      name: newName.trim(),
      price: Number(newPrice),
      inStock: newInStock,
      category: newCategory
    };

    setProducts(prev => [...prev, newProduct]);
    setNewName('');
    setNewPrice('');
    setNewInStock(true);
  };

  const handleDelete = useCallback((id, name) => {
    if (window.confirm(`Ви впевнені, що хочете видалити "${name}"?`)) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  }, []);

  const startEdit = useCallback((product) => {
    setEditingId(product.id);
    setEditData({ name: product.name, price: product.price });
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditData({ name: '', price: '' });
  }, []);

  const saveEdit = useCallback((id) => {
    if (!editData.name.trim() || isNaN(editData.price) || Number(editData.price) <= 0) return;

    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, name: editData.name.trim(), price: Number(editData.price) } : p
    ));
    setEditingId(null);
  }, [editData]);

  const handleEditChange = useCallback((data) => {
    setEditData(data);
  }, []);

  const toggleCategory = (cat) => {
    setCollapsedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  // --- Логіка відображення (Фільтрація, Сортування, Групування) ---
  
  // 1. Фільтрація
  let processed = products.filter(p => {
    if (filter === 'inStock') return p.inStock;
    if (filter === 'outStock') return !p.inStock;
    return true;
  });

  // 2. Сортування (створюємо копію, щоб не мутувати стан)
  if (sort !== 'none') {
    processed = [...processed].sort((a, b) => {
      if (sort === 'nameAsc') return a.name.localeCompare(b.name);
      if (sort === 'nameDesc') return b.name.localeCompare(a.name);
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      return 0;
    });
  }

  // 3. Групування за категоріями (Індивідуальне завдання 4)
  const grouped = processed.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">LAB 06 / Списки та ключі</h2>

      {/* Форма додавання (Завдання 2) */}
      <form onSubmit={handleAdd} className="add-form">
        <input 
          type="text" 
          placeholder="Назва товару" 
          value={newName} 
          onChange={e => setNewName(e.target.value)} 
          className="lab-input" 
        />
        <input 
          type="number" 
          placeholder="Ціна (грн)" 
          value={newPrice} 
          onChange={e => setNewPrice(e.target.value)} 
          className="lab-input" 
        />
        <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="lab-input">
          <option value="Кераміка">Кераміка</option>
          <option value="Текстиль">Текстиль</option>
          <option value="Дерево">Дерево</option>
          <option value="Декор">Декор</option>
        </select>
        <label className="checkbox-label">
          <input type="checkbox" checked={newInStock} onChange={e => setNewInStock(e.target.checked)} />
          В наявності
        </label>
        <button type="submit" className="btn">Додати</button>
      </form>

      {/* Панель фільтрації та сортування (Завдання 5) */}
      <div className="controls-bar">
        <select value={filter} onChange={e => setFilter(e.target.value)} className="lab-input">
          <option value="all">Всі товари</option>
          <option value="inStock">Тільки в наявності</option>
          <option value="outStock">Тільки відсутні</option>
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} className="lab-input">
          <option value="none">Без сортування</option>
          <option value="nameAsc">Назва (А-Я)</option>
          <option value="nameDesc">Назва (Я-А)</option>
          <option value="priceAsc">Ціна (зрост.)</option>
          <option value="priceDesc">Ціна (спад.)</option>
        </select>
      </div>

      {/* Рендеринг згрупованих списків (Завдання 1 + Індивідуальне 4) */}
      <div className="groups-container">
        {Object.keys(grouped).length === 0 ? (
          <p className="empty-state">Нічого не знайдено</p>
        ) : (
          Object.entries(grouped).map(([category, items]) => {
            const isCollapsed = collapsedCats[category];
            return (
              <div key={category} className="category-group">
                <button 
                  className="category-header" 
                  onClick={() => toggleCategory(category)}
                >
                  <span>{isCollapsed ? '►' : '▼'} {category}</span>
                  <span className="category-count">{items.length}</span>
                </button>
                
                {!isCollapsed && (
                  <ul className="product-list">
                    {items.map(product => (
                      <ProductItem 
                        key={product.id} 
                        product={product}
                        isEditing={editingId === product.id}
                        editData={editData}
                        onEditChange={handleEditChange}
                        onStartEdit={startEdit}
                        onSaveEdit={saveEdit}
                        onCancelEdit={cancelEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
