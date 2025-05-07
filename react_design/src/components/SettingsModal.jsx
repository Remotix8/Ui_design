// src/components/SettingsModal.jsx
import React from 'react';

export default function SettingsModal({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
      }}
      onClick={onClose} // 백드롭 클릭 시 모달 닫기
    >
      <div
        style={{
          background: '#fff',
          color: '#000',
          borderRadius: '1rem',
          padding: '1.5rem',
          width: '24rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
        onClick={e => e.stopPropagation()} // 내부 클릭 시 전파 방지
      >
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>설정</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </header>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* 다크 모드 토글 */}
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>다크 모드</span>
            <input type="checkbox" />
          </label>

          {/* 언어 선택 */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '0.25rem' }}>언어</label>
            <select style={{ padding: '0.25rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}>
              <option value="ko">한국어</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* 추가 옵션을 여기에 */}
        </section>
      </div>
    </div>
  );
}
