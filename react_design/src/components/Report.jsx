import React, { useState } from "react";
import './Report.css';

export default function ReportModal({ isOpen, onClose }) {
  // useState는 컴포넌트 함수 내에서 항상 호출되어야 합니다.
  const [formData, setFormData] = useState({
    receptionId: "",
    reporterName: "",
    handlerName: "",
    reporterModel: "",
    receptionDateTime: "",
    actionDetails: ""
  });

  // early return을 통해 모달이 닫힐 때 렌더링을 중단합니다.
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // 폼 제출 시 페이지 새로 고침 방지
    console.log("폼 제출 데이터:", formData);
    // 데이터 처리 로직 추가 (API 요청 등)
    onClose(); // 제출 후 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Report</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <form className="report-form" onSubmit={handleSubmit}>
          <div className="form-group">
  <label htmlFor="receptionId">접수번호</label>
  <input
    type="text"
    id="receptionId"
    name="receptionId"
    value={formData.receptionId}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label htmlFor="reporterName">신고자명</label>
  <input
    type="text"
    id="reporterName"
    name="reporterName"
    value={formData.reporterName}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label htmlFor="handlerName">담당자명</label>
  <input
    type="text"
    id="handlerName"
    name="handlerName"
    value={formData.handlerName}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label htmlFor="reporterModel">차량 모델</label> {/* 오타: 차량량모델 → 차량 모델 */}
  <input
    type="text"
    id="reporterModel"
    name="reporterModel"
    value={formData.reporterModel}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label htmlFor="receptionDateTime">접수시간</label>
  <input
    type="datetime-local"
    id="receptionDateTime"
    name="receptionDateTime"
    value={formData.receptionDateTime}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label htmlFor="actionDetails">조치내용</label>
  <textarea
    id="actionDetails"
    name="actionDetails"
    rows="4"
    value={formData.actionDetails}
    onChange={handleChange}
  />
</div>


          <div className="form-actions">
            <button type="submit">저장</button>
          </div>
        </form>
      </div>
    </div>
  );
}
