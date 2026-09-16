package com.campus.notification_service.service;

import com.campus.notification_service.kafka.SeatBookedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendTicketEmail(
            SeatBookedEvent event,
            byte[] pdf
    ) {

        try {

            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            true
                    );

            helper.setTo(event.getEmail());

            helper.setSubject(
                    "EventX - Your Event Ticket"
            );

            helper.setText(
                    "Hello " + event.getName() + ",\n\n"
                            + "Your event registration has been confirmed.\n\n"
                            + "Ticket ID: "
                            + event.getTicketId()
                            + "\n\n"
                            + "Your ticket is attached to this email.\n\n"
                            + "Thank you for registering with EventX!"
            );

            helper.addAttachment(
                    "EventX-Ticket-"
                            + event.getTicketId()
                            + ".pdf",
                    new ByteArrayResource(pdf)
            );

            mailSender.send(message);

            System.out.println(
                    "Ticket email sent successfully to "
                            + event.getEmail()
            );

        } catch (Exception exception) {

            throw new RuntimeException(
                    "Failed to send ticket email",
                    exception
            );
        }
    }
}