import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import StreamPanel from './components/StreamPanel';
import MapPanel from './components/MapPanel';
import TopicPanel from './components/TopicPanel';
import BatteryPanel from './components/BatteryPanel';
import SpeedPanel from './components/SpeedPanel';
import ManipulatorPanel from './components/ManipulatorPanel';
import PlatformControlPanel from './components/PlatformControlPanel';

function App() {
  return (
    <div className="App">
      <Navigation />
      <StreamPanel />
      <MapPanel />
      <ManipulatorPanel />
      <TopicPanel />
      <BatteryPanel />
      <SpeedPanel />
      <PlatformControlPanel />
    </div>
  );
}

export default App; 