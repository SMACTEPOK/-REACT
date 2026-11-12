import React, { memo } from 'react';

export const ProductItem = memo(function ProductItem({ 
  product, 
  isEditing, 
  editData, 
  onEditChange, 
  onStartEdit, 
  onSaveEdit, 
  onCancelEdit, 
  onDelete 
}) {
  if (isEditing) {
    return (
      <li className="product-item product-item--editing">
        <div className="product-item__edit-form">
          <input 
            type="text" 
            value={editData.name} 
            onChange={e => onEditChange({...editData, name: e.target.value})} 
            className="lab-input"
            placeholder="Назва"
          />
          <input 
            type="number" 
            value={editData.price} 
            onChange={e => onEditChange({...editData, price: e.target.value})} 
            className="lab-input"
            placeholder="Ціна"
          />
          <button className="btn btn--small" onClick={() => onSaveEdit(product.id)}>Зберегти</button>
          <button className="btn btn--small" onClick={onCancelEdit}>Скасувати</button>
        </div>
      </li>
    );
  }

  return (
    <li className={`product-item ${!product.inStock ? 'product-item--out' : ''}`}>
      <div className="product-item__info">
        <span className="product-item__name">{product.name}</span>
        <span className="product-item__price">{product.price} грн</span>
        <span className="product-item__status">
          {product.inStock ? 'В наявності' : 'Немає'}
        </span>
      </div>
      <div className="product-item__actions">
        <button className="btn btn--small" onClick={() => onStartEdit(product)}>Ред.</button>
        <button className="btn btn--small btn--danger" onClick={() => onDelete(product.id, product.name)}>Вид.</button>
      </div>
    </li>
  );
});
