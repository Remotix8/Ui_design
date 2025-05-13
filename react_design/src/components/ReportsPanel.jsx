import React from 'react';
import './ReportsPanel.css';

/** 더미 데이터: props로 안 넘겨주면 이걸 씁니다 */
const dummyReports = [
  { title: '주차 문제',       date: '2025-05-10', status: 'done' },
  { title: '시동 꺼짐',       date: '2025-05-01', status: 'done'    },
  { title: '기름 없음',       date: '2025-04-01', status: 'done' },
  { title: '다른 차량과 충돌', date: '2025-03-25', status: 'done'    },
  { title: '경로 탐색 문제', date: '2025-03-15', status: 'done' },
  { title: '몰라',         date: '2025-01-30', status: 'done'    },
  { title: '허허허',       date: '2024-12-20', status: 'done' },
];

/**
 * ReportsPanel
 * @param {Array<{ title: string, date: string, status?: string }>} reports
 */
export default function ReportsPanel({ reports }) {
  const list = reports && reports.length > 0 ? reports : dummyReports;
  const pendingCount = list.filter(r => r.status === 'done').length;

  return (
    <div className="reports-panel">
      <div className="reports-header">
        <span className="reports-title">리포트</span>
        {pendingCount > 0 && <span className="badge">{pendingCount}</span>}
      </div>
      <ul className="reports-list">
        {list.map((r, i) => (
          <li key={i} className="report-item">
            <span className="report-text">{r.title}</span>
            <span className="report-time">{r.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
