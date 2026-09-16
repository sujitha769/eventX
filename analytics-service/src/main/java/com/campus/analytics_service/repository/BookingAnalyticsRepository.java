package com.campus.analytics_service.repository;

import com.campus.analytics_service.entity.BookingAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingAnalyticsRepository
        extends JpaRepository<BookingAnalytics, Long> {

    List<BookingAnalytics> findByEventId(Long eventId);

    long countByEventId(Long eventId);
}