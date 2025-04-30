package com.hackmech.InternshipProject.service;

import com.hackmech.InternshipProject.entity.Subject;
import com.hackmech.InternshipProject.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public Subject addSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public List<Subject> getAllSubjects(){
        return subjectRepository.findAll();
    }

    public Subject getSubjectWithTrainers(int id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + id));
    }

}
