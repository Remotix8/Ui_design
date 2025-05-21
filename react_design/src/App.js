import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import SettingsModal from './components/SettingsModal';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import ProfilePopup from './components/ProfilePopup';
import Clock from './components/Clock';
import CustomerQueueList from './components/CustomerQueueList';
import StreamPanel from './components/StreamPanel';
import TopicPanel from './components/TopicPanel';
import BatteryPanel from './components/BatteryPanel';
import SpeedPanel from './components/SpeedPanel';
import PlatformControlPanel from './components/PlatformControlPanel';
import ReportModal from "./components/Report";
import ReportCard from './components/ReportCard';
import NotificationCard from './components/ReportsPanel';
import ReportsPanel from './components/ReportsPanel';
import axios from 'axios';

function App() {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileUrl = "/assets/images/sample_profile.png";
  const [selectedReport, setSelectedReport] = useState(null);
  
  const [customers, setCustomers] = useState([
    { id: 1, name: '민재' },
    { id: 2, name: '다인' },
    { id: 3, name: '준혁' }, 
    { id: 4, name: '준하' },
    { id: 5, name: '성언' },
  ]);

  // 토큰 확인 및 자동 로그인
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('user');
    if (token && savedUserId) {
      setIsLogin(true);
      setUserId(savedUserId);
      setShowLoginModal(false);
    }
  }, []);

  // axios 인터셉터 설정
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  const handleLogin = (username) => {
    console.log('로그인 시도:', username);
    setIsLogin(true);
    setUserId(username);
    setShowLoginModal(false);
    console.log('로그인 상태:', { isLogin: true, userId: username });
  };

  const handleLogout = () => {
    setIsLogin(false);
    setUserId('');
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('user');
    setShowLoginModal(true);
  };

  // 2) 연결 클릭 시 실행될 콜백
  const handleConnect = (customer) => {
    console.log('연결할 고객:', customer);
    // TODO: 실제 연결 로직 호출 (예: API 요청 등)
  };

  // 모달 상태 추가
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  return (
    <div className={`App ${showLoginModal || showRegisterModal ? 'locked-ui' : ''}`}>
      {/* 로그인/회원가입 모달 띄우기 (화면 잠금) */}
      {showLoginModal && (
        <>
          <div className="global-lock-screen" />
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
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
            onLogout={handleLogout}
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

            <section className="dashboard__clock">
              <Clock />
            </section>

            <aside className="dashboard__right">
              <div className="dashboard__topRow">
                <ReportCard
                  pendingCount={3}
                  onWriteClick={() => setReportModalOpen(true)}
                />
                <NotificationCard
                  notifications={[
                    { message: '배터리 경고: 15%', time: '2m ago', type: 'warning', read: false },
                    { message: '원격조작 요청 #1234', time: '5m ago', type: 'info', read: false },
                  ]}
                  onViewAll={() => console.log('View all notifications')}
                />
              </div>

              <ReportsPanel
                onSelectReport={(report) => setSelectedReport(report)}
              />

              <div className="dashboard__topic">
                <TopicPanel />
              </div>

              <div className="dashboard__panels">
                <BatteryPanel />
                <SpeedPanel />
                <PlatformControlPanel />
              </div>

              <div className="dashboard__queue">
                <CustomerQueueList
                  customers={customers}
                  onConnect={handleConnect}
                />
              </div>
            </aside>
          </main>

          {isSettingsOpen && (
            <SettingsModal onClose={() => setSettingsOpen(false)} />
          )}

          {isReportModalOpen && (
            <ReportModal isOpen={isReportModalOpen} onClose={() => setReportModalOpen(false)} />
          )}

          {selectedReport && (
            <ReportModal
              isOpen={true}
              onClose={() => setSelectedReport(null)}
              data={selectedReport}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
