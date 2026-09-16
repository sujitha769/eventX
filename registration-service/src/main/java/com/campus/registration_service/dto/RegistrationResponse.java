package com.campus.registration_service.dto;




import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationResponse {

    private Long id;

    private Long eventId;

    private String name;

    private String rollNumber;

    private String branch;

    private String email;

    private String phone;

    private String ticketId;

    private String status;

    private LocalDateTime registeredAt;
}