import React, { useState } from 'react';
import './LoginModal.css'; // 스타일 재사용
import logo from '../assets/images/logo.png';

function RegisterModal({ onClose, onSwitchToLogin }) {
  const [newId, setNewId] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [companyCode, setCompanyCode] = useState('');

  const handleRegister = () => {
    if (newId === '2') {
      alert('이미 등록된 아이디입니다.');
      return;
    }
    if (newPw !== confirmPw) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    if (companyCode !== '4') {
      alert('회사코드가 틀렸습니다.');
      return;
    }

    alert('회원가입이 완료되었습니다.');
    onSwitchToLogin(); // 로그인 창으로 전환
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal" style={{ width: '380px' }}>
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">회원가입</h2>

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
        <input
          type="text"
          placeholder="회사 코드"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
          className="login-input"
        />

        <button onClick={handleRegister} className="login-button">
          회원가입
        </button>
        
        <button className="close-button" onClick={onSwitchToLogin}>로그인하기</button>

      </div>
    </div>
  );
}

export default RegisterModal;
