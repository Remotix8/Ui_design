import React, { useEffect, useState, useRef } from 'react';
import ROSLIB from 'roslib';
import './SpeedPanel.css';
import { FaTachometerAlt } from 'react-icons/fa';

const SpeedPanel = ({ isConnected }) => {
  const [speed, setSpeed] = useState('--');
  const rosRef = useRef(null);
  const cmdVelTopicRef = useRef(null);

  useEffect(() => {
    // 연결되지 않은 상태면 속도 값을 '--'로 설정
    if (!isConnected) {
      setSpeed('--');
      return;
    }

    // ROS 웹소켓 연결 설정
    rosRef.current = new ROSLIB.Ros({
      url: 'ws://172.16.131.93:9090'
    });

    // 연결 상태 모니터링
    rosRef.current.on('connection', () => {
      console.log('SpeedPanel: Connected to websocket server');
    });

    rosRef.current.on('error', (error) => {
      console.error('SpeedPanel: Error connecting to websocket server:', error);
      setSpeed('--');
    });

    rosRef.current.on('close', () => {
      console.log('SpeedPanel: Connection to websocket server closed');
      setSpeed('--');
    });

    // cmd_vel 토픽 구독
    cmdVelTopicRef.current = new ROSLIB.Topic({
      ros: rosRef.current,
      name: '/cmd_vel',
      messageType: 'geometry_msgs/TwistStamped'
    });

    // 메시지 수신 시 속도 업데이트
    cmdVelTopicRef.current.subscribe((message) => {
      if (isConnected) {  // 연결된 상태일 때만 속도 값 업데이트
        // 선속도와 각속도의 절대값 중 큰 값을 표시
        const linearSpeed = Math.abs(message.twist.linear.x);
        const angularSpeed = Math.abs(message.twist.angular.z);
        const currentSpeed = Math.max(linearSpeed, angularSpeed);
        setSpeed(currentSpeed.toFixed(2));
      }
    });

    return () => {
      if (cmdVelTopicRef.current) {
        cmdVelTopicRef.current.unsubscribe();
      }
      if (rosRef.current) {
        rosRef.current.close();
      }
    };
  }, [isConnected]);  // isConnected를 의존성 배열에 추가

  return (
    <div className="speed-container">
      <div className="speed-panel">
        <div className="speed-content">
          <div className="speed-info">
            <span className="speed-label">Speed</span>
            <div className="speed-value">
              {speed === '--' ? '--' : `${(speed * 250).toFixed(2)} m/s`}
            </div>
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