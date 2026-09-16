package com.campus.organizerservice.controller;

import com.campus.organizerservice.dto.EventRequest;
import com.campus.organizerservice.dto.EventResponse;
import com.campus.organizerservice.service.EventService;
import com.campus.organizerservice.service.QrService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final QrService qrService;


    // =========================
    // CREATE EVENT
    // =========================

    @PostMapping
    public ResponseEntity<EventResponse> createEvent(
            @Valid @RequestBody EventRequest request,
            Authentication authentication
    ) {

        Long organizerId =
                Long.valueOf(authentication.getName());

        return ResponseEntity.ok(
                eventService.createEvent(
                        request,
                        organizerId
                )
        );
    }


    // =========================
    // GET SINGLE EVENT
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<EventResponse> getEvent(
            @PathVariable Long id,
            Authentication authentication
    ) {

        Long organizerId =
                Long.valueOf(authentication.getName());

        return ResponseEntity.ok(
                eventService.getEvent(
                        id,
                        organizerId
                )
        );
    }


    // =========================
    // RESERVE ONE SEAT
    // =========================

    @PostMapping("/{id}/reserve-seat")
    public ResponseEntity<String> reserveSeat(
            @PathVariable Long id
    ) {

        boolean reserved =
                eventService.reserveSeat(id);

        if (!reserved) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "No seats available for this event"
                    );
        }

        return ResponseEntity.ok(
                "Seat reserved successfully"
        );
    }


    // =========================
    // GET ORGANIZER EVENTS
    // =========================

    @GetMapping
    public ResponseEntity<List<EventResponse>> getMyEvents(
            Authentication authentication
    ) {

        Long organizerId =
                Long.valueOf(authentication.getName());

        return ResponseEntity.ok(
                eventService.getMyEvents(organizerId)
        );
    }

    @GetMapping("/public")
    public ResponseEntity<List<EventResponse>> getPublicEvents() {

        return ResponseEntity.ok(
                eventService.getPublicEvents()
        );
    }


    // =========================
    // GENERATE EVENT QR
    // =========================

    @GetMapping(
            value = "/{id}/qr",
            produces = MediaType.IMAGE_PNG_VALUE
    )
    public ResponseEntity<byte[]> generateQr(
            @PathVariable Long id,
            Authentication authentication
    ) {

        Long organizerId =
                Long.valueOf(authentication.getName());

        // Verify that this event belongs to the organizer
        eventService.getEvent(
                id,
                organizerId
        );

        byte[] qrCode =
                qrService.generateQrCode(id);

        return ResponseEntity.ok(qrCode);
    }


    // =========================
    // UPDATE EVENT
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventRequest request,
            Authentication authentication
    ) {

        Long organizerId =
                Long.valueOf(authentication.getName());

        return ResponseEntity.ok(
                eventService.updateEvent(
                        id,
                        request,
                        organizerId
                )
        );
    }


    // =========================
    // DELETE EVENT
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(
            @PathVariable Long id,
            Authentication authentication
    ) {

        Long organizerId =
                Long.valueOf(authentication.getName());

        eventService.deleteEvent(
                id,
                organizerId
        );

        return ResponseEntity.ok(
                java.util.Map.of(
                        "message",
                        "Event deleted successfully"
                )
        );
    }
}