package com.campus.analytics_service.controller;

import com.campus.analytics_service.entity.BookingAnalytics;
import com.campus.analytics_service.repository.BookingAnalyticsRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final BookingAnalyticsRepository repository;

    // Get all booking analytics
    @GetMapping("/bookings")
    public ResponseEntity<List<BookingAnalytics>> getAllBookings() {

        return ResponseEntity.ok(
                repository.findAll()
        );
    }

    // Get bookings for a specific event
    @GetMapping("/events/{eventId}")
    public ResponseEntity<List<BookingAnalytics>> getEventBookings(
            @PathVariable Long eventId
    ) {

        return ResponseEntity.ok(
                repository.findByEventId(eventId)
        );
    }

    // Get total bookings for a specific event
    @GetMapping("/events/{eventId}/count")
    public ResponseEntity<Long> getEventBookingCount(
            @PathVariable Long eventId
    ) {

        return ResponseEntity.ok(
                repository.countByEventId(eventId)
        );
    }
}