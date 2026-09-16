package com.campus.organizerservice.service;

import com.campus.organizerservice.dto.EventRequest;
import com.campus.organizerservice.dto.EventResponse;
import com.campus.organizerservice.entity.Event;
import com.campus.organizerservice.repository.EventRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;


    // =========================
    // CREATE EVENT
    // =========================

    public EventResponse createEvent(
            EventRequest request,
            Long organizerId
    ) {

        Event event = Event.builder()
                .organizerId(organizerId)
                .title(request.title())
                .description(request.description())
                .capacity(request.capacity())
                .seatsLeft(request.capacity())
                .eventDate(request.eventDate())
                .price(request.price())
                .createdAt(LocalDateTime.now())
                .build();

        event = eventRepository.save(event);

        return toResponse(event);
    }


    // =========================
    // GET SINGLE EVENT
    // =========================

    public EventResponse getEvent(
            Long eventId,
            Long organizerId
    ) {

        Event event = eventRepository
                .findByIdAndOrganizerId(eventId, organizerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Event not found or access denied"
                        ));

        return toResponse(event);
    }


    // =========================
    // GET ORGANIZER EVENTS
    // =========================

    public List<EventResponse> getMyEvents(Long organizerId) {

        return eventRepository
                .findByOrganizerId(organizerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<EventResponse> getPublicEvents() {

        return eventRepository
                .findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =========================
    // UPDATE EVENT
    // =========================

    public EventResponse updateEvent(
            Long eventId,
            EventRequest request,
            Long organizerId
    ) {

        Event event = eventRepository
                .findByIdAndOrganizerId(eventId, organizerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Event not found or access denied"
                        ));

        event.setTitle(request.title());
        event.setDescription(request.description());
        event.setCapacity(request.capacity());
        event.setEventDate(request.eventDate());
        event.setPrice(request.price());

        event = eventRepository.save(event);

        return toResponse(event);
    }


    // =========================
    // DELETE EVENT
    // =========================

    public void deleteEvent(
            Long eventId,
            Long organizerId
    ) {

        Event event = eventRepository
                .findByIdAndOrganizerId(eventId, organizerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Event not found or access denied"
                        ));

        eventRepository.delete(event);
    }


    // =========================
    // RESERVE ONE SEAT
    // =========================

    @Transactional
    public boolean reserveSeat(Long eventId) {

        int updatedRows =
                eventRepository.reserveSeat(eventId);

        return updatedRows == 1;
    }


    // =========================
    // CONVERT ENTITY TO RESPONSE
    // =========================

    private EventResponse toResponse(Event event) {

        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getCapacity(),
                event.getSeatsLeft(),
                event.getEventDate(),
                event.getPrice()
        );
    }
}