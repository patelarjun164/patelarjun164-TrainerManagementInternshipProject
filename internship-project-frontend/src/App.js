// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddTrainerForm from './components/AddTrainerForm';
import AllTrainers from './components/AllTrainers';
import DeleteTrainer from './components/DeleteTrainer';
import GetTrainerByID from './components/GetTrainerByID';
import TrainerBySubject from './components/TrainerBySubject';
import AddSubject from './components/AddSubject';
import AllSubjects from './components/AllSubjects';
import SubjectById from './components/SubjectById';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add/trainer" element={<AddTrainerForm />} />
          <Route path="/trainers" element={<AllTrainers />} />
          <Route path="/delete/trainer" element={<DeleteTrainer />} />
          <Route path="/trainerById" element={<GetTrainerByID />} />
          <Route path="/trainer-by-subject" element={<TrainerBySubject />} />
          <Route path="/add-subject" element={<AddSubject />} />
          <Route path="/get-subjects" element={<AllSubjects />} />
          <Route path="/subjectById" element={<SubjectById />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
