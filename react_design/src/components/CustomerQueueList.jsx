// src/components/CustomerQueueList.jsx
import React, { useState } from 'react';
import './CustomerQueueList.css';

export default function CustomerQueueList({ customers, onConnect, isConnected }) {
  const [selected, setSelected] = useState(null);

  const handleItemClick = (cust) => {
    if (isConnected) return; // 이미 연결된 상태면 클릭 무시
    setSelected(cust);
  };

  const handleConfirm = () => {
    onConnect(selected);
    setSelected(null);
  };

  const handleCancel = () => setSelected(null);

  return (
    <div className="customer-queue-panel">
      {/* 헤더 */}
      <div className="customer-queue-header">
        <h3 className="customer-queue-title">Customer Queue</h3>
        <span className="customer-badge">{customers.length}</span>
      </div>

      {/* 리스트 */}
      <ul className={`customer-list ${isConnected ? 'disabled' : ''}`}>
        {customers.map((cust, index) => (
          <li 
            key={cust.id} 
            className={`customer-item ${isConnected ? 'disabled' : ''}`} 
            onClick={() => handleItemClick(cust)}
          >
            <span className="customer-item-number">{index + 1}</span>
            <span className="customer-item-name">
              {cust.name} [{cust.region}]
            </span>
            <span className="customer-item-alert">❗</span>
          </li>
        ))}
      </ul>

      {/* 모달 - 상세 정보 표시 */}
      {selected && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h3 className="modal-title">고객 상세 정보</h3>
              <div className="customer-details">
                <p><strong>고객명:</strong> {selected.name}</p>
                <p><strong>현재 지역:</strong> {selected.region}</p>
                <p><strong>차량모델:</strong> {selected.model}</p>
                <p><strong>신고 시간:</strong> {selected.timestamp}</p>
              </div>
              <p className="modal-question">해당 고객을 연결하시겠습니까?</p>
              <div className="modal-buttons">
                <button className="btn-yes" onClick={handleConfirm}>예</button>
                <button className="btn-no" onClick={handleCancel}>아니오</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
