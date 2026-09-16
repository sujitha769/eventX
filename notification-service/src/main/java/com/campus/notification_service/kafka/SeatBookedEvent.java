package com.campus.notification_service.kafka;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatBookedEvent {

    private Long registrationId;
    private Long eventId;
    private String name;
    private String email;
    private String ticketId;
}