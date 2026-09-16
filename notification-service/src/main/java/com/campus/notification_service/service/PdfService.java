package com.campus.notification_service.service;

import com.campus.notification_service.kafka.SeatBookedEvent;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public byte[] generateTicketPdf(
            SeatBookedEvent event
    ) {

        try {

            ByteArrayOutputStream outputStream =
                    new ByteArrayOutputStream();

            Document document = new Document();

            PdfWriter.getInstance(
                    document,
                    outputStream
            );

            document.open();

            document.add(
                    new Paragraph("EVENTX - EVENT TICKET")
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "Ticket ID: "
                                    + event.getTicketId()
                    )
            );

            document.add(
                    new Paragraph(
                            "Registration ID: "
                                    + event.getRegistrationId()
                    )
            );

            document.add(
                    new Paragraph(
                            "Event ID: "
                                    + event.getEventId()
                    )
            );

            document.add(
                    new Paragraph(
                            "Name: "
                                    + event.getName()
                    )
            );

            document.add(
                    new Paragraph(
                            "Email: "
                                    + event.getEmail()
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "Registration Status: CONFIRMED"
                    )
            );

            document.add(
                    new Paragraph(
                            "Thank you for registering with EventX!"
                    )
            );

            document.close();

            return outputStream.toByteArray();

        } catch (Exception exception) {

            throw new RuntimeException(
                    "Failed to generate ticket PDF",
                    exception
            );
        }
    }
}