import React, { useEffect, useState } from 'react';
import './AllSubjects.css';

const AllSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/subject')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch subjects');
        return res.json();
      })
      .then((data) => setSubjects(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="subjects-container">
      <h2>All Subjects</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="subjects-grid">
        {subjects.map((subject) => (
          <div key={subject.id} className="subject-card">
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
        ))}
      </div>
    </div>
  );
};

export default AllSubjects;
