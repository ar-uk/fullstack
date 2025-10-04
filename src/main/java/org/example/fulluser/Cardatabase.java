package org.example.fulluser;

import org.example.fulluser.models.AppUser;
import org.example.fulluser.models.Owner;
import org.example.fulluser.repositories.AppUserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.example.fulluser.models.Car;
import org.example.fulluser.repositories.CarRepository;
import org.example.fulluser.repositories.OwnerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Arrays;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity

public class Cardatabase implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(Cardatabase.class);

    private final CarRepository repository;
    private final OwnerRepository orepository;
    private final AppUserRepository urepository;
    private final PasswordEncoder passwordEncoder;

    public Cardatabase(CarRepository repository,
                       OwnerRepository orepository,
                       AppUserRepository urepository,
                       PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.orepository = orepository;
        this.urepository = urepository;
        this.passwordEncoder = passwordEncoder;
    }

    public static void main(String[] args) {
        SpringApplication.run(Cardatabase.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Owner owner1 = new Owner("John", "Johnson");
        Owner owner2 = new Owner("Mary", "Robinson");
        orepository.saveAll(Arrays.asList(owner1, owner2));

        repository.save(new Car("Ford", "Mustang", "Red", "ADF-1121", 2023, 59000, owner1));
        repository.save(new Car("Nissan", "Leaf", "White", "SSJ-3002", 2020, 29000, owner2));
        repository.save(new Car("Toyota", "Prius", "Silver", "KKO-0212", 2022, 39000, owner2));

        for (Car car : repository.findAll()) {
            logger.info(car.getBrand() + " " + car.getModel());
        }

        // encode passwords at runtime — bcrypt will give a new salted hash each run
        String userHash = passwordEncoder.encode("user");
        String adminHash = passwordEncoder.encode("admin");

        logger.info("Encoded user hash: " + userHash);
        logger.info("Encoded admin hash: " + adminHash);

        urepository.save(new AppUser("user", userHash, "USER"));
        urepository.save(new AppUser("admin", adminHash, "ADMIN"));
    }
}
