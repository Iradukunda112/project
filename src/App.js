import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import Country from "./components/country";
import Event from "./components/Event";
import Notification from "./components/Notification";
import AssignedResolution from "./components/AssignedResolution";
import Report from "./components/Report";
import ArchiveMeeting from "./components/ArchiveMeeting";
import DocumentReview from "./components/DocumentReview"; // ✅ Import

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/country" element={<Country />} />
            <Route path="/event" element={<Event />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/assigned-resolution" element={<AssignedResolution />} />
            <Route path="/report" element={<Report />} />
            <Route path="/archive-meeting" element={<ArchiveMeeting />} />
            <Route path="/document-review" element={<DocumentReview />} /> {/* ✅ New Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
