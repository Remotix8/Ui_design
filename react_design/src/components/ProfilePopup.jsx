import React from 'react';
import './ProfilePopup.css';

function ProfilePopup({ userId, profileUrl, onClose }) {
  return (
    <div className="profile-popup" onClick={onClose}>
      <img src={profileUrl} alt="profile" className="profile-popup-image" />
      <div className="profile-popup-name">{userId}</div>
    </div>
  );
}

export default ProfilePopup;
