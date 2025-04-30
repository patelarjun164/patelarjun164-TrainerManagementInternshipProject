import React, { useEffect, useState } from 'react';
import './TrainerBySubject.css';

const TrainerBySubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/subject')
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(() => setError('Failed to load subjects.'));
  }, []);

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    if (!subject) {
      setTrainers([]);
      return;
    }

    fetch(`http://localhost:8080/trainer/${subject}/topic`)
      .then(res => {
        if (!res.ok) throw new Error("No trainers found");
        return res.json();
      })
      .then(data => {
        setTrainers(data);
        setError('');
      })
      .catch(err => {
        setTrainers([]);
        setError(err.message);
      });
  };

  return (
    <div className="trainer-by-subject-container">
      <h2>Trainers by Subject</h2>

      <div className="dropdown-container">
        <select value={selectedSubject} onChange={handleSubjectChange}>
          <option value="">-- Select Subject --</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="trainer-cards">
        {trainers.map(trainer => (
          <div className="trainer-card" key={trainer.empId}>
            <h3>{trainer.name}</h3>
            <p><strong>Expertise:</strong> {trainer.expertise}</p>
            <div className="subjects">
              <strong>Subjects:</strong>
              <ul>
                {trainer.subjects.map(sub => (
                  <li key={sub.id}>
                    <span className="subject-name">{sub.name}</span> – {sub.description}
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

export default TrainerBySubject;
