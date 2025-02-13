import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateAccountPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: sessionStorage.getItem('username') || '',
    password: '',
    pay: sessionStorage.getItem('pay') || ''
  });

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    margin: '20px auto'
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/worker/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
      //  sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('pay', data.pay);
        navigate('/worker');
      }
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleUpdate} style={formStyle}>
        
        <input
          style={inputStyle}
          type="password"
          placeholder="New Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Pay"
          value={formData.pay}
          onChange={(e) => setFormData({...formData, pay: e.target.value})}
        />
        <button 
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Update Account
        </button>
      </form>
    </div>
  );
};

export default UpdateAccountPage;