import React, { useState, useEffect, useRef } from 'react';
import ROSLIB from 'roslib';
import './StreamPanel.css';

const StreamPanel = () => {
  const [recognitionPerson, setRecognitionPerson] = useState('담당자명: ');
  const [recognitionCar, setRecognitionCar] = useState('차량모델: ');
  const [recognitionTime, setRecognitionTime] = useState('2024-03-03 10:30:25');
  const imageRef = useRef(null);

  useEffect(() => {
    // ROS 웹소켓 연결 설정
    const ros = new ROSLIB.Ros({
      url: 'ws://172.16.131.93:9090'  // Raspberry Pi의 rosbridge_websocket 서버 주소
    });

    ros.on('connection', () => {
      console.log('Connected to websocket server.');
    });
    ros.on('error', (error) => {
      console.log('Error connecting to websocket server:', error);
    });
    ros.on('close', () => {
      console.log('Connection to websocket server closed.');
    });

    // 카메라 토픽 구독
    const cameraTopic = new ROSLIB.Topic({
      ros: ros,
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
          <div className="camera-feed">
            <img
              ref={imageRef}
              alt="Camera Feed"
              style={{
                width: '100%',
                height: 'auto',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
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