import React from 'react';
import { useNavigate } from 'react-router-dom';

const WorkersPage = () => {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const username = sessionStorage.getItem('username');
      const pay = sessionStorage.getItem('pay');

      const response = await fetch('http://localhost:8080/worker/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify( username ) //{}
      });

      if (response.ok) {
        alert("Succesfully deleted account")
        sessionStorage.clear();
        navigate('/login');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '20px',
        justifyContent: 'center'
      }}>
        <button 
          style={{
            padding: '20px 40px',
            fontSize: '24px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onClick={() => navigate('/worker/products')}
        >
          Products
        </button>
        <button 
          style={{
            padding: '20px 40px',
            fontSize: '24px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onClick={() => navigate('/worker/admin')}
        >
          Admin
        </button>
      </div>
      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center'
      }}>
        <button 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#2196F3',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onClick={() => navigate('/worker/update')}
        >
          Update this account
        </button>
        <button 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#f44336',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onClick={handleDeleteAccount}
        >
          Delete this account
        </button>
      </div>
    </div>
  );
};

export default WorkersPage;