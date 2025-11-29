package org.example.fulluser.controllers;

import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.fulluser.models.Car;
import org.example.fulluser.repositories.CarRepository;

@RestController
public class CarController {
    private final CarRepository repository;
    public CarController(CarRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Car createCar(@RequestBody Car car) {
        return repository.save(car);
    }

    @GetMapping("/cars")
    public Iterable<Car> getCars() {
        return repository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable int id, @RequestBody Car updatedCar) {
        return repository.findById(id)
                .map(car -> {
                    car.setBrand(updatedCar.getBrand());
                    car.setModel(updatedCar.getModel());
                    car.setColor(updatedCar.getColor());
                    car.setRegistrationNumber(updatedCar.getRegistrationNumber());
                    car.setModelYear(updatedCar.getModelYear());
                    car.setPrice(updatedCar.getPrice());
                    car.setOwner(updatedCar.getOwner());
                    return ResponseEntity.ok(repository.save(car));
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable int id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }



}