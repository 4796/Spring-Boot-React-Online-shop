package com.example.Shop.db;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.Shop.model.Worker;


@Repository
public interface WorkerRepo extends JpaRepository<Worker, String>{

}