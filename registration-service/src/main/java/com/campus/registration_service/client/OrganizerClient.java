package com.campus.registration_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(
        name = "organizer-service",
        url = "http://eventx-organizer:8081"
)
public interface OrganizerClient {

    @PostMapping("/api/events/{id}/reserve-seat")
    String reserveSeat(
            @PathVariable("id") Long eventId
    );
}