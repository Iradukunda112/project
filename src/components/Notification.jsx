import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, FileText, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import './Notification.css';

const Notification = () => {
  const [isMeetingsOpen, setIsMeetingsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedDepartment, setExpandedDepartment] = useState(null);

  const cgMeetings = [
    { id: 1, location: 'Kigali', date: '2025-07-10', description: 'CG Strategic Planning' },
    { id: 2, location: 'Huye', date: '2025-07-12', description: 'CG Budget Review' },
  ];

  const tcDepartments = {
    HR: [
      { id: 1, location: 'Musanze', date: '2025-07-15', description: 'HR Recruitment Planning' },
      { id: 2, location: 'Kigali', date: '2025-07-18', description: 'HR Policy Update' },
    ],
    IT: [
      { id: 1, location: 'Kigali', date: '2025-07-20', description: 'IT Security Briefing' },
    ],
    Customs: [
      { id: 1, location: 'Rubavu', date: '2025-07-22', description: 'Customs Compliance Meeting' },
    ],
  };

  const totalNewMeetings = cgMeetings.length + Object.values(tcDepartments).reduce((acc, list) => acc + list.length, 0);
  const totalResolutions = 5;
  const totalMinutes = 3;

  const toggleCategory = (category) => {
    if (expandedCategory !== category) setExpandedDepartment(null);
    setExpandedCategory(prev => (prev === category ? null : category));
  };

  const toggleDepartment = (department) => {
    setExpandedDepartment(prev => (prev === department ? null : department));
  };

  return (
    <>
      <div className="notification-wrapper">
        <h1 className="notification-title">🔔 Notifications</h1>

        {/* New Meetings */}
        <div className="notification-card">
          <button
            className="notification-header"
            onClick={() => setIsMeetingsOpen(!isMeetingsOpen)}
            aria-expanded={isMeetingsOpen}
            aria-controls="meetings-content"
          >
            <div className="notification-header-left">
              <Bell className="icon" />
              <span>New Meetings</span>
            </div>
            <div className="notification-header-right">
              <span className="badge badge-blue badge-ring">{totalNewMeetings}</span>
              {isMeetingsOpen ? (
                <ChevronDown className="icon arrow-icon rotate" />
              ) : (
                <ChevronRight className="icon arrow-icon" />
              )}
            </div>
          </button>

          <AnimatePresence>
            {isMeetingsOpen && (
              <motion.div
                id="meetings-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="meetings-content"
              >
                {/* CG Meetings Toggle */}
                <button
                  className={`category-toggle ${expandedCategory === 'CG' ? 'active' : ''}`}
                  onClick={() => toggleCategory('CG')}
                  aria-expanded={expandedCategory === 'CG'}
                  aria-controls="cg-meetings"
                >
                  <span>▶ CG's Meetings</span>
                  <ChevronRight
                    className={`icon arrow-icon small ${expandedCategory === 'CG' ? 'rotate' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {expandedCategory === 'CG' && (
                    <motion.div
                      id="cg-meetings"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="meeting-list"
                    >
                      {cgMeetings.map((meeting) => (
                        <div key={meeting.id} className="meeting-item">
                          <p><strong>📍 Location:</strong> {meeting.location}</p>
                          <p><strong>📅 Date:</strong> {meeting.date}</p>
                          <p><strong>📝 About:</strong> {meeting.description}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* TC Meetings Toggle */}
                <button
                  className={`category-toggle ${expandedCategory === 'TC' ? 'active' : ''}`}
                  onClick={() => toggleCategory('TC')}
                  aria-expanded={expandedCategory === 'TC'}
                  aria-controls="tc-meetings"
                >
                  <span>▶ TC Meetings</span>
                  <ChevronRight
                    className={`icon arrow-icon small ${expandedCategory === 'TC' ? 'rotate' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {expandedCategory === 'TC' && (
                    <motion.div
                      id="tc-meetings"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="meeting-list"
                    >
                      {Object.entries(tcDepartments).map(([dept, meetings]) => (
                        <div key={dept}>
                          <button
                            className={`category-toggle dept-toggle ${expandedDepartment === dept ? 'active' : ''}`}
                            onClick={() => toggleDepartment(dept)}
                            aria-expanded={expandedDepartment === dept}
                            aria-controls={`${dept.toLowerCase()}-meetings`}
                          >
                            <span>▶ {dept} Department</span>
                            <ChevronRight
                              className={`icon arrow-icon small ${expandedDepartment === dept ? 'rotate' : ''}`}
                            />
                          </button>

                          <AnimatePresence>
                            {expandedDepartment === dept && (
                              <motion.div
                                id={`${dept.toLowerCase()}-meetings`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="meeting-list nested-list"
                              >
                                {meetings.map((meeting) => (
                                  <div key={meeting.id} className="meeting-item">
                                    <p><strong>📍 Location:</strong> {meeting.location}</p>
                                    <p><strong>📅 Date:</strong> {meeting.date}</p>
                                    <p><strong>📝 About:</strong> {meeting.description}</p>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Resolutions */}
        <div className="notification-card">
          <div className="notification-header resolution-header">
            <div className="notification-header-left">
              <BookOpen className="icon green" />
              <span>Resolutions</span>
            </div>
            <span className="badge badge-green">{totalResolutions}</span>
          </div>
        </div>

        {/* Minutes */}
        <div className="notification-card">
          <div className="notification-header minutes-header">
            <div className="notification-header-left">
              <FileText className="icon purple" />
              <span>Minutes</span>
            </div>
            <span className="badge badge-purple">{totalMinutes}</span>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
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
    </>
  );
};

export default Notification;
