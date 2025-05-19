// src/components/CustomerQueueList.jsx
import React, { useState } from 'react';
import './CustomerQueueList.css';

export default function CustomerQueueList({ customers, onConnect }) {
  const [selected, setSelected] = useState(null);

  const handleItemClick = (cust) => setSelected(cust);
  const handleConfirm   = () => { onConnect(selected); setSelected(null); };
  const handleCancel    = () => setSelected(null);

  return (
    <div className="customer-queue-panel">
      {/* 헤더 */}
      <div className="customer-queue-header">
        <h3 className="customer-queue-title">Customer Queue</h3>
        <span className="customer-badge">{customers.length}</span>
      </div>

      {/* 리스트 */}
      <ul className="customer-list">
        {customers.map(cust => (
          <li key={cust.id} className="customer-item" onClick={() => handleItemClick(cust)}>
            <span className="customer-item-name">{cust.name}</span>
          </li>
        ))}
      </ul>

      {/* 모달 */}
      {selected && (
        <div className="modal-overlay">
          <div className="modal">
            <p>“{selected.name}” 고객을 연결하시겠습니까?</p>
            <div className="modal-buttons">
              <button className="btn-yes" onClick={handleConfirm}>예</button>
              <button className="btn-no"  onClick={handleCancel}>아니오</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
