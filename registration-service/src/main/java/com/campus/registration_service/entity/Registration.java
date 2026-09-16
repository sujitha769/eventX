package com.campus.registration_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "registrations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_id", nullable = false)
    private Long eventId;

    @Column(nullable = false)
    private String name;

    @Column(name = "roll_number", nullable = false)
    private String rollNumber;

    @Column(nullable = false)
    private String branch;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(name = "ticket_id", unique = true)
    private String ticketId;

    @Column(nullable = false)
    private String status;

    @Column(name = "registered_at")
    private LocalDateTime registeredAt;
}
