package com.campus.registration_service.controller;



import com.campus.registration_service.dto.RegistrationRequest;
import com.campus.registration_service.dto.RegistrationResponse;
import com.campus.registration_service.service.RegistrationService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(
            RegistrationService registrationService
    ) {
        this.registrationService = registrationService;
    }


    @PostMapping
    public ResponseEntity<RegistrationResponse> register(
            @Valid @RequestBody RegistrationRequest request
    ) {

        RegistrationResponse response =
                registrationService.createRegistration(request);

        return ResponseEntity.ok(response);
    }


    @GetMapping("/{id}")
    public ResponseEntity<RegistrationResponse> getRegistration(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                registrationService.getRegistration(id)
        );
    }


    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<RegistrationResponse>>
    getRegistrationsByEvent(
            @PathVariable Long eventId
    ) {

        return ResponseEntity.ok(
                registrationService
                        .getRegistrationsByEvent(eventId)
        );
    }


    @PutMapping("/{id}/confirm")
    public ResponseEntity<RegistrationResponse>
    confirmRegistration(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                registrationService
                        .confirmRegistration(id)
        );
    }


    @PutMapping("/{id}/cancel")
    public ResponseEntity<RegistrationResponse>
    cancelRegistration(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                registrationService
                        .cancelRegistration(id)
        );
    }


    @GetMapping("/event/{eventId}/count")
    public ResponseEntity<Long> getConfirmedCount(
            @PathVariable Long eventId
    ) {

        return ResponseEntity.ok(
                registrationService
                        .getConfirmedRegistrationCount(eventId)
        );
    }
}