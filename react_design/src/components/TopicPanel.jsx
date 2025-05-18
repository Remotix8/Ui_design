import React, { useState } from 'react';
import './TopicPanel.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

const TopicPanel = () => {
  const [topics, setTopics] = useState([
    {
      name: '/camera/image_raw',
      category: 'camera',
      color: '#DEE8FF',
      textColor: '#5A8CFF',
      isFavorite: false
    },
    {
      name: '/cmd_vel',
      category: 'control',
      color: '#F6DDFF',
      textColor: '#D456FD',
      isFavorite: false
    },
  ]);

  const toggleFavorite = (index) => {
    const newTopics = [...topics];
    newTopics[index].isFavorite = !newTopics[index].isFavorite;
    setTopics(newTopics);
  };

  return (
    <div className="topic-container">
      <div className="topic-panel">
        <h2 className="panel-title">Topic</h2>
        <div className="topic-list">
          {topics.map((topic, index) => (
            <div key={index} className="topic-item">
              <button 
                className="favorite-button"
                onClick={() => toggleFavorite(index)}
              >
                {topic.isFavorite ? <FaStar className="star-icon filled" /> : <FaRegStar className="star-icon" />}
              </button>
              <div 
                className="category-badge" 
                style={{ 
                  backgroundColor: topic.color,
                  color: topic.textColor
                }}
              >
                <span>{topic.category}</span>
              </div>
              <div className="topic-name">{topic.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicPanel; 
