// src/components/Clock.jsx
import React, { useState, useEffect } from 'react';
import './Clock.css';

export default function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 원하는 포맷으로 찍어줄 수 있어요
  const timeString = now.toLocaleTimeString();             // ex. "14:05:09"
  const dateString = now.toLocaleDateString();             // ex. "2025-05-18"

  return (
    <div className="clock-panel">
      <div className="clock-date">{dateString}</div>
      <div className="clock-time">{timeString}</div>
    </div>
  );
}
