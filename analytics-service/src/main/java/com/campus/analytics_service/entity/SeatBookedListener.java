package com.campus.analytics_service.kafka;

import com.campus.analytics_service.service.AnalyticsService;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SeatBookedListener {

    private final AnalyticsService analyticsService;

    @KafkaListener(
            topics = "seat-booked",
            groupId = "analytics-group"
    )
    public void consumeSeatBookedEvent(
            SeatBookedEvent event
    ) {

        System.out.println(
                "Received seat-booked event: "
                        + event
        );

        analyticsService.processSeatBookedEvent(event);
    }
}