import React, { useState } from 'react';
import './App.css';
import FeedbackForm from "./components/FeedbackForm";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="app-container">
      <h1>Feedback Widget</h1>
      <div className="view-toggle">
        <button
          className={`toggle-button ${!showDashboard ? 'active' : ''}`}
          onClick={() => setShowDashboard(false)}
        >
          Submit Feedback
        </button>
        <button
          className={`toggle-button ${showDashboard ? 'active' : ''}`}
          onClick={() => setShowDashboard(true)}
        >
          Admin Dashboard
        </button>
      </div>
      {showDashboard ? <AdminDashboard /> : <FeedbackForm />}
    </div>
  );
}

export default App;
