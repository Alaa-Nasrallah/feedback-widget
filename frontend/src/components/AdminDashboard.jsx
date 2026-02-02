import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch feedbacks when component mounts
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${API_BASE_URL}/api/feedback`);
      // ✅ Your backend returns { success, count, data: [...] }
      setFeedbacks(response.data.data || []);
    } catch (err) {
      console.error("Failed to load feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "30px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#333",
        }}
      >
        📊 Feedback Dashboard
      </h2>

      {/* Refresh button */}
      <button
        onClick={fetchFeedbacks}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        🔄 Refresh
      </button>

      {/* Loading state */}
      {loading && <p style={{ textAlign: "center" }}>Loading feedback...</p>}

      {/* Empty state */}
      {!loading && feedbacks.length === 0 && (
        <p style={{ textAlign: "center", color: "#666" }}>
          No feedback submitted yet.
        </p>
      )}

      {/* Feedback table */}
      {!loading && feedbacks.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th
                  style={{
                    padding: "12px",
                    borderBottom: "2px solid #dee2e6",
                    textAlign: "left",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    padding: "12px",
                    borderBottom: "2px solid #dee2e6",
                    textAlign: "left",
                  }}
                >
                  Rating
                </th>
                <th
                  style={{
                    padding: "12px",
                    borderBottom: "2px solid #dee2e6",
                    textAlign: "left",
                  }}
                >
                  Comment
                </th>
                <th
                  style={{
                    padding: "12px",
                    borderBottom: "2px solid #dee2e6",
                    textAlign: "left",
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback._id} style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td style={{ padding: "12px" }}>{feedback._id}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ color: "gold", fontSize: "20px" }}>
                      {"★".repeat(feedback.rating)}
                      {"☆".repeat(5 - feedback.rating)}
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      ({feedback.rating}/5)
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    {feedback.comment || (
                      <em style={{ color: "#999" }}>No comment</em>
                    )}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {formatDate(feedback.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Total count */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
          textAlign: "center",
        }}
      >
        Total Feedback: <strong>{feedbacks.length}</strong>
      </div>
    </div>
  );
};

export default AdminDashboard;