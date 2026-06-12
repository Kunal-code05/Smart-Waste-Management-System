package com.wjp.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "pickup_requests")
public class PickupRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "citizen_id", nullable = false)
    private User citizen;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private User assignedStaff;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private LocalDate scheduledDate;

    @Column(nullable = false)
    private String status = "SCHEDULED"; // SCHEDULED, COMPLETED

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
