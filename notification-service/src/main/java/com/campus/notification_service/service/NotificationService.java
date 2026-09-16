package com.campus.notification_service.service;

import com.campus.notification_service.kafka.SeatBookedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final PdfService pdfService;
    private final EmailService emailService;

    public void processBooking(SeatBookedEvent event) {

        System.out.println(
                "Processing booking notification..."
        );

        System.out.println(
                "Registration ID: "
                        + event.getRegistrationId()
        );

        System.out.println(
                "Name: "
                        + event.getName()
        );

        System.out.println(
                "Email: "
                        + event.getEmail()
        );

        System.out.println(
                "Ticket ID: "
                        + event.getTicketId()
        );

        // Generate ticket PDF
        byte[] pdf =
                pdfService.generateTicketPdf(event);

        System.out.println(
                "Ticket PDF generated successfully. Size: "
                        + pdf.length
                        + " bytes"
        );

        // Send ticket through email
        emailService.sendTicketEmail(
                event,
                pdf
        );

        System.out.println(
                "Booking notification completed successfully."
        );
    }
}