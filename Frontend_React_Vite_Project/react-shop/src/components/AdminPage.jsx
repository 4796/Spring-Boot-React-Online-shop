import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({
    username: '',
    password: '',
    pay: ''
  });
  
  const username = sessionStorage.getItem('username');
  const url = new URL('http://localhost:8080/worker/all');

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (username) url.searchParams.set('username1', username);
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWorkers(data);
      }
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const handleAddWorker = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/worker/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          
          username: username,
          newworker: newWorker
        })
      });

      if (response.ok) {
        setNewWorker({
          username: '',
          password: '',
          pay: ''
        });
        fetchWorkers(); // Osvežavanje liste radnika
      }
    } catch (error) {
      console.error('Error adding worker:', error);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    margin: '0 auto 20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px'
  };

  const inputStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const workersListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    padding: '20px'
  };

  const workerCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Worker</h2>
      <form onSubmit={handleAddWorker} style={formStyle}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Username"
          value={newWorker.username}
          onChange={(e) => setNewWorker({...newWorker, username: e.target.value})}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={newWorker.password}
          onChange={(e) => setNewWorker({...newWorker, password: e.target.value})}
          required
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Pay"
          value={newWorker.pay}
          onChange={(e) => setNewWorker({...newWorker, pay: e.target.value})}
          required
        />
        <button type="submit" style={buttonStyle}>
          Add Worker
        </button>
      </form>

      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Workers List</h2>
      <div style={workersListStyle}>
        {workers.map((worker, index) => (
          <div key={index} style={workerCardStyle}>
            <p>Username: {worker.username}</p>
            <p>Pay: {worker.pay}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;