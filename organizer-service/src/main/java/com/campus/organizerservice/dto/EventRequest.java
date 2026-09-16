package com.campus.organizerservice.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record EventRequest(

        @NotBlank
        String title,

        String description,

        @NotNull
        @Min(1)
        Integer capacity,

        @NotNull
        @Future
        LocalDate eventDate,

        @NotNull
        @PositiveOrZero
        Double price
) {
}