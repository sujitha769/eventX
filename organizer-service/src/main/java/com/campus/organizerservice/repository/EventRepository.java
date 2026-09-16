package com.campus.organizerservice.repository;

import com.campus.organizerservice.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByOrganizerId(Long organizerId);

    Optional<Event> findByIdAndOrganizerId(
            Long id,
            Long organizerId
    );

    @Modifying
    @Query("""
            UPDATE Event e
            SET e.seatsLeft = e.seatsLeft - 1
            WHERE e.id = :eventId
            AND e.seatsLeft > 0
            """)
    int reserveSeat(
            @Param("eventId") Long eventId
    );
}