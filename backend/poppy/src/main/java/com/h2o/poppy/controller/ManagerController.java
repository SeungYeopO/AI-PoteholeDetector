package com.h2o.poppy.controller;

import com.h2o.poppy.entity.Manager;
import com.h2o.poppy.repository.ManagerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/managers")
public class ManagerController {

    private final ManagerRepository managerRepository;

    public ManagerController(ManagerRepository managerRepository){
        this.managerRepository = managerRepository;
        managerRepository.saveAll(List.of(
                new Manager("samsung", "1", "황유경", "01012345678"),
                new Manager("dlek567", "2", "유명렬", "01090123456")
        ));
    }

    @GetMapping
    public Iterable<Manager> getManagers() {
        return managerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manager> getManagerById(@PathVariable Long id){
        return managerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Manager postManager(@RequestBody Manager manager){
        return managerRepository.save(manager);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteManager(@PathVariable Long id) {
        return managerRepository.findById(id)
                .map(manager -> {
                    managerRepository.delete(manager);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
