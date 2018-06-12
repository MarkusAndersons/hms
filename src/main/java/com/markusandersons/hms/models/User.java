package com.markusandersons.hms.models;

import javax.persistence.*;
import java.util.Collection;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private UUID id;
    private String firstName;
    private String surname;
    private String phone;
    private String email;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Collection<Ownership> ownership;

    public User() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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

    public Collection<Ownership> getOwnership() {
        return ownership;
    }

    public void setOwnership(Collection<Ownership> ownership) {
        this.ownership = ownership;
    }
}
