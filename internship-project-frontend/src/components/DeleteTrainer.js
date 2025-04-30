import React, { useEffect, useState } from 'react';
import './DeleteTrainer.css';

const DeleteTrainer = () => {
  const [trainers, setTrainers] = useState([]);

  const fetchTrainers = () => {
    fetch('http://localhost:8080/trainer')
      .then(response => response.json())
      .then(data => setTrainers(data))
      .catch(error => console.error('Error fetching trainers:', error));
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDelete = (empId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete trainer with ID ${empId}?`);
    if (!confirmDelete) return;

    fetch('http://localhost:8080/trainer', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ empId })
    })
      .then(response => {
        if (response.ok) {
          alert('Trainer deleted successfully');
          fetchTrainers(); // Reload trainers
        } else {
          alert('Failed to delete trainer');
        }
      })
      .catch(error => {
        console.error('Error deleting trainer:', error);
        alert('An error occurred while deleting the trainer');
      });
  };

  return (
    <div className="delete-trainer-container">
      <h2>Delete Trainer</h2>
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
                  </li>
                ))}
              </ul>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(trainer.empId)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteTrainer;
