import React, { useState } from 'react';
import './SubjectById.css';

const SubjectById = () => {
  const [subjectId, setSubjectId] = useState('');
  const [subject, setSubject] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!subjectId) return;

    fetch(`http://localhost:8080/subject/${subjectId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Subject not found');
        return res.json();
      })
      .then((data) => {
        setSubject(data);
        setError('');
      })
      .catch((err) => {
        setSubject(null);
        setError(err.message);
      });
  };

  return (
    <div className="subject-by-id-container">
      <h2>Find Subject by ID</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Enter Subject ID"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {subject && (
        <div className="subject-card">
          <h3>{subject.name}</h3>
          <p>{subject.description}</p>
          <div className="trainer-list">
            <h4>Trainers:</h4>
            {subject.trainers.length > 0 ? (
              subject.trainers.map((trainer) => (
                <p key={trainer.empId}>
                  <strong>{trainer.name}</strong> – {trainer.expertise}
                </p>
              ))
            ) : (
              <p className="no-trainers">No trainers assigned</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectById;
