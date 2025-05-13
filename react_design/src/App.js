import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import SettingsModal from './components/SettingsModal';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ProfilePopup from './components/ProfilePopup';

import StreamPanel from './components/StreamPanel';
import TopicPanel from './components/TopicPanel';
import BatteryPanel from './components/BatteryPanel';
import SpeedPanel from './components/SpeedPanel';
import PlatformControlPanel from './components/PlatformControlPanel';

import ReportCard from './components/ReportCard';
import NotificationCard from './components/NotificationCard';

function App() {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileUrl = "/assets/images/sample_profile.png";

  return (
    <div className={`App ${showLoginModal || showRegisterModal ? 'locked-ui' : ''}`}>
      {/* 로그인/회원가입 모달 띄우기 (화면 잠금) */}
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

      {/* 로그인 상태라면 메인 UI 렌더링 */}
      {isLogin && (
        <>
          <Navigation
            onOpenSettings={() => setSettingsOpen(true)}
            isLogin={isLogin}
            userId={userId}
            profileUrl={profileUrl}
            onLoginClick={() => setShowLoginModal(true)}
            onLogout={() => {
              setIsLogin(false);
              setUserId('');
              setShowLoginModal(true);
            }}
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

          <main className="dashboard">
            <section className="dashboard__left">
              <StreamPanel />
            </section>

            <aside className="dashboard__right">
              <div className="dashboard__topRow">
                <ReportCard
                  pendingCount={3}
                  onWriteClick={() => console.log('Write report')}
                />
                <NotificationCard
                  notifications={[
                    { message: '배터리 경고: 15%', time: '2m ago', type: 'warning', read: false },
                    { message: '원격조작 요청 #1234', time: '5m ago', type: 'info', read: false },
                  ]}
                  onViewAll={() => console.log('View all notifications')}
                />
              </div>

              <div className="dashboard__topic">
                <TopicPanel />
              </div>

              <div className="dashboard__panels">
                <BatteryPanel />
                <SpeedPanel />
                <PlatformControlPanel />
              </div>
            </aside>
          </main>

          {isSettingsOpen && (
            <SettingsModal onClose={() => setSettingsOpen(false)} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
