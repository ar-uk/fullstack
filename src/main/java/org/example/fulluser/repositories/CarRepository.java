package org.example.fulluser.repositories;
import org.example.fulluser.models.Car;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

//@RepositoryRestResource
public interface CarRepository extends CrudRepository<Car, Integer> {
    List<Car> findByColor(String color);
    List<Car> findByModelYear(int modelYear);
    List<Car> findByBrand(String brand);
    List<Car> findByBrandOrderByModelYearAsc(String brand);
}
