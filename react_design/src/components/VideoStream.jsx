import React, { useEffect, useRef, useState } from 'react';
import ROSLIB from 'roslib';
import './VideoStream.css';

const VideoStream = () => {
  const imageRef = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    // Connect to ROS2 Bridge
    const ros = new ROSLIB.Ros({
      url: 'ws://172.25.86.225:9090'
    });

    ros.on('connection', () => {
      console.log('Connected to ROS2 bridge');
      setConnectionStatus('Connected to ROS2 bridge');
    });

    ros.on('error', (error) => {
      console.error('Error connecting to ROS2 bridge:', error);
      setConnectionStatus('Error connecting to ROS2 bridge');
    });

    ros.on('close', () => {
      console.log('Connection to ROS2 bridge closed');
      setConnectionStatus('Connection closed');
    });

    // Set up video streaming URL for compressed image topic
    if (imageRef.current) {
      imageRef.current.src = 'http://172.25.86.225:8080/stream?topic=/camera1/image_raw';
    }

    return () => {
      ros.close();
    };
  }, []);

  return (
    <div className="video-stream-container">
      <div className="connection-status">{connectionStatus}</div>
      <img ref={imageRef} alt="ROS2 Video Stream" className="video-stream" />
    </div>
  );
};

export default VideoStream; 