import React, { useState, useEffect } from 'react';
import './PlatformControlPanel.css';
import FloatingArrowControls from './FloatingArrowControls';

const PlatformControlPanel = () => {
  const [teleopMode, setTeleopMode] = useState(false);
  const [activeButtons, setActiveButtons] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
    center: false
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!teleopMode) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setActiveButtons(prev => ({ ...prev, up: true }));
          // TODO: Send platform forward command
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveButtons(prev => ({ ...prev, down: true }));
          // TODO: Send platform backward command
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setActiveButtons(prev => ({ ...prev, left: true }));
          // TODO: Send platform left turn command
          break;
        case 'ArrowRight':
          e.preventDefault();
          setActiveButtons(prev => ({ ...prev, right: true }));
          // TODO: Send platform right turn command
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      if (!teleopMode) return;

      switch (e.key) {
        case 'ArrowUp':
          setActiveButtons(prev => ({ ...prev, up: false }));
          // TODO: Stop forward movement
          break;
        case 'ArrowDown':
          setActiveButtons(prev => ({ ...prev, down: false }));
          // TODO: Stop backward movement
          break;
        case 'ArrowLeft':
          setActiveButtons(prev => ({ ...prev, left: false }));
          // TODO: Stop left turn
          break;
        case 'ArrowRight':
          setActiveButtons(prev => ({ ...prev, right: false }));
          // TODO: Stop right turn
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [teleopMode]);

  const handleMouseDown = (direction) => {
    if (!teleopMode) return;
    setActiveButtons(prev => ({ ...prev, [direction]: true }));
    // TODO: Send corresponding platform command
  };

  const handleMouseUp = (direction) => {
    if (!teleopMode) return;
    setActiveButtons(prev => ({ ...prev, [direction]: false }));
    // TODO: Stop corresponding platform movement
  };

  const handleEmergencyStop = () => {
    // TODO: Implement emergency stop logic
    setTeleopMode(false);
    setActiveButtons({
      up: false,
      down: false,
      left: false,
      right: false,
      center: false
    });
  };

  return (
    <>
      <div className="platform-control-panel">
        <h2 className="panel-title">Platform Control</h2>
        <div className="control-container">
          <div className="mode-controls">
            <div className="toggle-container">
              <span className="toggle-label">Teleop {teleopMode ? 'ON' : 'OFF'}</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={teleopMode}
                  onChange={(e) => setTeleopMode(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <button
              className="emergency-stop"
              onClick={handleEmergencyStop}
            >
              E-STOP
            </button>
          </div>
        </div>
      </div>
      <FloatingArrowControls
        teleopMode={teleopMode}
        activeButtons={activeButtons}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </>
  );
};

export default PlatformControlPanel; 