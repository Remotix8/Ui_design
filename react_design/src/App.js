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
import RegisterModal from './components/RegisterModal';


function App() {
  // 설정 모달 오픈 상태 관리
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);


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
          <div className="global-lock-screen" />
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLogin={(id) => {
              setIsLogin(true);
              setUserId(id);
              setShowLoginModal(false);
            }}
            onSwitchToRegister={() => {
              setShowLoginModal(false);
              setShowRegisterModal(true);
            }}
          />
        </>
      )}

      {/* 회원가입 모달 */}
      {showRegisterModal && (
        <>
          <div className="global-lock-screen" />
          <RegisterModal
            onClose={() => setShowRegisterModal(false)}
            onSwitchToLogin={() => {
              setShowRegisterModal(false);
              setShowLoginModal(true);
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

      {/* 설정 모달 조건부 렌더링 */}
      {isSettingsOpen && (
        <SettingsModal onClose={() => setSettingsOpen(false)} />
      )}

      

    </div>
  );
}

export default App;
