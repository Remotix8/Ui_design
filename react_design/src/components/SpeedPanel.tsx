import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../contexts/WebSocketContext';

interface SpeedPanelProps {}

const SpeedPanel: React.FC<SpeedPanelProps> = () => {
  const [speed, setSpeed] = useState<number>(0);
  const { ws, isConnected, sendMessage } = useWebSocket();

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.topic === '/speed') {
        setSpeed(data.msg.linear.x);
      }
    };

    ws.addEventListener('message', handleMessage);

    // Subscribe to speed topic
    const subscribeMsg = {
      op: 'subscribe',
      topic: '/speed',
      type: 'geometry_msgs/Twist'
    };
    sendMessage(JSON.stringify(subscribeMsg));

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws, sendMessage]);

  return (
    <div className="speed-panel">
      <h2>Speed Monitor</h2>
      <div className="speed-value">
        Current Speed: {speed.toFixed(2)} m/s
      </div>
      <div className="connection-status">
        Status: {isConnected ? 'Connected' : 'Disconnected'}
      </div>
    </div>
  );
};

export default SpeedPanel; 