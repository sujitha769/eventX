package com.campus.registration_service.service;

import com.campus.registration_service.client.OrganizerClient;
import com.campus.registration_service.dto.RegistrationRequest;
import com.campus.registration_service.dto.RegistrationResponse;
import com.campus.registration_service.entity.Registration;
import com.campus.registration_service.entity.RegistrationStatus;
import com.campus.registration_service.kafka.KafkaProducer;
import com.campus.registration_service.kafka.SeatBookedEvent;
import com.campus.registration_service.repository.RegistrationRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final OrganizerClient organizerClient;
    private final KafkaProducer kafkaProducer;

    public RegistrationService(
            RegistrationRepository registrationRepository,
            OrganizerClient organizerClient,
            KafkaProducer kafkaProducer
    ) {
        this.registrationRepository = registrationRepository;
        this.organizerClient = organizerClient;
        this.kafkaProducer = kafkaProducer;
    }

    // =========================
    // CREATE REGISTRATION
    // =========================

    @Transactional
    public RegistrationResponse createRegistration(
            RegistrationRequest request
    ) {

        // ---------------------------------
        // 1. Check duplicate registration
        // ---------------------------------

        boolean alreadyRegistered =
                registrationRepository.existsByEventIdAndEmail(
                        request.getEventId(),
                        request.getEmail()
                );

        if (alreadyRegistered) {
            throw new RuntimeException(
                    "You are already registered for this event"
            );
        }

        // ---------------------------------
        // 2. Reserve one seat
        // ---------------------------------

        try {

            organizerClient.reserveSeat(
                    request.getEventId()
            );

        } catch (Exception exception) {

            exception.printStackTrace();

            throw new RuntimeException(
                    "Unable to reserve seat for this event: "
                            + exception.getMessage()
            );
        }

        // ---------------------------------
        // 3. Create registration
        // ---------------------------------

        Registration registration =
                Registration.builder()
                        .eventId(request.getEventId())
                        .name(request.getName())
                        .rollNumber(request.getRollNumber())
                        .branch(request.getBranch())
                        .email(request.getEmail())
                        .phone(request.getPhone())
                        .status(
                                RegistrationStatus.PENDING_PAYMENT.name()
                        )
                        .registeredAt(LocalDateTime.now())
                        .build();

        // ---------------------------------
        // 4. Save registration
        // ---------------------------------

        Registration saved =
                registrationRepository.save(registration);

        return convertToResponse(saved);
    }

    // =========================
    // GET REGISTRATION
    // =========================

    public RegistrationResponse getRegistration(
            Long id
    ) {

        Registration registration =
                registrationRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Registration not found"
                                )
                        );

        return convertToResponse(registration);
    }

    // =========================
    // GET EVENT REGISTRATIONS
    // =========================

    public List<RegistrationResponse> getRegistrationsByEvent(
            Long eventId
    ) {

        return registrationRepository
                .findByEventId(eventId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =========================
    // CONFIRM REGISTRATION
    // =========================

    @Transactional
    public RegistrationResponse confirmRegistration(
            Long id
    ) {

        Registration registration =
                registrationRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Registration not found"
                                )
                        );

        registration.setStatus(
                RegistrationStatus.CONFIRMED.name()
        );

        registration.setTicketId(
                generateTicketId()
        );

        Registration updated =
                registrationRepository.save(registration);

        // ---------------------------------
        // Publish Kafka event
        // ---------------------------------

        SeatBookedEvent event =
                new SeatBookedEvent(
                        updated.getId(),
                        updated.getEventId(),
                        updated.getName(),
                        updated.getEmail(),
                        updated.getTicketId()
                );

        kafkaProducer.publishSeatBookedEvent(event);

        return convertToResponse(updated);
    }

    // =========================
    // CANCEL REGISTRATION
    // =========================

    @Transactional
    public RegistrationResponse cancelRegistration(
            Long id
    ) {

        Registration registration =
                registrationRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Registration not found"
                                )
                        );

        registration.setStatus(
                RegistrationStatus.CANCELLED.name()
        );

        Registration updated =
                registrationRepository.save(registration);

        return convertToResponse(updated);
    }

    // =========================
    // COUNT CONFIRMED
    // =========================

    public long getConfirmedRegistrationCount(
            Long eventId
    ) {

        return registrationRepository.countByEventIdAndStatus(
                eventId,
                RegistrationStatus.CONFIRMED
        );
    }

    // =========================
    // GENERATE TICKET ID
    // =========================

    private String generateTicketId() {

        return "EVX-" +
                UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase();
    }

    // =========================
    // ENTITY → RESPONSE
    // =========================

    private RegistrationResponse convertToResponse(
            Registration registration
    ) {

        return RegistrationResponse.builder()
                .id(registration.getId())
                .eventId(registration.getEventId())
                .name(registration.getName())
                .rollNumber(registration.getRollNumber())
                .branch(registration.getBranch())
                .email(registration.getEmail())
                .phone(registration.getPhone())
                .ticketId(registration.getTicketId())
                .status(registration.getStatus())
                .registeredAt(registration.getRegisteredAt())
                .build();
    }
}