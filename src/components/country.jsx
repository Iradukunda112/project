import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EACCountries.css";

const countries = [
  {
    name: "Burundi",
    flag: "https://flagcdn.com/w320/bi.png",
    area: "27,834 km²",
    revenuePath: "/revenue/burundi",
  },
  {
    name: "DR Congo",
    flag: "https://flagcdn.com/w320/cd.png",
    area: "2,344,858 km²",
    revenuePath: "/revenue/dr-congo",
  },
  {
    name: "Kenya",
    flag: "https://flagcdn.com/w320/ke.png",
    area: "580,367 km²",
    revenuePath: "/revenue/kenya",
  },
  {
    name: "Rwanda",
    flag: "https://flagcdn.com/w320/rw.png",
    area: "26,338 km²",
    revenuePath: "/revenue/rwanda",
  },
  {
    name: "Somalia",
    flag: "https://flagcdn.com/w320/so.png",
    area: "637,657 km²",
    revenuePath: "/revenue/somalia",
  },
  {
    name: "South Sudan",
    flag: "https://flagcdn.com/w320/ss.png",
    area: "619,745 km²",
    revenuePath: "/revenue/south-sudan",
  },
  {
    name: "Tanzania",
    flag: "https://flagcdn.com/w320/tz.png",
    area: "945,087 km²",
    revenuePath: "/revenue/tanzania",
  },
  {
    name: "Uganda",
    flag: "https://flagcdn.com/w320/ug.png",
    area: "241,550 km²",
    revenuePath: "/revenue/uganda",
  },
];

const EACCountries = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section className="eac-wrapper">
        <h2 className="eac-title gradient-text">East African Community – Member Countries</h2>

        <div className="country-grid">
          {countries.map((c) => (
            <button
              key={c.name}
              className="country-card glass"
              onClick={() => setSelected(c)}
              aria-label={`View details for ${c.name}`}
            >
              <span className="badge">{c.area}</span>
              <img src={c.flag} alt={`${c.name} flag`} className="flag" />
              <h3 className="country-name">{c.name}</h3>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <img
              src={selected.flag}
              alt={`${selected.name} flag large`}
              className="modal-flag"
            />

            <h2 className="modal-name">{selected.name}</h2>
            <p className="modal-detail">
              <strong>Area:</strong> {selected.area}
            </p>

            {/* 👇 route must exist in your router config */}
            <Link to={selected.revenuePath} className="revenue-btn">
              Go to {selected.name.split(" ")[0]} Revenue Page
            </Link>

            <button
              className="close-btn"
              onClick={() => setSelected(null)}
              aria-label="Close details"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
    </>
  );
};

export default EACCountries;
