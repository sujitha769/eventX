package com.campus.registration_service.repository;

import com.campus.registration_service.entity.Registration;
import com.campus.registration_service.entity.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository
        extends JpaRepository<Registration, Long> {

    List<Registration> findByEventId(Long eventId);

    List<Registration> findByEventIdAndStatus(
            Long eventId,
            RegistrationStatus status
    );

    Optional<Registration> findByTicketId(String ticketId);

    boolean existsByEventIdAndEmail(
            Long eventId,
            String email
    );

    long countByEventIdAndStatus(
            Long eventId,
            RegistrationStatus status
    );
}