import { useState, useEffect } from "react";
import "./LoginModal.css";
import logo from '../assets/images/logo.png';
import axios from 'axios';

// API 기본 설정
const API_BASE_URL = 'http://211.188.63.134:80';

function LoginModal({ onClose, onLogin, onSwitchToRegister }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!id || !pw) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const loginData = {
        email: id,
        password: pw
      };
      
      console.log('로그인 시도:', JSON.stringify(loginData, null, 2));

      const response = await axios.post(`${API_BASE_URL}/users/login`, loginData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 5000
      });

      console.log('서버 응답:', JSON.stringify(response.data, null, 2));

      if (response.data.error || !response.data.access_token) {
        setError(response.data.message || '로그인에 실패했습니다.');
      } else {
        // 토큰과 사용자 정보 저장
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('token_type', response.data.token_type);
        localStorage.setItem('user', id);
        
        // 로그인 상태 업데이트 및 모달 닫기
        onLogin(id);
        onClose();
      }
    } catch (err) {
      console.error('로그인 에러:', err.message);
      if (err.code === 'ECONNABORTED') {
        setError('서버 응답 시간이 초과되었습니다. 네트워크 상태를 확인해주세요.');
      } else if (err.response) {
        // 서버가 응답을 반환했지만 에러 상태인 경우
        console.error('서버 에러 응답:', JSON.stringify(err.response.data, null, 2));
        setError(err.response.data?.message || err.response.data?.detail || '로그인에 실패했습니다.');
      } else if (err.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        console.error('응답 없음:', err.message);
        setError('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
      } else {
        // 요청 설정 중 에러가 발생한 경우
        console.error('요청 설정 에러:', err.message);
        setError('로그인 요청 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 자동 로그인 체크
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      onLogin(user);
      onClose();
    }
  }, [onLogin, onClose]);

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">로그인</h2>
        {error && <div className="error-message">{error}</div>}

        <input
          type="email"
          placeholder="이메일"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="login-input"
          disabled={isLoading}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="login-input"
          disabled={isLoading}
        />

        <button 
          className="login-button" 
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>

        <p
          className="signup-link"
          onClick={onSwitchToRegister}
          style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
        >
          회원가입
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
