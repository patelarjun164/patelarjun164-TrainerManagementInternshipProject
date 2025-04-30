import React, { useEffect, useState } from 'react';
import './AllTrainers.css';

const AllTrainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/trainer')
      .then(response => response.json())
      .then(data => setTrainers(data))
      .catch(error => console.error('Error fetching trainers:', error));
  }, []);

  return (
    <div className="trainer-list-container">
      <h2>All Trainers</h2>
      <div className="trainer-grid">
        {trainers.map(trainer => (
          <div className="trainer-card" key={trainer.empId}>
            <h3>{trainer.name}</h3>
            <p><strong>Expertise:</strong> {trainer.expertise}</p>
            <div className="subjects">
              <strong>Subjects:</strong>
              <ul>
                {trainer.subjects.map(subject => (
                  <li key={subject.id}>
                    <span className="subject-name">{subject.name}</span>
                    <span className="subject-desc"> - {subject.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;
