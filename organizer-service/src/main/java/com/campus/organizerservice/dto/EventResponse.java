package com.campus.organizerservice.dto;

import java.time.LocalDate;

public record EventResponse(
        Long eventId,
        String title,
        String description,
        Integer capacity,
        Integer seatsLeft,
        LocalDate eventDate,
        Double price
) {
}