import React, { useState } from "react";
import "./DocumentReview.css";

function DocumentReview() {
  const receivedDocument = {
    fileName: "Scholarship_Request_Form.pdf",
    downloadUrl: "/documents/Scholarship_Request_Form.pdf", // adjust based on real path
  };

  const [submissionStatus, setSubmissionStatus] = useState("Pending"); // "Pending", "Approved", "Rejected"
  const [remarks, setRemarks] = useState("");
  const [isUnread, setIsUnread] = useState(true); // new state to track if document is unread

  const handleReviewAction = (action) => {
    setSubmissionStatus(action);
    alert(`📌 Document has been ${action === "Approved" ? "approved" : "rejected"}.`);
    // Send backend update here if needed
  };

  const markAsRead = () => {
    setIsUnread(false);
  };

  return (
    <div className="review-wrapper">
      <h2>📄 Document Review Panel</h2>

      {/* 🔔 New Document Reminder */}
      {isUnread && (
        <div className="new-document-alert">
          🔔 <strong>New document received</strong> - please review!
        </div>
      )}

      <div className="file-summary">
        <p>
          <strong>📎 Document Received:</strong>{" "}
          {receivedDocument.fileName}{" "}
          {isUnread && <span className="unread-indicator">🔵</span>}
        </p>

        <p>
          <strong>📥 Download:</strong>{" "}
          <a
            href={receivedDocument.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={markAsRead}
          >
            View/Download
          </a>
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span className={`status ${submissionStatus.toLowerCase()}`}>
            {submissionStatus}
          </span>
        </p>
      </div>

      {/* Review Actions */}
      {submissionStatus === "Pending" && (
        <div className="review-section">
          <textarea
            placeholder="📝 Add reviewer remarks (optional)"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="remarks-box"
          />
          <div className="action-buttons">
            <button
              className="approve-btn"
              onClick={() => handleReviewAction("Approved")}
            >
              ✅ Approve
            </button>
            <button
              className="reject-btn"
              onClick={() => handleReviewAction("Rejected")}
            >
              ❌ Reject
            </button>
          </div>
        </div>
      )}

      {/* Final Remarks */}
      {["Approved", "Rejected"].includes(submissionStatus) && (
        <div className="final-remarks">
          <h4>
            🗂 Final Status:{" "}
            <span className={`status ${submissionStatus.toLowerCase()}`}>
              {submissionStatus}
            </span>
          </h4>
          <h5>📝 Reviewer Remarks:</h5>
          <p>{remarks.trim() || "No remarks provided."}</p>
        </div>
      )}
    </div>
  );
}

export default DocumentReview;
