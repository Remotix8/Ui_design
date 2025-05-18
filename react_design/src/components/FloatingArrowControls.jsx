// src/components/FloatingArrowControls.jsx
import React, { useEffect, useRef, useState } from 'react';
import ROSLIB from 'roslib';
import './FloatingArrowControls.css';

// TurtleBot3 속도 제한
const MAX_LIN_VEL = 0.22;  // Burger 모델 최대 선속도
const MAX_ANG_VEL = 2.84;  // Burger 모델 최대 각속도
const LIN_VEL_STEP_SIZE = 0.01;  // 선속도 증가/감소 단위
const ANG_VEL_STEP_SIZE = 0.1;   // 각속도 증가/감소 단위

const FloatingArrowControls = ({
  teleopMode = true,                   // 기본 true로 설정하여 항상 보이도록
  activeButtons = {},
  onMouseDown = () => {},
  onMouseUp = () => {},
}) => {
  const rosRef = useRef(null);
  const keyTopicRef = useRef(null);
  const [targetLinearVel, setTargetLinearVel] = useState(0.0);
  const [targetAngularVel, setTargetAngularVel] = useState(0.0);

  useEffect(() => {
    console.log('Initializing ROS connection...');
    // ROS 웹소켓 연결 설정
    rosRef.current = new ROSLIB.Ros({
      url: 'ws://172.16.131.93:9090'  // Raspberry Pi의 rosbridge_websocket 서버 주소
    });

    // 연결 상태 모니터링
    rosRef.current.on('connection', () => {
      console.log('Successfully connected to websocket server.');
    });

    rosRef.current.on('error', (error) => {
      console.error('Error connecting to websocket server:', error);
    });

    rosRef.current.on('close', () => {
      console.log('Connection to websocket server closed.');
    });

    // 키 입력 토픽 설정
    keyTopicRef.current = new ROSLIB.Topic({
      ros: rosRef.current,
      name: '/teleop_key',  // 새로운 토픽 이름
      messageType: 'std_msgs/String'  // 문자열 메시지 타입
    });

    console.log('ROS Topic /teleop_key initialized');

    return () => {
      if (rosRef.current) {
        console.log('Cleaning up ROS connection...');
        rosRef.current.close();
      }
    };
  }, []);

  const constrain = (input, low, high) => {
    return Math.min(Math.max(input, low), high);
  };

  const publishKey = (key) => {
    console.log(`Publishing key: ${key}`);
    if (keyTopicRef.current) {
      const msg = new ROSLIB.Message({
        data: key
      });
      keyTopicRef.current.publish(msg);
      console.log('Key command published successfully');
    } else {
      console.error('teleop_key topic not initialized');
    }
  };

  const handleMouseDown = (direction) => {
    console.log(`Mouse down on ${direction} button`);
    onMouseDown(direction);
    
    // 방향에 따른 키 발행 및 속도 업데이트
    switch (direction) {
      case 'up':
        console.log('Moving forward (w)');
        const newLinearVel = constrain(targetLinearVel + LIN_VEL_STEP_SIZE, -MAX_LIN_VEL, MAX_LIN_VEL);
        setTargetLinearVel(newLinearVel);
        publishKey('w');  // 전진
        break;
      case 'down':
        console.log('Moving backward (x)');
        const newLinearVelDown = constrain(targetLinearVel - LIN_VEL_STEP_SIZE, -MAX_LIN_VEL, MAX_LIN_VEL);
        setTargetLinearVel(newLinearVelDown);
        publishKey('x');  // 후진
        break;
      case 'left':
        console.log('Turning left (a)');
        const newAngularVel = constrain(targetAngularVel + ANG_VEL_STEP_SIZE, -MAX_ANG_VEL, MAX_ANG_VEL);
        setTargetAngularVel(newAngularVel);
        publishKey('a');  // 좌회전
        break;
      case 'right':
        console.log('Turning right (d)');
        const newAngularVelRight = constrain(targetAngularVel - ANG_VEL_STEP_SIZE, -MAX_ANG_VEL, MAX_ANG_VEL);
        setTargetAngularVel(newAngularVelRight);
        publishKey('d');  // 우회전
        break;
      case 'center':
        console.log('Stop (s)');
        setTargetLinearVel(0);
        setTargetAngularVel(0);
        publishKey('s');  // 정지
        break;
      default:
        console.log('Unknown direction:', direction);
        break;
    }
  };

  const handleMouseUp = (direction) => {
    console.log(`Mouse up on ${direction} button`);
    onMouseUp(direction);
  };

  return (
    <div className="floating-arrow-controls">
      <div className="arrow-row">
        <button
          className={`arrow-button up ${activeButtons.up ? 'active' : ''}`}
          onMouseDown={() => handleMouseDown('up')}
          onMouseUp={() => handleMouseUp('up')}
          onMouseLeave={() => handleMouseUp('up')}
        >
          <div className="arrow-icon" />
        </button>
      </div>
      <div className="arrow-row middle">
        <button
          className={`arrow-button left ${activeButtons.left ? 'active' : ''}`}
          onMouseDown={() => handleMouseDown('left')}
          onMouseUp={() => handleMouseUp('left')}
          onMouseLeave={() => handleMouseUp('left')}
        >
          <div className="arrow-icon" />
        </button>
        <button
          className={`arrow-button center ${activeButtons.center ? 'active' : ''}`}
          onMouseDown={() => handleMouseDown('center')}
          onMouseUp={() => handleMouseUp('center')}
          onMouseLeave={() => handleMouseUp('center')}
        >
          <div className="square-icon" />
        </button>
        <button
          className={`arrow-button right ${activeButtons.right ? 'active' : ''}`}
          onMouseDown={() => handleMouseDown('right')}
          onMouseUp={() => handleMouseUp('right')}
          onMouseLeave={() => handleMouseUp('right')}
        >
          <div className="arrow-icon" />
        </button>
      </div>
      <div className="arrow-row">
        <button
          className={`arrow-button down ${activeButtons.down ? 'active' : ''}`}
          onMouseDown={() => handleMouseDown('down')}
          onMouseUp={() => handleMouseUp('down')}
          onMouseLeave={() => handleMouseUp('down')}
        >
          <div className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default FloatingArrowControls;