package com.markusandersons.hms.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    private String firstName;
    private String surname;
    private String phone;
    private String email;

    public Person() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.firstName + " " + this.surname;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getSurname() {
        return this.surname;
    }

    public void setFirstName(String name) {
        this.firstName = name;
    }

    public void setSurname(String name) {
        this.surname = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
