import React, { useEffect, useRef } from 'react';
import { useWebSocket } from '../contexts/WebSocketContext';

interface StreamPanelProps {}

const StreamPanel: React.FC<StreamPanelProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ws, isConnected, sendMessage } = useWebSocket();

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.topic === '/camera/image_raw') {
        // Handle image data
        if (videoRef.current) {
          const blob = new Blob([data.msg.data], { type: 'image/jpeg' });
          const url = URL.createObjectURL(blob);
          videoRef.current.src = url;
        }
      }
    };

    ws.addEventListener('message', handleMessage);

    // Subscribe to camera topic
    const subscribeMsg = {
      op: 'subscribe',
      topic: '/camera/image_raw',
      type: 'sensor_msgs/CompressedImage'
    };
    sendMessage(JSON.stringify(subscribeMsg));

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws, sendMessage]);

  return (
    <div className="stream-panel">
      <h2>Camera Stream</h2>
      <div className="video-container">
        <video ref={videoRef} autoPlay />
      </div>
      <div className="connection-status">
        Status: {isConnected ? 'Connected' : 'Disconnected'}
      </div>
    </div>
  );
};

export default StreamPanel; 