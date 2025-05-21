import React, { useState } from 'react';
import './LoginModal.css'; // 스타일 재사용
import logo from '../assets/images/logo.png';
import axios from 'axios';

// API 기본 설정
const API_BASE_URL = 'http://211.188.63.134:80';

function RegisterModal({ onClose, onSwitchToLogin }) {
  const [newId, setNewId] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (newPw !== confirmPw) {
      setError('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, {
        email: newId,
        password: newPw
      });

      if (response.status === 200) {  // 성공 상태 코드 확인
        alert('회원가입이 완료되었습니다.');
        onSwitchToLogin();  // 로그인 화면으로 전환
      } else {
        setError('회원가입에 실패했습니다.');
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError('이미 등록된 아이디입니다.');
      } else {
        setError(err.response?.data?.message || '회원가입에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal" style={{ width: '380px' }}>
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">회원가입</h2>
        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          placeholder="신규 아이디"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="신규 비밀번호"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          className="login-input"
        />

        <button 
          onClick={handleRegister} 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? '회원가입 중...' : '회원가입'}
        </button>
        
        <button className="close-button" onClick={onSwitchToLogin}>로그인하기</button>

      </div>
    </div>
  );
}

export default RegisterModal;
