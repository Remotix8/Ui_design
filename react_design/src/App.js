import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import SettingsModal from './components/SettingsModal';
import StreamPanel from './components/StreamPanel';
import TopicPanel from './components/TopicPanel';
import BatteryPanel from './components/BatteryPanel';
import SpeedPanel from './components/SpeedPanel';
import PlatformControlPanel from './components/PlatformControlPanel';
import LoginModal from './components/LoginModal';
import ReportModal from "./components/Report";
import { FaRegFileAlt } from 'react-icons/fa';



function App() {
  // 설정 모달 오픈 상태 관리
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      {/* 네비게이션에 onOpenSettings prop 전달 */}
      <Navigation 
      onOpenSettings={() => setSettingsOpen(true)}
      isLogin={isLogin}
        userId={userId}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={() => {
          setIsLogin(false);
          setUserId('');
        }}
      />

      {/* 로그인 모달 */}
      {showLoginModal && (
        <>
        <div className="global-lock-screen"></div>

        
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={(id) => {
            setIsLogin(true);
            setUserId(id);
            setShowLoginModal(false);
          }}
        />
        </>
      )}
      

      {/* 각 패널 컴포넌트 */}
      <StreamPanel />
      <TopicPanel />
      <BatteryPanel />
      <SpeedPanel />
      <PlatformControlPanel />

      {isSettingsOpen && (
        <SettingsModal onClose={() => setSettingsOpen(false)} />
      )}

      {/* 보고서 작성 버튼 (좌측 하단 고정) */}
      <div className="report-button-wrapper">
        <button className="custom-report-button" onClick={() => setIsModalOpen(true)}>
          <FaRegFileAlt className="report-icon" />
          <span>보고서 작성</span>
        </button>
      </div>
      

      {/* 보고서 모달 */}
      <ReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
