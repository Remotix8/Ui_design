import React, { useState } from 'react';
import './StreamPanel.css';

const StreamPanel = () => {
  const [recognitionResult, setRecognitionResult] = useState('사람이 감지되었습니다');
  const [recognitionTime, setRecognitionTime] = useState('2024-03-03 10:30:25');

  return (
    <div className="stream-container">
      <div className="stream-panel">
        <h2 className="panel-title">Webcam</h2>
        <div className="cameras-container">
          <div className="camera-feed">
            {/* 첫 번째 카메라 스트림 */}
            <img src="camera1-stream-url" alt="Camera 1" />
          </div>
          <div className="camera-feed">
            {/* 두 번째 카메라 스트림 */}
            <img src="camera2-stream-url" alt="Camera 2" />
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="recognition-info">
        <div className="recognition-result">{recognitionResult}</div>
        <div className="recognition-time">{recognitionTime}</div>
      </div>
    </div>
  );
};

export default StreamPanel; 