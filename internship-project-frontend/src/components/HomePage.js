import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { FaPlus, FaList, FaTrash, FaSearch, FaChalkboardTeacher, FaBook } from 'react-icons/fa';

function HomePage() {
  const trainerActions = [
    { path: '/add/trainer', icon: <FaPlus />, label: 'Add Trainer' },
    { path: '/trainers', icon: <FaList />, label: 'Get All Trainers' },
    { path: '/delete/trainer', icon: <FaTrash />, label: 'Delete Trainer' },
    { path: '/trainerById', icon: <FaSearch />, label: 'Get Trainer By ID' },
    { path: '/trainer-by-subject', icon: <FaChalkboardTeacher />, label: 'Trainer By Subject' },
  ];

  const subjectActions = [
    { path: '/add-subject', icon: <FaPlus />, label: 'Add Subject' },
    { path: '/get-subjects', icon: <FaList />, label: 'Get All Subjects' },
    { path: '/subjectById', icon: <FaSearch />, label: 'Subject By ID' },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Trainer Management Dashboard</h1>

      <div className="dashboard-section">
        <h2>Trainer Actions</h2>
        <div className="button-grid">
          {trainerActions.map(({ path, icon, label }) => (
            <Link to={path} key={path} className="dashboard-button">
              <div className="icon">{icon}</div>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Subject Actions</h2>
        <div className="button-grid">
          {subjectActions.map(({ path, icon, label }) => (
            <Link to={path} key={path} className="dashboard-button">
              <div className="icon">{icon}</div>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
