import React, { useEffect, useRef, useState } from 'react';
import ROSLIB from 'roslib';
import './FloatingArrowControls.css';

// TurtleBot3 속도 제한
const MAX_LIN_VEL = 0.22;  // Burger 모델 최대 선속도
const MAX_ANG_VEL = 2.84;  // Burger 모델 최대 각속도
const LIN_VEL_STEP_SIZE = 0.01;  // 선속도 증가/감소 단위
const ANG_VEL_STEP_SIZE = 0.1;   // 각속도 증가/감소 단위

const FloatingArrowControls = ({
  teleopMode = true,                   // teleopMode이 false면 버튼 비활성화
  activeButtons = {},
  onMouseDown = () => {},
  onMouseUp = () => {},
}) => {
  const rosRef = useRef(null);
  const keyTopicRef = useRef(null);
  const [targetLinearVel, setTargetLinearVel] = useState(0.0);
  const [targetAngularVel, setTargetAngularVel] = useState(0.0);

  useEffect(() => {
    // ROS 연결 초기화
    rosRef.current = new ROSLIB.Ros({ url: 'ws://172.16.131.93:9090' });
    rosRef.current.on('connection', () => console.log('Connected.'));
    rosRef.current.on('error', (err) => console.error('ROS Error', err));
    rosRef.current.on('close', () => console.log('Connection closed.'));

    keyTopicRef.current = new ROSLIB.Topic({
      ros: rosRef.current,
      name: '/teleop_key',
      messageType: 'std_msgs/String',
    });

    return () => {
      if (rosRef.current) rosRef.current.close();
    };
  }, []);

  const constrain = (val, min, max) => Math.min(Math.max(val, min), max);

  const publishKey = (key) => {
    if (!keyTopicRef.current) return;
    keyTopicRef.current.publish(new ROSLIB.Message({ data: key }));
  };

  const handleMouseDown = (dir) => {
    if (!teleopMode) return;
    onMouseDown(dir);
    switch (dir) {
      case 'up':
        setTargetLinearVel(v => {
          const nv = constrain(v + LIN_VEL_STEP_SIZE, -MAX_LIN_VEL, MAX_LIN_VEL);
          publishKey('w');
          return nv;
        });
        break;
      case 'down':
        setTargetLinearVel(v => {
          const nv = constrain(v - LIN_VEL_STEP_SIZE, -MAX_LIN_VEL, MAX_LIN_VEL);
          publishKey('x');
          return nv;
        });
        break;
      case 'left':
        setTargetAngularVel(v => {
          const nv = constrain(v + ANG_VEL_STEP_SIZE, -MAX_ANG_VEL, MAX_ANG_VEL);
          publishKey('a');
          return nv;
        });
        break;
      case 'right':
        setTargetAngularVel(v => {
          const nv = constrain(v - ANG_VEL_STEP_SIZE, -MAX_ANG_VEL, MAX_ANG_VEL);
          publishKey('d');
          return nv;
        });
        break;
      case 'center':
        setTargetLinearVel(0);
        setTargetAngularVel(0);
        publishKey('s');
        break;
      default:
        break;
    }
  };

  const handleMouseUp = (dir) => {
    if (!teleopMode) return;
    onMouseUp(dir);
  };

  return (
    <div className="floating-arrow-controls">
      <div className="arrow-row">
        <button
          className={`arrow-button up ${activeButtons.up ? 'active' : ''}`}
          disabled={!teleopMode}
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
          disabled={!teleopMode}
          onMouseDown={() => handleMouseDown('left')}
          onMouseUp={() => handleMouseUp('left')}
          onMouseLeave={() => handleMouseUp('left')}
        >
          <div className="arrow-icon" />
        </button>
        <button
          className={`arrow-button center ${activeButtons.center ? 'active' : ''}`}
          disabled={!teleopMode}
          onMouseDown={() => handleMouseDown('center')}
          onMouseUp={() => handleMouseUp('center')}
          onMouseLeave={() => handleMouseUp('center')}
        >
          <div className="square-icon" />
        </button>
        <button
          className={`arrow-button right ${activeButtons.right ? 'active' : ''}`}
          disabled={!teleopMode}
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
          disabled={!teleopMode}
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
