import React from 'react';

const Report = () => {
  const reports = [
    { title: "Monthly Sales", date: "07/01/2025" },
    { title: "Quarterly Review", date: "07/10/2025" },
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-2">Reports</h3>
      <ul className="space-y-2">
        {reports.map((report, index) => (
          <li key={index} className="flex justify-between">
            <span>{report.title}</span>
            <span>{report.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Report;