import React, { useState } from 'react';
import './ManipulatorPanel.css';

const ManipulatorPanel = () => {
  const [isLeaderFollowerMode, setIsLeaderFollowerMode] = useState(false);

  const toggleLeaderFollowerMode = () => {
    setIsLeaderFollowerMode(!isLeaderFollowerMode);
    // ROS2 서비스 호출 로직 추가 예정
    console.log('Leader-follower mode:', !isLeaderFollowerMode);
  };

  return (
    <div className="manipulator-container">
      <div className="manipulator-panel">
        <div className="manipulator-options">
          <div className="leader-follower-container">
            <span className="toggle-label">Leader-Follower</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={isLeaderFollowerMode}
                onChange={toggleLeaderFollowerMode}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        <h2 className="panel-title">Manipulator</h2>
        <div className="manipulator-content">
          {/* 왼쪽: 엔드이팩터 카메라 뷰 */}
          <div className="end-effector-camera">
            <div className="camera-stream">
              {/* ROS2 카메라 스트림을 위한 img 태그 */}
              <img 
                src="http://localhost:8080/stream?topic=/end_effector_camera/image_raw" 
                alt="End-effector camera stream" 
              />
            </div>
          </div>

          {/* 오른쪽: URDF 뷰어 */}
          <div className="urdf-viewer">
            <div className="viewer-container">
              {/* ROS2 URDF 뷰어를 위한 iframe */}
              <iframe
                src="http://localhost:8080/urdf?model=/robot_description"
                title="URDF Viewer"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManipulatorPanel; 