# EventX

EventX is an event management and live attendance platform built using a microservices architecture. The platform is designed to manage events, registrations, notifications, and analytics through independent services.

## Features

- Event and organizer management
- Event registration
- Asynchronous communication using Apache Kafka
- Notification service
- Analytics service
- API Gateway for request routing
- Eureka Server for service discovery
- Separate MySQL databases for services
- Docker and Docker Compose support
- React frontend

## Architecture

EventX is divided into multiple independent services:

- **Organizer Service** – Handles organizer and event-related operations.
- **Registration Service** – Handles event registration-related operations.
- **Notification Service** – Handles notification-related processing.
- **Analytics Service** – Handles analytics-related processing.
- **API Gateway** – Acts as the entry point for client requests and routes requests to the appropriate backend services.
- **Eureka Server** – Provides service discovery between microservices.

## Technology Stack

### Backend
- Java
- Spring Boot
- Spring Cloud
- Spring Data JPA
- REST APIs
- Spring Cloud Gateway
- Eureka Service Discovery

### Messaging
- Apache Kafka

### Database
- MySQL

### Frontend
- React

### DevOps
- Docker
- Docker Compose

## Kafka

Apache Kafka is used for asynchronous communication between services.

Kafka is integrated with the Registration, Analytics, and Notification services to support event-driven communication.

The current Kafka configuration includes:

- Kafka 4.0.0
- Port: `9092`
- KRaft mode
- 3 partitions by default

## Database Architecture

Each major service has its own database.

```text
Organizer Service
       |
       v
  organizer_db

Registration Service
       |
       v
 registration_db

Analytics Service
       |
       v
  analytics_db
