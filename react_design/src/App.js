import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import SettingsModal from './components/SettingsModal';
import StreamPanel from './components/StreamPanel';
import TopicPanel from './components/TopicPanel';
import BatteryPanel from './components/BatteryPanel';
import SpeedPanel from './components/SpeedPanel';
import PlatformControlPanel from './components/PlatformControlPanel';

function App() {
  // 설정 모달 오픈 상태 관리
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="App">
      {/* 네비게이션에 onOpenSettings prop 전달 */}
      <Navigation onOpenSettings={() => setSettingsOpen(true)} />

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
