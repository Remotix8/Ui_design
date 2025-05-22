import React, { useState } from "react";
import axios from 'axios';
import './Report.css';

const API_BASE_URL = 'http://211.188.63.134:80';

export default function ReportModal({ isOpen, onClose, data, onUpdate = () => {} }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    receipt_number: data?.receipt_number || "",
    reporter_name: data?.reporter_name || "",
    car_model: data?.car_model || "",
    received_time: data?.received_time || "",
    action_content: data?.action_content || ""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.receipt_number) return "접수번호를 입력해주세요.";
    if (!formData.reporter_name) return "신고자명을 입력해주세요.";
    if (!formData.car_model) return "차량 모델을 입력해주세요.";
    if (!formData.received_time) return "접수시간을 입력해주세요.";
    if (!formData.action_content) return "조치내용을 입력해주세요.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formattedData = {
        ...formData,
        received_time: new Date(formData.received_time).toISOString()
      };

      console.log('전송할 데이터:', formattedData);

      const response = await axios.post(`${API_BASE_URL}/reports/create`, formattedData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('서버 응답:', response);

      if (response.status === 200 || response.status === 201) {
        try {
          await onUpdate();
        } catch (updateError) {
          console.error('목록 업데이트 실패:', updateError);
        }
        onClose();
      } else {
        throw new Error('저장 실패');
      }
    } catch (err) {
      console.error('보고서 저장 실패:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else if (err.response?.status === 422) {
        setError('입력하신 데이터가 올바르지 않습니다. 모든 필드를 확인해주세요.');
      } else {
        setError(err.response?.data?.detail || '보고서 저장 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      const response = await axios.delete(`${API_BASE_URL}/reports/delete/${data.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        await onUpdate();
        setShowDeleteConfirm(false);
        onClose();
      } else {
        throw new Error('삭제 실패');
      }
    } catch (err) {
      console.error('리포트 삭제 실패:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        setError(err.response?.data?.detail || '리포트 삭제 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Report</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showDeleteConfirm ? (
          <div className="delete-confirm">
            <p>이 리포트를 삭제하시겠습니까?</p>
            <div className="confirm-buttons">
              <button 
                onClick={handleDelete}
                className="confirm-yes"
                disabled={loading}
              >
                예
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="confirm-no"
                disabled={loading}
              >
                아니오
              </button>
            </div>
          </div>
        ) : (
          <form className="report-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="receipt_number">접수번호</label>
              <input
                type="text"
                id="receipt_number"
                name="receipt_number"
                value={formData.receipt_number}
                onChange={handleChange}
                disabled={loading || data?.id}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reporter_name">신고자명</label>
              <input
                type="text"
                id="reporter_name"
                name="reporter_name"
                value={formData.reporter_name}
                onChange={handleChange}
                disabled={loading || data?.id}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="car_model">차량 모델</label>
              <input
                type="text"
                id="car_model"
                name="car_model"
                value={formData.car_model}
                onChange={handleChange}
                disabled={loading || data?.id}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="received_time">접수시간</label>
              <input
                type="datetime-local"
                id="received_time"
                name="received_time"
                value={formData.received_time}
                onChange={handleChange}
                disabled={loading || data?.id}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="action_content">조치내용</label>
              <textarea
                id="action_content"
                name="action_content"
                rows="4"
                value={formData.action_content}
                onChange={handleChange}
                disabled={loading || data?.id}
                required
              />
            </div>

            <div className="form-actions">
              {data?.id ? (
                <button 
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="delete-button"
                  disabled={loading}
                >
                  {loading ? '삭제 중...' : '삭제'}
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={loading}
                  className={loading ? 'loading' : ''}
                >
                  {loading ? '처리 중...' : '저장'}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
