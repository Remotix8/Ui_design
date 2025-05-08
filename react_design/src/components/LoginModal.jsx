import { useState } from "react";
import "./LoginModal.css";
import logo from '../assets/images/logo.png';

function LoginModal({ onClose, onLogin }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    // 서버 연동 시 인증 로직 추가
    if (true) {
      onLogin(id);
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title">로그인</h2>

        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="login-input"
        />

        <button className="login-button" onClick={handleLogin}>
          로그인
        </button>

        <p className="signup-link" onClick={() => alert("회원가입 페이지로 이동")}>
          회원가입
        </p>

        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
