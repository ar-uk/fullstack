package org.example.fulluser;

import org.example.fulluser.models.Owner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.example.fulluser.models.Car;
import org.example.fulluser.repositories.CarRepository;
import org.example.fulluser.repositories.OwnerRepository;
import java.util.Arrays;

@SpringBootApplication
public class Cardatabase implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(Cardatabase.class);

    private final CarRepository repository;

    public Cardatabase(CarRepository repository, OwnerRepository orepository) {
        this.repository = repository;
        this.orepository = orepository;
    }

    public final OwnerRepository orepository;

    public static void main(String[] args) {
        SpringApplication.run(Cardatabase.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        // Add owner objects and save these to db
        Owner owner1 = new Owner("John" , "Johnson");
        Owner owner2 = new Owner("Mary" , "Robinson");
        orepository.saveAll(Arrays.asList(owner1, owner2));
        repository.save(new Car("Ford", "Mustang", "Red",
                "ADF-1121", 2023, 59000, owner1));
        repository.save(new Car("Nissan", "Leaf", "White",
                "SSJ-3002", 2020, 29000, owner2));
        repository.save(new Car("Toyota", "Prius", "Silver",
                "KKO-0212", 2022, 39000, owner2));
        // Fetch all cars and log to console
        for (Car car : repository.findAll())
        {
        }
    }

    }
