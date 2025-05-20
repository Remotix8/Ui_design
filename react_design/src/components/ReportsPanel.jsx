import React from 'react';
import './ReportsPanel.css';

/** 더미 데이터: props로 안 넘겨주면 이걸 씁니다
const dummyReports = [
  { title: '주차 문제',       date: '2025-05-10', status: 'done' },
  { title: '시동 꺼짐',       date: '2025-05-01', status: 'done'    },
  { title: '기름 없음',       date: '2025-04-01', status: 'done' },
  { title: '다른 차량과 충돌', date: '2025-03-25', status: 'done'    },
  { title: '경로 탐색 문제', date: '2025-03-15', status: 'done' },
  { title: '몰라',         date: '2025-01-30', status: 'done'    },
  { title: '허허허',       date: '2024-12-20', status: 'done' },
];
*/
const dummyReports = [
  {
    title: "주차 문제",
    date: "2025-05-10",
    receptionId: "001",
    reporterName: "일등이",
    handlerName: "김가천",
    reporterModel: "현대 아반떼",
    receptionDateTime: "2025-05-10T10:00",
    actionDetails: "차단봉 설치 예정",
    status: "done"
  },
  {
    title: "시동 꺼짐",
    date: "2025-05-01",
    receptionId: "002",
    reporterName: "이등이",
    handlerName: "서무당",
    reporterModel: "기아 K5",
    receptionDateTime: "2025-05-01T09:30",
    actionDetails: "정비소 연결 완료",
    status: "done"
  },
  {
    title: "기름 없음",
    date: "2025-04-01",
    receptionId: "003",
    reporterName: "삼등이",
    handlerName: "최무한",
    reporterModel: "현대 벨로스터N",
    receptionDateTime: "2025-04-01T14:15",
    actionDetails: "즉시 주유 요청",
    status: "done"
  }
];


/**
 * ReportsPanel
 * @param {Array<{ title: string, date: string, status?: string }>} reports
 */
export default function ReportsPanel({ reports, onSelectReport }) {
  const list = reports && reports.length > 0 ? reports : dummyReports;
  const pendingCount = list.filter(r => r.status === 'done').length;

  return (
    <div className="reports-panel">
      <div className="reports-header">
        <span className="reports-title">Report List</span>
        {pendingCount > 0 && <span className="badge">{pendingCount}</span>}
      </div>
      <ul className="reports-list">
        {list.map((r, i) => (
          <li key={i} className="report-item" onClick={() => onSelectReport(r)}>
          <span className="report-text">{r.title}</span>
          <span className="report-time">{r.date}</span>
        </li>
        ))}
      </ul>
    </div>
  );
}
