import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReportsPanel.css';

const API_BASE_URL = 'http://211.188.63.134:80';

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
export default function ReportsPanel({ onSelectReport, onRefreshNeeded }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 토큰 확인 함수
  const checkToken = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      console.log('토큰 또는 사용자 정보 없음 - 로그인 필요');
      window.location.href = '/login';
      return false;
    }

    return true;
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    console.log('로그아웃 처리');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const fetchReports = async () => {
    if (!checkToken()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      // 리포트 ID 목록을 가져옵니다
      const listsResponse = await axios.get(`${API_BASE_URL}/reports/lists`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!Array.isArray(listsResponse.data)) {
        throw new Error('서버에서 올바른 형식의 데이터를 받지 못했습니다.');
      }

      // 각 접수번호에 대한 상세 정보를 가져옵니다
      const reportsPromises = listsResponse.data.map(async (id) => {
        try {
          const reportResponse = await axios.get(`${API_BASE_URL}/reports/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const reportData = reportResponse.data;
          const receivedTime = new Date(reportData.received_time);
          
          return {
            id: id,
            receipt_number: reportData.receipt_number,
            title: `${reportData.reporter_name} - ${reportData.car_model}`,
            date: receivedTime.toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }),
            reporter_name: reportData.reporter_name,
            handler_name: reportData.handler_name,
            car_model: reportData.car_model,
            received_time: reportData.received_time,
            action_content: reportData.action_content
          };
        } catch (err) {
          console.error(`접수번호 ${id} 조회 실패:`, err);
          if (err.response?.status === 401) {
            handleLogout();
          }
          return null;
        }
      });

      const reportDetails = (await Promise.all(reportsPromises))
        .filter(report => report !== null);
      
      console.log('보고서 목록:', reportDetails);
      
      // 날짜 기준으로 내림차순 정렬 (최신순)
      const sortedReports = reportDetails.sort((a, b) => 
        new Date(b.received_time) - new Date(a.received_time)
      );
      
      setReports(sortedReports);
    } catch (err) {
      console.error('보고서 데이터 로딩 실패:', err);
      if (err.response?.status === 401) {
        handleLogout();
      } else {
        setError(err.message || '보고서 목록을 불러오는데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 초기 로딩
  useEffect(() => {
    if (checkToken()) {
      fetchReports();
    }
  }, []);

  // 외부에서 새로고침이 필요할 때 호출되는 effect
  useEffect(() => {
    if (onRefreshNeeded && checkToken()) {
      fetchReports();
    }
  }, [onRefreshNeeded]);

  if (loading) {
    return (
      <div className="reports-panel">
        <div className="reports-header">
          <span className="reports-title">Report List</span>
        </div>
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reports-panel">
        <div className="reports-header">
          <span className="reports-title">Report List</span>
        </div>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="reports-panel">
      <div className="reports-header">
        <span className="reports-title">Report List</span>
        <span className="badge">{reports.length}</span>
      </div>
      <ul className="reports-list">
        {reports.map((r) => (
          <li key={r.id} className="report-item" onClick={() => onSelectReport(r)}>
            <span className="report-text">{r.title}</span>
            <span className="report-time">{r.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
