package com.markusandersons.hms.models;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class Ownership {
    @Id
    @GeneratedValue
    private UUID id;
    @ManyToOne
    private SharedItem sharedItem;
    @ManyToOne
    private User user;
    private double percentage;

    public Ownership() {}

    public Ownership(SharedItem sharedItem, User user, double percentage) {
        this.sharedItem = sharedItem;
        this.user = user;
        this.percentage = percentage;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public SharedItem getSharedItem() {
        return sharedItem;
    }

    public void setSharedItem(SharedItem sharedItem) {
        this.sharedItem = sharedItem;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(float percentage) {
        this.percentage = percentage;
    }
}
