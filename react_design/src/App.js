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
import ProfilePopup from './components/ProfilePopup';



function App() {
  // 설정 모달 오픈 상태 관리
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileUrl = "/assets/images/sample_profile.png"; // 예시 이미지




    return (
    <div className={`App ${showLoginModal || showRegisterModal ? 'locked-ui' : ''}`}>

      {/* 로그인/회원가입 모달 */}
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

      {/* 로그인 상태에서만 표시되는 전체 UI */}
      {isLogin && (
        <>
          <Navigation
            onOpenSettings={() => setSettingsOpen(true)}
            isLogin={isLogin}
            userId={userId}
            onLoginClick={() => setShowLoginModal(true)}
            onLogout={() => {
              setIsLogin(false);
              setUserId('');
              setShowLoginModal(true); // 로그아웃 시 로그인 창 다시 표시
            }}
            profileUrl={profileUrl}
            showProfilePopup={showProfilePopup}
            setShowProfilePopup={setShowProfilePopup}
          />
          {showProfilePopup && (
            <ProfilePopup
              userId={userId}
              profileUrl={profileUrl}
              onClose={() => setShowProfilePopup(false)}
            />
          )}

          <StreamPanel />
          <TopicPanel />
          <BatteryPanel />
          <SpeedPanel />
          <PlatformControlPanel />

          {isSettingsOpen && (
            <SettingsModal onClose={() => setSettingsOpen(false)} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
