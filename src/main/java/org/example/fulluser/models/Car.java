package org.example.fulluser.models;
import jakarta.persistence.*;

@Entity
public class Car {

    public int getId() {
        return id;
    }

    public String getBrand() {
        return brand;
    }

    public String getModel() {
        return model;
    }

    public String getColor() {
        return color;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public int getModelYear() {
        return modelYear;
    }

    public int getPrice() {
        return price;
    }

    public Owner getOwner() {
        return owner;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public void setModelYear(int modelYear) {
        this.modelYear = modelYear;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    private String brand, model, color, registrationNumber;

    private int modelYear, price;

    public Car(String brand, String model, String color,
               String registrationNumber, int modelYear, int price, Owner owner) {
        super();
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.registrationNumber = registrationNumber;
        this.modelYear = modelYear;
        this.price = price;
        this.owner = owner;
    }
    public Car() {}

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="owner")
    private Owner owner;

}
