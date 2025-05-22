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
import ROSLIB from 'roslib';

function App() {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profileUrl = "/assets/images/sample_profile.png";
  const [selectedReport, setSelectedReport] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);  // 새로고침 트리거용 state
  
  // ROS 연결 및 토픽 구독
  useEffect(() => {
    const ros = new ROSLIB.Ros({ url: 'ws://172.16.131.93:9090' });
    
    ros.on('connection', () => {
      console.log('Connected to ROS websocket server.');
      
      // JSON 데이터 토픽 구독
      const jsonTopic = new ROSLIB.Topic({
        ros: ros,
        name: '/json_data',
        messageType: 'std_msgs/String'
      });
      
      jsonTopic.subscribe((message) => {
        try {
          // 토픽에서 받은 JSON 문자열 파싱
          const jsonData = JSON.parse(message.data);
          console.log('Received JSON data:', jsonData);
          
          // 고유 ID 생성
          const customerId = Date.now();
          
          // 새 고객 추가 (큐의 끝에 추가)
          setCustomers(prevCustomers => {
            const newCustomers = [
              ...prevCustomers,
              { 
                id: customerId,
                name: jsonData.name,
                region: jsonData.region,
                model: jsonData.model,
                timestamp: jsonData.timestamp,
              }
            ];
            
            // 최대 10명까지만 유지
            return newCustomers.slice(-10);
          });
        } catch (error) {
          console.error('Error parsing JSON data:', error);
        }
      });
    });
    
    ros.on('error', (error) => {
      console.error('Error connecting to ROS websocket server:', error);
    });
    
    ros.on('close', () => {
      console.warn('Connection to ROS websocket server closed.');
    });
    
    return () => {
      if (ros) {
        ros.close();
      }
    };
  }, []);

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

  // 고객 연결 시 실행될 콜백
  const handleConnect = (customer) => {
    console.log('연결할 고객:', customer);
    setSelectedCustomer(customer);  // 선택된 고객 정보 저장
    
    // 연결된 고객을 리스트에서 제거
    setCustomers(prevCustomers => 
      prevCustomers.filter(c => c.id !== customer.id)
    );
  };

  // 연결 해제 시 실행될 콜백
  const handleDisconnect = () => {
    console.log('고객 연결 해제');
    setSelectedCustomer(null);  // 선택된 고객 정보 초기화
  };

  // 모달 상태 추가
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  // Report 컴포넌트에서 호출할 새로고침 함수
  const handleReportUpdate = () => {
    setRefreshTrigger(prev => prev + 1);  // 값을 변경하여 ReportsPanel의 useEffect 트리거
  };

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
              <StreamPanel selectedCustomer={selectedCustomer} />
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
                onRefreshNeeded={refreshTrigger}
              />

              <div className="dashboard__topic">
                <TopicPanel />
              </div>

              <div className="dashboard__panels">
                <BatteryPanel isConnected={!!selectedCustomer} />
                <SpeedPanel isConnected={!!selectedCustomer} />
                <PlatformControlPanel onDisconnect={handleDisconnect} isConnected={!!selectedCustomer} />
              </div>

              <div className="dashboard__queue">
                <CustomerQueueList
                  customers={customers}
                  onConnect={handleConnect}
                  isConnected={!!selectedCustomer}
                />
              </div>
            </aside>
          </main>

          {isSettingsOpen && (
            <SettingsModal onClose={() => setSettingsOpen(false)} />
          )}

          {(isReportModalOpen || selectedReport) && (
            <ReportModal
              isOpen={true}
              onClose={() => {
                setReportModalOpen(false);
                setSelectedReport(null);
              }}
              data={selectedReport}
              onUpdate={handleReportUpdate}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
