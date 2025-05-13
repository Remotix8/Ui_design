import React, { useState } from 'react';
import './StreamPanel.css';

const StreamPanel = () => {
  const [recognitionPerson, setRecognitionPerson] = useState('담당자명: ');
  const [recognitionCar, setRecognitionCar] = useState('차량모델: ');
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
        </div>
      </div>
      <div className="divider"></div>
      <div className="recognition-info">
        <div className="recognition-person">{recognitionPerson}</div>
        <div className="recognition-car">{recognitionCar}</div>
        <div className="recognition-time">{recognitionTime}</div>
      </div>
    </div>
  );
};

export default StreamPanel; 