package com.campus.notification_service.kafka;

import com.campus.notification_service.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SeatBookedListener {

    private final NotificationService notificationService;

    @KafkaListener(
            topics = "seat-booked",
            groupId = "notification-group"
    )
    public void consumeSeatBookedEvent(
            SeatBookedEvent event
    ) {

        System.out.println(
                "Notification Service received: " + event
        );

        notificationService.processBooking(event);
    }
}