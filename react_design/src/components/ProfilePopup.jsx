import React, { useRef } from 'react';
import './ProfilePopup.css';

function ProfilePopup({ userId, profileUrl, onClose, onChangeProfile }) {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onChangeProfile(imageUrl);
    }
  };

  return (
    <div className="profile-popup" onClick={onClose}>
      <div className="profile-content" onClick={(e) => e.stopPropagation()}>
        <img src={profileUrl} alt="User" className="profile-popup-image" />
        <div className="profile-popup-name">{userId}</div>
        <div className="profile-email">qwer1234@gachon.ac.kr</div>

        <button
          className="profile-edit-button"
          onClick={() => fileInputRef.current.click()}
        >
          프로필 수정
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default ProfilePopup;
