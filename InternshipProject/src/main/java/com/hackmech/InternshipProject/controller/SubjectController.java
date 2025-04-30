package com.hackmech.InternshipProject.controller;

import com.hackmech.InternshipProject.entity.Subject;
import com.hackmech.InternshipProject.service.SubjectService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/subject")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @PostMapping
    public ResponseEntity<?> addSubject(@RequestBody Subject subject) {
        try {
            Subject savedSubject = subjectService.addSubject(subject);
            return ResponseEntity.ok(savedSubject);
        } catch (Exception e) {
            return new ResponseEntity<>("Error while adding subject: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllSubjects() {
        try {
            return ResponseEntity.ok(subjectService.getAllSubjects());
        } catch (Exception e) {
            return new ResponseEntity<>("Error while fetching subjects: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSubjectWithTrainers(@PathVariable int id) {
        try {
            Subject subject = subjectService.getSubjectWithTrainers(id);
            return ResponseEntity.ok(subject);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>("Subject with id " + id + " not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error while fetching subject: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
