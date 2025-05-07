import React from 'react';
import './Navigation.css';
import { FaCog, FaBell } from 'react-icons/fa';
import logo from '../assets/images/logo.png';

// onOpenSettings prop을 받아 환경설정 버튼 클릭 시 콜백 호출
const Navigation = ({ onOpenSettings }) => {
  return (
    <nav className="navigation">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="nav-logo" />
      </div>
      <div className="nav-right">
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