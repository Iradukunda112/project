import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Archive,
  Calendar,
  ChevronDown,
  ChevronRight,
  Download          // single download icon
} from 'lucide-react';
import jsPDF from 'jspdf';
import './ArchiveMeeting.css';

const ArchiveMeeting = () => {
  const [showYears, setShowYears] = useState(false);
  const [openYear, setOpenYear] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [yearFilter, setYearFilter] = useState('');

  /* ---------- SAMPLE DATA ---------- */
  const archiveData = {
    2024: {
      CG: [
        { id: 1, location: 'Kigali', date: '2024‑08‑05', description: 'Annual Budget Review' },
        { id: 2, location: 'Huye',   date: '2024‑10‑12', description: 'Mid‑Year Strategy' },
      ],
      Resolutions: [
        { id: 1, title: 'Financial Policy Update', date: '2024‑11‑20' },
        { id: 2, title: 'CSR Initiative Approval', date: '2024‑12‑15' },
      ],
      Minutes: [
        { id: 1, title: 'Quarter‑1 Minutes', date: '2024‑04‑03' },
      ],
    },
    2023: {
      CG: [
        { id: 1, location: 'Musanze', date: '2023‑05‑17', description: 'IT Infrastructure Plan' },
      ],
      Resolutions: [
        { id: 1, title: 'Health & Safety Policy', date: '2023‑09‑02' },
      ],
      Minutes: [
        { id: 1, title: 'Year‑End Review Minutes', date: '2023‑12‑22' },
      ],
    },
  };

  /* ---------- HELPERS ---------- */
  const handleYearToggle   = yr  => { setOpenCategory(null); setOpenYear(prev => prev===yr ? null : yr); };
  const handleCatToggle    = cat => setOpenCategory(prev => prev===cat ? null : cat);

  /* generate a quick PDF for one meeting */
  const downloadPDF = (year, cat, item) => {
    const doc = new jsPDF();
    doc.text(`${cat} – ${year}`, 14, 18);
    doc.text(`Location: ${item.location || '-'}`, 14, 30);
    doc.text(`Date: ${item.date}`, 14, 38);
    doc.text(`Description: ${item.title || item.description}`, 14, 46);
    doc.save(`meeting_${item.id}_${year}.pdf`);
  };

  /* filter list of years */
  const years = Object.keys(archiveData)
    .filter(y => y.includes(yearFilter.trim()))
    .sort((a, b) => b - a);

  /* ---------- RENDER ---------- */
  return (
    <div className="archive-wrapper">
      <h1 className="archive-title">
        <Archive className="archive-icon" /> Archive Meetings
      </h1>

      {/* Year search */}
      <div className="year-search">
        <input
          placeholder="Filter by year…"
          value={yearFilter}
          onChange={e => setYearFilter(e.target.value)}
        />
      </div>

      {/* Accordion root */}
      <div className="archive-card">
        <button
          className="archive-header"
          onClick={() => setShowYears(!showYears)}
          aria-expanded={showYears}
        >
          <div className="archive-header-left">
            <Calendar className="icon" />
            <span>Old Meetings</span>
          </div>
          {showYears
            ? <ChevronDown className="icon arrow-icon rotate" />
            : <ChevronRight className="icon arrow-icon" />}
        </button>

        {/* Years */}
        <AnimatePresence>
          {showYears && (
            <motion.ul
              initial={{opacity:0,height:0}}
              animate={{opacity:1,height:'auto'}}
              exit={{opacity:0,height:0}}
              transition={{duration:0.35}}
              className="year-list"
            >
              {years.map(yr => (
                <li key={yr}>
                  <button
                    className={`year-toggle ${openYear===yr ? 'active':''}`}
                    onClick={() => handleYearToggle(yr)}
                  >
                    {yr}
                    <ChevronRight className={`icon arrow-icon small ${openYear===yr?'rotate':''}`} />
                  </button>

                  {/* Categories */}
                  <AnimatePresence>
                    {openYear===yr && (
                      <motion.div
                        initial={{opacity:0,height:0}}
                        animate={{opacity:1,height:'auto'}}
                        exit={{opacity:0,height:0}}
                        transition={{duration:0.3}}
                        className="category-list"
                      >
                        {['CG','Resolutions','Minutes'].map(cat=>(
                          <div key={cat}>
                            <button
                              className={`category-toggle ${openCategory===cat?'active':''}`}
                              onClick={()=>handleCatToggle(cat)}
                            >
                              {cat==='CG' ? "CG’s Meetings" : cat}
                              <ChevronRight className={`icon arrow-icon small ${openCategory===cat?'rotate':''}`} />
                            </button>

                            {/* Items */}
                            <AnimatePresence>
                              {openCategory===cat && (
                                <motion.div
                                  initial={{opacity:0,height:0}}
                                  animate={{opacity:1,height:'auto'}}
                                  exit={{opacity:0,height:0}}
                                  transition={{duration:0.25}}
                                  className={`item-list ${cat!=='CG'?'flat-list':''}`}
                                >
                                  {archiveData[yr][cat].map(item=>(
                                    <div key={item.id} className="item-card">
                                      <div className="item-content">
                                        {cat==='CG' && (
                                          <>
                                            <p><strong>📍 Location:</strong> {item.location}</p>
                                            <p><strong>📅 Date:</strong> {item.date}</p>
                                            <p><strong>📝 About:</strong> {item.description}</p>
                                          </>
                                        )}
                                        {cat==='Resolutions' && (
                                          <>
                                            <p><strong>📜 Resolution:</strong> {item.title}</p>
                                            <p><strong>📅 Date:</strong> {item.date}</p>
                                          </>
                                        )}
                                        {cat==='Minutes' && (
                                          <>
                                            <p><strong>📑 Minutes:</strong> {item.title}</p>
                                            <p><strong>📅 Date:</strong> {item.date}</p>
                                          </>
                                        )}
                                      </div>

                                      {/* single PDF button */}
                                      <button
                                        className="dl-btn"
                                        onClick={()=>downloadPDF(yr,cat,item)}
                                        title="Download PDF"
                                      >
                                        <Download size={15}/>
                                      </button>
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
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
      
    
  );
};

export default ArchiveMeeting;
