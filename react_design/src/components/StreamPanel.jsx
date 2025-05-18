import React, { useState, useEffect, useRef } from 'react';
import ROSLIB from 'roslib';
import './StreamPanel.css';

const StreamPanel = () => {
  const [recognitionPerson, setRecognitionPerson] = useState('담당자명: ');
  const [recognitionCar, setRecognitionCar] = useState('차량모델: ');
  const [recognitionTime, setRecognitionTime] = useState('2024-03-03 10:30:25');
  const [isStreaming, setIsStreaming] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    setIsStreaming(false);
    const ros = new ROSLIB.Ros({ url: 'ws://172.16.131.93:9090' });

    ros.on('connection', () => {
      console.log('Connected to websocket server.');
      setIsStreaming(true);
    });
    ros.on('error', (error) => {
      console.error('Error connecting to websocket server:', error);
      setIsStreaming(false);
    });
    ros.on('close', () => {
      console.warn('Connection to websocket server closed.');
      setIsStreaming(false);
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
  }, []);

  return (
    <div className="stream-container">
      <div className="stream-panel">
        <h2 className="panel-title">Webcam</h2>
        <div className="cameras-container">
          {isStreaming ? (
            <div className="camera-feed">
              <img
                ref={imageRef}
                alt="Camera Feed"
                onError={() => setIsStreaming(false)}
                className="camera-image"
              />
            </div>
          ) : (
            <div className="camera-placeholder">
              <p>고객 연결 대기 중입니다...</p>
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
