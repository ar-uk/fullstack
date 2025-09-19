package org.example.fulluser.repositories;
import org.example.fulluser.models.Car;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface CarRepository extends CrudRepository<Car, Integer> {
    List<Car> findByColor(String color);
    List<Car> findByModelYear(int modelYear);
    List<Car> findByBrandAndModel(String brand, String model);
    List<Car> findByBrandOrColor(String brand, String color);
    List<Car> findByBrandOrderByModelYearAsc(String brand);
    @Query("select c from Car c where c.brand = ?1")
    List<Car> findByBrand(String brand);

}
