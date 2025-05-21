import React, { useState, useEffect, useRef } from 'react';
import ROSLIB from 'roslib';
import './StreamPanel.css';

const StreamPanel = ({ selectedCustomer }) => {
  const [recognitionPerson, setRecognitionPerson] = useState('고객명: --');
  const [recognitionCar, setRecognitionCar] = useState('차량모델: --');
  const [recognitionTime, setRecognitionTime] = useState('연결시간: --');
  const [isStreaming, setIsStreaming] = useState(false);
  const imageRef = useRef(null);

  // 선택된 고객 정보가 변경될 때만 UI 업데이트
  useEffect(() => {
    if (selectedCustomer) {
      setRecognitionPerson('고객명: ' + selectedCustomer.name);
      setRecognitionCar('차량모델: ' + selectedCustomer.model);
      setRecognitionTime('연결시간: ' + selectedCustomer.timestamp);
    } else {
      setRecognitionPerson('고객명: --');
      setRecognitionCar('차량모델: --');
      setRecognitionTime('연결시간: --');
    }
  }, [selectedCustomer]);

  useEffect(() => {
    // 고객이 선택되지 않았다면 스트리밍을 시작하지 않음
    if (!selectedCustomer) {
      setIsStreaming(false);
      return;
    }

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
  }, [selectedCustomer]); // selectedCustomer를 의존성 배열에 추가

  return (
    <div className="stream-container">
      <div className="stream-panel">
        <h2 className="panel-title">Webcam</h2>
        <div className="cameras-container">
          {selectedCustomer ? (
            isStreaming ? (
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
                <p>카메라 스트림 연결 중...</p>
              </div>
            )
          ) : (
            <div className="camera-placeholder">
              <p>현재 고객과 연결 대기중입니다</p>
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
