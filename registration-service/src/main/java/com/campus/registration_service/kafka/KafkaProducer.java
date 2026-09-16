package com.campus.registration_service.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaProducer {

    private final KafkaTemplate<String, SeatBookedEvent> kafkaTemplate;

    private static final String TOPIC = "seat-booked";

    public void publishSeatBookedEvent(
            SeatBookedEvent event
    ) {
        kafkaTemplate.send(
                TOPIC,
                event.getEventId().toString(),
                event
        );
    }
}