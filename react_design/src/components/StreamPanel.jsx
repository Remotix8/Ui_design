import React, { useState, useEffect, useRef } from 'react';
import ROSLIB from 'roslib';
import './StreamPanel.css';

const StreamPanel = () => {
  const [recognitionPerson, setRecognitionPerson] = useState('담당자명: ');
  const [recognitionCar, setRecognitionCar] = useState('차량모델: ');
  const [recognitionTime, setRecognitionTime] = useState('2024-03-03 10:30:25');
  const [status, setStatus] = useState('connecting'); // 'connecting' | 'streaming' | 'error'
  const [retryCount, setRetryCount] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    setStatus('connecting');
    const ros = new ROSLIB.Ros({ url: 'ws://172.16.131.93:9090' });

    ros.on('connection', () => {
      console.log('Connected to websocket server.');
      setStatus('streaming');
    });
    ros.on('error', (error) => {
      console.error('Error connecting to websocket server:', error);
      setStatus('error');
    });
    ros.on('close', () => {
      console.warn('Connection to websocket server closed.');
      setStatus('error');
    });

    const cameraTopic = new ROSLIB.Topic({
      ros,
      name: '/camera/image_raw/compressed',
      messageType: 'sensor_msgs/CompressedImage'
    });

    cameraTopic.subscribe((message) => {
      if (imageRef.current) {
        const imageData = `data:image/jpeg;base64,${message.data}`;
        imageRef.current.src = imageData;
      }
    });

    return () => {
      cameraTopic.unsubscribe();
      ros.close();
    };
  }, [retryCount]);

  const renderPlaceholder = (message) => (
    <div className="camera-placeholder">
      <p>{message}</p>
      <button
        className="retry-button"
        onClick={() => setRetryCount((c) => c + 1)}
      >
        다시 시도
      </button>
    </div>
  );

  return (
    <div className="stream-container">
      <div className="stream-panel">
        <h2 className="panel-title">Webcam</h2>
        <div className="cameras-container">
          {status === 'connecting' && renderPlaceholder('카메라에 연결 중입니다...')}
          {status === 'error' && renderPlaceholder('카메라 연결에 실패했습니다.')}
          {status === 'streaming' && (
            <div className="camera-feed">
              <img
                ref={imageRef}
                alt="Camera Feed"
                onError={() => setStatus('error')}
                className="camera-image"
              />
            </div>
          )}
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
