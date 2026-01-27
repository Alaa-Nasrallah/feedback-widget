import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState('form');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>📝 Feedback Widget</h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => setView('form')}
            style={{
              padding: '10px 30px',
              backgroundColor: view === 'form' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ✨ Submit Feedback
          </button>
          <button
            onClick={() => setView('dashboard')}
            style={{
              padding: '10px 30px',
              backgroundColor: view === 'dashboard' ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            📊 Admin Dashboard
          </button>
        </div>
      </div>

      {view === 'form' ? <FeedbackForm /> : <AdminDashboard />}
    </div>
  );
}

export default App;