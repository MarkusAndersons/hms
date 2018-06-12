package com.markusandersons.hms.models;

import javax.persistence.*;
import java.util.Collection;
import java.util.UUID;

@Entity
public class SharedItem {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String notes;
    private double price;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "sharedItem")
    private Collection<Ownership> ownership;

    public SharedItem() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Collection<Ownership> getOwnership() {
        return ownership;
    }

    public void setOwnership(Collection<Ownership> ownership) {
        this.ownership = ownership;
    }
}
