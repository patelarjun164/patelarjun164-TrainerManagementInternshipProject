import React, { useEffect, useState } from 'react';
import './AddTrainerForm.css';
import { useNavigate } from 'react-router-dom';

const AddTrainer = () => {
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/subject')
      .then(response => response.json())
      .then(data => setSubjects(data))
      .catch(error => console.error('Error fetching subjects:', error));
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedSubjects(prev =>
      prev.includes(id)
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainerData = {
      name,
      expertise,
      subjects: selectedSubjects.map(id => ({ id }))
    };

    try {
      const response = await fetch('http://localhost:8080/trainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainerData)
      });

      if (response.ok) {
        setSuccessMessage('Trainer added successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/trainers'); // redirect to home or another page
        }, 2000);
      } else {
        console.error('Failed to add trainer');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="add-trainer-container">
      <h2>Add Trainer</h2>
      <form onSubmit={handleSubmit} className="trainer-form">
        <input
          type="text"
          placeholder="Trainer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Expertise"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          required
        />

        <div className="subject-checkboxes">
          <label>Select Subjects:</label>
          {subjects.map(subject => (
            <label key={subject.id} className="checkbox-label">
              <input
                type="checkbox"
                value={subject.id}
                checked={selectedSubjects.includes(subject.id)}
                onChange={() => handleCheckboxChange(subject.id)}
              />
              {subject.name}
            </label>
          ))}
        </div>

        <button type="submit">Add Trainer</button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default AddTrainer;
