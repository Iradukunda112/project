import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserAlt,
  FaGlobe,
  FaCalendarAlt,
  FaBell,
  FaTasks,
  FaFileAlt,
  FaArchive,
  FaBars,
  FaFileSignature, // ✅ New icon for Document Review
} from "react-icons/fa";

import "./Sidebar.css";

// ✅ Updated menu items including Document Review
const menuItems = [
  { to: "/", label: "Profile", icon: <FaUserAlt /> },
  { to: "/country", label: "Country", icon: <FaGlobe /> },
  { to: "/event", label: "Event", icon: <FaCalendarAlt /> },
  { to: "/notification", label: "Notification", icon: <FaBell /> },
  { to: "/assigned-resolution", label: "Assigned Resolution", icon: <FaTasks /> },
  { to: "/report", label: "Report", icon: <FaFileAlt /> },
  { to: "/archive-meeting", label: "Archive Meeting", icon: <FaArchive /> },
  { to: "/document-review", label: "Document Review", icon: <FaFileSignature /> }, // ✅ New item
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <aside className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar__header">
        <img
          src="https://via.placeholder.com/80"
          alt="EARACG Logo"
          className="sidebar__avatar"
        />
        <h2 className="sidebar__title">EARACG</h2>
        <button
          className="sidebar__toggle"
          onClick={toggleSidebar}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <FaBars />
        </button>
      </div>

      <nav className="sidebar__nav">
        {menuItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar__link${isActive ? " sidebar__link--active" : ""}`
            }
            end
            title={!isExpanded ? label : undefined} // Show tooltip on collapsed sidebar
          >
            <span className="sidebar__icon">{icon}</span>
            <span className="sidebar__label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
