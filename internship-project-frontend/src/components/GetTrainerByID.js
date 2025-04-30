import React, { useState } from 'react';
import './GetTrainerByID.css';

const GetTrainerByID = () => {
  const [trainerId, setTrainerId] = useState('');
  const [trainer, setTrainer] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!trainerId.trim()) {
      setError("Please enter a valid trainer ID.");
      setTrainer(null);
      return;
    }

    fetch(`http://localhost:8080/trainer/${trainerId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Trainer not found");
        }
        return res.json();
      })
      .then(data => {
        setTrainer(data);
        setError('');
      })
      .catch(err => {
        setTrainer(null);
        setError(err.message);
      });
  };

  return (
    <div className="get-trainer-container">
      <h2>Find Trainer by ID</h2>
      <div className="search-box">
        <input
          type="number"
          value={trainerId}
          onChange={(e) => setTrainerId(e.target.value)}
          placeholder="Enter Trainer ID"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {trainer && (
        <div className="trainer-card">
          <h3>{trainer.name}</h3>
          <p><strong>Expertise:</strong> {trainer.expertise}</p>
          <div className="subjects">
            <strong>Subjects:</strong>
            <ul>
              {trainer.subjects.map(subject => (
                <li key={subject.id}>
                  <span className="subject-name">{subject.name}</span> – {subject.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetTrainerByID;
