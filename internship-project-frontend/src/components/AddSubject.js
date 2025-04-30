import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddSubject.css';

const AddSubject = () => {
  const [subject, setSubject] = useState({ name: '', description: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/subject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subject),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add subject');
        return res.json();
      })
      .then(() => {
        setMessage('Subject added successfully!');
        setError('');
        setTimeout(() => navigate('/'), 2000);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
        setMessage('');
      });
  };

  return (
    <div className="add-subject-container">
      <h2>Add New Subject</h2>
      <form className="add-subject-form" onSubmit={handleSubmit}>
        <label>
          Subject Name:
          <input
            type="text"
            name="name"
            value={subject.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={subject.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <button type="submit">Add Subject</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddSubject;
