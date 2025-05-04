import React from 'react';
import './FloatingArrowControls.css';

const FloatingArrowControls = ({ teleopMode, activeButtons, onMouseDown, onMouseUp }) => {
  return (
    <div className="floating-arrow-controls">
      <div className="arrow-row">
        <button
          className={`arrow-button up ${activeButtons.up ? 'active' : ''}`}
          onMouseDown={() => onMouseDown('up')}
          onMouseUp={() => onMouseUp('up')}
          onMouseLeave={() => onMouseUp('up')}
          disabled={!teleopMode}
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
          disabled={!teleopMode}
        >
          <div className="arrow-icon" />
        </button>
        <button
          className={`arrow-button down ${activeButtons.down ? 'active' : ''}`}
          onMouseDown={() => onMouseDown('down')}
          onMouseUp={() => onMouseUp('down')}
          onMouseLeave={() => onMouseUp('down')}
          disabled={!teleopMode}
        >
          <div className="arrow-icon" />
        </button>
        <button
          className={`arrow-button right ${activeButtons.right ? 'active' : ''}`}
          onMouseDown={() => onMouseDown('right')}
          onMouseUp={() => onMouseUp('right')}
          onMouseLeave={() => onMouseUp('right')}
          disabled={!teleopMode}
        >
          <div className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default FloatingArrowControls; 