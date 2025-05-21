import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../contexts/WebSocketContext';

interface BatteryPanelProps {}

const BatteryPanel: React.FC<BatteryPanelProps> = () => {
  const [batteryLevel, setBatteryLevel] = useState<number>(100);
  const { ws, isConnected, sendMessage } = useWebSocket();

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.topic === '/battery') {
        setBatteryLevel(data.msg.percentage);
      }
    };

    ws.addEventListener('message', handleMessage);

    // Subscribe to battery topic
    const subscribeMsg = {
      op: 'subscribe',
      topic: '/battery',
      type: 'sensor_msgs/BatteryState'
    };
    sendMessage(JSON.stringify(subscribeMsg));

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [ws, sendMessage]);

  return (
    <div className="battery-panel">
      <h2>Battery Status</h2>
      <div className="battery-level">
        Battery Level: {batteryLevel.toFixed(1)}%
      </div>
      <div className="connection-status">
        Status: {isConnected ? 'Connected' : 'Disconnected'}
      </div>
    </div>
  );
};

export default BatteryPanel; 