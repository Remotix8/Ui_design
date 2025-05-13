// src/components/NotificationCard.jsx
import React from 'react';
import './NotificationCard.css';

/**
 * NotificationCard
 * @param {Array<{ message: string, time: string, type?: string, read?: boolean }>} notifications
 * @param {function} onViewAll - 모두 보기 버튼 클릭 핸들러
 */
export default function NotificationCard({ notifications = [], onViewAll = () => {} }) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="card notification-card">
      <div className="notif-header">
        <span className="notif-title">알림</span>
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>
      <ul className="notif-list">
        {notifications.slice(0, 3).map((n, i) => (
          <li key={i} className="notif-item">
            <span className={`icon ${n.type || ''}`}></span>
            <span className="notif-text">{n.message}</span>
            <span className="notif-time">{n.time}</span>
          </li>
        ))}
      </ul>
      <button className="btn-secondary" onClick={onViewAll}>
        모두 보기
      </button>
    </div>
  );
}
