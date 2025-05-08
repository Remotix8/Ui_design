// src/components/FloatingArrowControls.jsx
import React from 'react';
import './FloatingArrowControls.css';

const FloatingArrowControls = ({
  teleopMode = true,                   // 기본 true로 설정하여 항상 보이도록
  activeButtons = {},
  onMouseDown = () => {},
  onMouseUp = () => {},
}) => {
  return (
    <div className="floating-arrow-controls">
      <div className="arrow-row">
        <button
          className={`arrow-button up ${activeButtons.up ? 'active' : ''}`}
          onMouseDown={() => onMouseDown('up')}
          onMouseUp={() => onMouseUp('up')}
          onMouseLeave={() => onMouseUp('up')}
          // 항상 활성화 위해 disabled 속성 제거
        >
          <div className="arrow-icon" />
        </button>
      </div>
      <div className="arrow-row">
        <button
          className={`arrow-button left ${activeButtons.left ? 'active' : ''}`}
          onMouseDown={() => onMouseDown('left')}
          onMouseUp={() => onMouseUp('left')}
          onMouseLeave={() => onMouseUp('left')}
        >
          <div className="arrow-icon" />
        </button>
        <button
          className={`arrow-button down ${activeButtons.down ? 'active' : ''}`}
          onMouseDown={() => onMouseDown('down')}
          onMouseUp={() => onMouseUp('down')}
          onMouseLeave={() => onMouseUp('down')}
        >
          <div className="arrow-icon" />
        </button>
        <button
          className={`arrow-button right ${activeButtons.right ? 'active' : ''}`}
          onMouseDown={() => onMouseDown('right')}
          onMouseUp={() => onMouseUp('right')}
          onMouseLeave={() => onMouseUp('right')}
        >
          <div className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default FloatingArrowControls;