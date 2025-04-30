package com.hackmech.InternshipProject.service;

import com.hackmech.InternshipProject.entity.Subject;
import com.hackmech.InternshipProject.entity.Trainer;
import com.hackmech.InternshipProject.repository.SubjectRepository;
import com.hackmech.InternshipProject.repository.TrainerRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class TrainerService {

    private final TrainerRepository trainerRepository;
    private final SubjectRepository subjectRepository;

    @Autowired
    public TrainerService(TrainerRepository trainerRepository, SubjectRepository subjectRepository) {
        this.trainerRepository = trainerRepository;
        this.subjectRepository = subjectRepository;
    }

    public Trainer addTrainer(Trainer trainer) {
        // Fetch complete Subject entities using the IDs passed from frontend
        List<Subject> fullSubjects = trainer.getSubjects().stream()
                .map(sub -> subjectRepository.findById(sub.getId()).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        trainer.setSubjects(fullSubjects);

        return trainerRepository.save(trainer);
    }

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public void deleteTrainerById(int empId) {
        if (!trainerRepository.existsById(empId)) {
            throw new EntityNotFoundException("Trainer with empId " + empId + " not found");
        }
        trainerRepository.deleteById(empId);
    }

    public Trainer getTrainerById(int empId) {
        return trainerRepository.findById(empId)
                .orElseThrow(() -> new EntityNotFoundException("Trainer with empId " + empId + " not found"));
    }

    public List<Trainer> getTrainersBySubject(String subjectName) {
        return trainerRepository.findBySubjects_Name(subjectName);
    }

}
