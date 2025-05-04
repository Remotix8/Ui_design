import React from 'react';
import './BatteryPanel.css';
import { FaBatteryThreeQuarters } from 'react-icons/fa';

const BatteryPanel = () => {
  return (
    <div className="battery-container">
      <div className="battery-panel">
        <div className="battery-content">
          <div className="battery-info">
            <span className="battery-label">Battery</span>
            <div className="battery-percentage">40%</div>
          </div>
          <div className="battery-icon">
            <FaBatteryThreeQuarters />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryPanel; 