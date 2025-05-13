import React from 'react';
import './Navigation.css';
import { FaCog, FaBell } from 'react-icons/fa';
import logo from '../assets/images/logo.png';

// onOpenSettings prop을 받아 환경설정 버튼 클릭 시 콜백 호출
const Navigation = ({ onOpenSettings, isLogin, userId, onLoginClick, onLogout, profileUrl, showProfilePopup, setShowProfilePopup }) => {
  return (
    <nav className="navigation">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="nav-logo" />
      </div>
      <div className="nav-right">

        {/* ✅ 로그인 상태에 따라 표시되는 부분 */}
        {isLogin ? (
          <>

            <img
              src={profileUrl}
              alt="profile"
              className="nav-profile-pic"
              onClick={() => setShowProfilePopup(!showProfilePopup)}
            />

            {/* 로그인 시: 유저 ID + 로그아웃 버튼 */}
            <span className="nav-user">{userId}</span>
            <button className="nav-text-button" onClick={onLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            {/* 로그인 안 된 상태: 로그인 버튼 */}
            <button className="nav-text-button " onClick={onLoginClick}>
              로그인
            </button>
          </>
        )}
        {/* 기존 버튼들: 환경설정, 알림 */}
        <button
          className="nav-button"
          title="환경설정"
          onClick={onOpenSettings}
        >
          <FaCog className="nav-icon" />
        </button>
        <button className="nav-button" title="알림">
          <FaBell className="nav-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;