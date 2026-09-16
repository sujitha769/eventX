package com.campus.analytics_service.service;

import com.campus.analytics_service.entity.BookingAnalytics;
import com.campus.analytics_service.kafka.SeatBookedEvent;
import com.campus.analytics_service.repository.BookingAnalyticsRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final BookingAnalyticsRepository repository;

    public void processSeatBookedEvent(
            SeatBookedEvent event
    ) {

        BookingAnalytics analytics =
                BookingAnalytics.builder()
                        .registrationId(event.getRegistrationId())
                        .eventId(event.getEventId())
                        .name(event.getName())
                        .email(event.getEmail())
                        .ticketId(event.getTicketId())
                        .bookedAt(LocalDateTime.now())
                        .build();

        repository.save(analytics);
    }
}