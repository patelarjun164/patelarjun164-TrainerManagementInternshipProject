package com.hackmech.InternshipProject.repository;

import com.hackmech.InternshipProject.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Integer> {
    // Additional custom queries can go here if needed

    public List<Trainer> findBySubjects_Name(String subjectName);

}
