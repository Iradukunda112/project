import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import "./Event.css";

const cgMeetings = [
  {
    id: 1,
    title: "CG Quarterly Strategy Meeting",
    date: "2025-08-15",
    location: "Nairobi, Kenya",
    status: "Upcoming",
    description:
      "Commissioner-Generals meet to align revenue-collection strategy across EAC.",
  },
  {
    id: 2,
    title: "CG Budget Alignment Session",
    date: "2025-05-30",
    location: "Arusha, Tanzania",
    status: "Closed",
    description:
      "Final review of the regional budget allocations for FY 2025/2026.",
  },
];

const tcMeetings = {
  HR: [
    {
      id: 101,
      title: "TC-HR Recruitment Framework Workshop",
      date: "2025-07-12",
      location: "Kigali, Rwanda",
      status: "Upcoming",
      description:
        "Standardising recruitment policies and job grading across EAC revenue bodies.",
    },
  ],
  IT: [
    {
      id: 201,
      title: "TC-IT Cyber-Security Drill",
      date: "2025-06-22",
      location: "Kampala, Uganda",
      status: "Upcoming",
      description:
        "Joint incident-response simulation for revenue systems.",
    },
    {
      id: 202,
      title: "TC-IT Data Integration Sprint Review",
      date: "2025-04-18",
      location: "Dar es Salaam, Tanzania",
      status: "Closed",
      description:
        "Show-and-tell of API integration progress between member states.",
    },
  ],
  Domestic: [
    {
      id: 301,
      title: "TC-Domestic Tax Harmonisation Forum",
      date: "2025-09-08",
      location: "Bujumbura, Burundi",
      status: "Upcoming",
      description:
        "Discuss aligning domestic tax codes to simplify intra-EAC trade.",
    },
  ],
};

const TABS = ["CG Meetings", "TC Meetings"];
const COMMITTEES = ["HR", "IT", "Domestic"];

function Event() {
  const [activeTab, setActiveTab] = useState("CG Meetings");
  const [activeCommittee, setActiveCommittee] = useState("HR");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredCgEvents = cgMeetings.filter((ev) => ev.status === "Upcoming");
  const filteredTcEvents = tcMeetings[activeCommittee].filter(
    (ev) => ev.status === "Upcoming"
  );

  const eventsToShow =
    activeTab === "CG Meetings" ? filteredCgEvents : filteredTcEvents;

  return (
    <>
      <section className="upcoming-wrapper">
        <h1>Upcoming Events</h1>

        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "TC Meetings" && (
          <div className="committee-pills">
            {COMMITTEES.map((comm) => (
              <button
                key={comm}
                className={`pill-button ${
                  activeCommittee === comm ? "active" : ""
                }`}
                onClick={() => setActiveCommittee(comm)}
              >
                {comm}
              </button>
            ))}
          </div>
        )}

        <div className="events-grid">
          {eventsToShow.length === 0 && (
            <p className="no-events">No upcoming events found.</p>
          )}
          {eventsToShow.map((ev) => (
            <div
              key={ev.id}
              className="event-card"
              onClick={() => setSelectedEvent(ev)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") setSelectedEvent(ev);
              }}
            >
              <h3>{ev.title}</h3>
              <p className="event-date">
                <FaCalendarAlt /> {new Date(ev.date).toLocaleDateString()}
              </p>
              <p className="event-location">
                <FaMapMarkerAlt /> {ev.location}
              </p>
              <button
                className="view-details-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(ev);
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedEvent(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close details"
              >
                <FaTimes />
              </button>
              <h2 id="modal-title">{selectedEvent.title}</h2>
              <p>
                <strong>Date: </strong>
                {new Date(selectedEvent.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Location: </strong>
                {selectedEvent.location}
              </p>
              <p className="modal-description">{selectedEvent.description}</p>
            </div>
          </div>
        )}
      </section>

      {/* 🌊 Bottom wave moved outside of section */}
      <div className="bottom-wave1">
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
    </>
  );
}

export default Event;
