import React from 'react';
import '../styles/side_bar.css';

const Sidebar = ({ onClose }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="profile-picture">
          <img src="./assets/images/profile-picture.png" alt="Profile" />
        </div>
        <div className="profile-info">
          <div className="username">User Name</div>
          <div className="email">user@example.com</div>
        </div>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="section-header">Profile</div>
          <div className="section-items">
            <div className="section-item">
              <i className="fas fa-user"></i>
              <span>Edit Profile</span>
            </div>
          </div>
        </div>
        <div className="sidebar-section">
          <div className="section-header">Applications</div>
          <div className="section-items">
            <div className="section-item">
              <i className="fas fa-th-large"></i>
              <span>Applications</span>
            </div>
          </div>
        </div>
        <div className="sidebar-section">
          <div className="section-header">Notifications</div>
          <div className="section-items">
            <div className="section-item">
              <i className="fas fa-bell"></i>
              <span>Notifications</span>
            </div>
          </div>
        </div>
        <div className="sidebar-section">
          <div className="section-header">Account</div>
          <div className="section-items">
            <div className="section-item">
              <i className="fas fa-trash"></i>
              <span>Delete Account</span>
            </div>
            <div className="section-item">
              <i className="fas fa-share"></i>
              <span>Share App</span>
            </div>
            <div className="section-item">
              <i className="fas fa-file-alt"></i>
              <span>CV</span>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-overlay" onClick={onClose}></div>
    </div>
  );
};

export default Sidebar;
