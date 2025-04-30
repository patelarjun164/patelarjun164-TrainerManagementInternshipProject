package com.hackmech.InternshipProject.controller;

import com.hackmech.InternshipProject.entity.Trainer;
import com.hackmech.InternshipProject.service.TrainerService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/trainer")
public class TrainerController {

    private final TrainerService trainerService;

    @Autowired
    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    @PostMapping
    public ResponseEntity<?> addTrainer(@RequestBody Trainer trainer) {
        try {
            Trainer savedTrainer = trainerService.addTrainer(trainer);
            return new ResponseEntity<>(savedTrainer, HttpStatus.CREATED);
        } catch (Exception e) {
            // Handle generic errors
            return new ResponseEntity<>("Error while adding trainer: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllTrainers() {
        try {
            List<Trainer> trainers = trainerService.getAllTrainers();
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            // Handle errors in fetching all trainers
            return new ResponseEntity<>("Error while fetching trainers: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTrainer(@RequestBody Map<String, Object> request) {
        try {
            int empId = Integer.parseInt(request.get("empId").toString());
            trainerService.deleteTrainerById(empId);
            return ResponseEntity.ok("Trainer with empId " + empId + " deleted successfully.");
        } catch (EntityNotFoundException e) {
            // Handle case where trainer is not found
            return new ResponseEntity<>("Trainer with the provided empId not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Handle generic errors
            return new ResponseEntity<>("Error while deleting trainer: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTrainerById(@PathVariable int id) {
        try {
            Trainer trainer = trainerService.getTrainerById(id);
            return ResponseEntity.ok(trainer);
        } catch (EntityNotFoundException e) {
            // Handle case where trainer is not found
            return new ResponseEntity<>("Trainer with empId " + id + " not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Handle generic errors
            return new ResponseEntity<>("Error while fetching trainer: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{subject}/topic")
    public ResponseEntity<?> getTrainersBySubject(@PathVariable String subject) {
        try {
            List<Trainer> trainers = trainerService.getTrainersBySubject(subject);
            if (trainers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No trainers found for subject: " + subject);
            }
            return ResponseEntity.ok(trainers);
        } catch (Exception e) {
            // Handle errors in fetching trainers by subject
            return new ResponseEntity<>("Error while fetching trainers by subject: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
