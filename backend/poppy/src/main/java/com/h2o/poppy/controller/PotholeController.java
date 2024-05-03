package com.h2o.poppy.controller;

import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.repository.PotholeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/potholes")
public class PotholeController {

    private final PotholeRepository potholeRepository;

    public PotholeController(PotholeRepository potholeRepository) {
        this.potholeRepository = potholeRepository;
    }

    @GetMapping
    public Iterable<Pothole> getAllPotholes() {
        return potholeRepository.findAll();
    }

    @GetMapping("/{potholePk}")
    public ResponseEntity<Pothole> getPotholeById(@PathVariable Long potholePk) {
        return potholeRepository.findById(potholePk)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pothole createPothole(@RequestBody Pothole pothole) {
        return potholeRepository.save(pothole);
    }

    @DeleteMapping("/{potholePk}")
    public ResponseEntity<?> deletePothole(@PathVariable Long potholePk) {
        return potholeRepository.findById(potholePk)
                .map(pothole -> {
                    potholeRepository.delete(pothole);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
