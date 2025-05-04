import React from 'react';
import './SpeedPanel.css';
import { FaTachometerAlt } from 'react-icons/fa';

const SpeedPanel = () => {
  return (
    <div className="speed-container">
      <div className="speed-panel">
        <div className="speed-content">
          <div className="speed-info">
            <span className="speed-label">Speed</span>
            <div className="speed-value">1.5 m/s</div>
          </div>
          <div className="speed-icon">
            <FaTachometerAlt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedPanel; 