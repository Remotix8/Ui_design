import React, { useState, useEffect } from 'react';
import './BatteryPanel.css';
import { FaBatteryThreeQuarters } from 'react-icons/fa';
import ROSLIB from 'roslib';

const BatteryPanel = ({ isConnected }) => {
  const [batteryPercentage, setBatteryPercentage] = useState('--');

  useEffect(() => {
    // 연결되지 않은 상태면 배터리 값을 '--'로 설정
    if (!isConnected) {
      setBatteryPercentage('--');
      return;
    }

    // Create a connection to the ROS server
    const ros = new ROSLIB.Ros({
      url: 'ws://172.16.131.93:9090'
    });

    ros.on('connection', () => {
      console.log('Connected to websocket server.');
    });

    ros.on('error', (error) => {
      console.log('Error connecting to websocket server:', error);
      setBatteryPercentage('--');
    });

    ros.on('close', () => {
      console.log('Connection to websocket server closed.');
      setBatteryPercentage('--');
    });

    // Subscribe to the battery state topic
    const batteryTopic = new ROSLIB.Topic({
      ros: ros,
      name: '/battery_state',
      messageType: 'sensor_msgs/BatteryState'
    });

    batteryTopic.subscribe((message) => {
      if (isConnected) {  // 연결된 상태일 때만 배터리 값 업데이트
        setBatteryPercentage(`${Math.round(message.percentage)}%`);
      }
    });

    // Cleanup subscription on component unmount
    return () => {
      if (batteryTopic) {
        batteryTopic.unsubscribe();
      }
      if (ros) {
        ros.close();
      }
    };
  }, [isConnected]);  // isConnected를 의존성 배열에 추가

  return (
    <div className="battery-container">
      <div className="battery-panel">
        <div className="battery-content">
          <div className="battery-info">
            <span className="battery-label">Battery</span>
            <div className="battery-percentage">{batteryPercentage}</div>
          </div>
          <div className="battery-icon">
            <FaBatteryThreeQuarters />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryPanel; 