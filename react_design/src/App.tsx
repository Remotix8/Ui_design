import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WebSocketProvider } from './contexts/WebSocketContext';
import StreamPanel from './components/StreamPanel';
import SpeedPanel from './components/SpeedPanel';
import BatteryPanel from './components/BatteryPanel';
import './App.css';

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <div className="app">
          <nav className="navigation">
            <ul>
              <li><Link to="/stream">Camera Stream</Link></li>
              <li><Link to="/speed">Speed Monitor</Link></li>
              <li><Link to="/battery">Battery Status</Link></li>
            </ul>
          </nav>
          <main className="content">
            <Routes>
              <Route path="/" element={<StreamPanel />} />
              <Route path="/stream" element={<StreamPanel />} />
              <Route path="/speed" element={<SpeedPanel />} />
              <Route path="/battery" element={<BatteryPanel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WebSocketProvider>
  );
}

export default App; 