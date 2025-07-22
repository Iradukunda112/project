import React, { useState } from "react";
import {
  FaUser, FaEnvelope, FaBriefcase,
  FaEdit, FaSave, FaTimes, FaCamera
} from "react-icons/fa";
import "./Profile.css";

const defaultAvatar =
  "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&size=256";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    position: "Software Engineer",
    avatar: defaultAvatar,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  const handleEdit = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const handleCancel = () => setIsEditing(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setDraft((prev) => ({ ...prev, avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setProfile(draft);
    setIsEditing(false);
  };

  return (
    <section className="profile-wrap">
      <h1 className="welcome-heading">Welcome back, {profile.firstName}!</h1>

      {!isEditing && (
        <div className="profile-card glass">
          <div className="avatar-wrapper">
            <img src={profile.avatar} alt="avatar" className="avatar" />
            <button className="edit-btn round" onClick={handleEdit}>
              <FaEdit />
            </button>
          </div>

          <ul className="profile-list">
            <li><FaUser className="icon" /> <strong>First Name:</strong> {profile.firstName}</li>
            <li><FaUser className="icon" /> <strong>Last Name:</strong> {profile.lastName}</li>
            <li><FaEnvelope className="icon" /> <strong>Email:</strong> {profile.email}</li>
            <li><FaBriefcase className="icon" /> <strong>Position:</strong> {profile.position}</li>
          </ul>
        </div>
      )}

      {isEditing && (
        <div className="modal-backdrop" onClick={handleCancel}>
          <div
            className="modal glass"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h2>Edit Profile</h2>

            <form
              className="modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <label className="avatar-input">
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                <img src={draft.avatar} alt="avatar preview" className="avatar preview" />
                <span className="camera"><FaCamera /></span>
              </label>

              <label>
                First Name
                <input
                  type="text"
                  name="firstName"
                  value={draft.firstName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Last Name
                <input
                  type="text"
                  name="lastName"
                  value={draft.lastName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={draft.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Position
                <input
                  type="text"
                  name="position"
                  value={draft.position}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="modal-actions">
                <button type="submit" className="btn primary">
                  <FaSave /> Save
                </button>
                <button type="button" className="btn ghost" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Wavy Bottom with EAC Colors */}
      <div className="bottom-wave">
        <svg viewBox="0 0 1200 250" preserveAspectRatio="none">
          <path d="M0,80 C300,10 900,180 1200,100 L1200,250 L0,250 Z" fill="#00A1DE" />
          <path d="M0,90 C300,20 900,190 1200,110 L1200,250 L0,250 Z" fill="#000000" />
          <path d="M0,100 C300,30 900,200 1200,120 L1200,250 L0,250 Z" fill="#FFC107" />
          <path d="M0,110 C300,40 900,210 1200,130 L1200,250 L0,250 Z" fill="#009639" />
          <path d="M0,120 C300,50 900,220 1200,140 L1200,250 L0,250 Z" fill="#CE1126" />
          <path d="M0,130 C300,60 900,230 1200,150 L1200,250 L0,250 Z" fill="#FFFFFF" />
          <path d="M0,140 C300,70 900,240 1200,160 L1200,250 L0,250 Z" fill="#00A1DE" />
        </svg>
      </div>
    </section>
  );
};

export default Profile;