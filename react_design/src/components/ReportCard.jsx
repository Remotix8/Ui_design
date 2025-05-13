// src/components/ReportCard.jsx
import React from 'react';
import './ReportCard.css';

/**
 * ReportCard
 * @param {number} pendingCount - 미작성 보고서 개수
 * @param {function} onWriteClick - 작성하기 버튼 클릭 핸들러
 */
export default function ReportCard({ pendingCount = 0, onWriteClick = () => {} }) {
  return (
    <div className="card report-card">
      <div className="report-header">
        <span className="report-title">조치 보고서</span>
        {pendingCount > 0 && <span className="badge">{pendingCount}</span>}
      </div>
      <button className="btn-primary" onClick={onWriteClick}>
        작성하기
      </button>
    </div>
  );
}
