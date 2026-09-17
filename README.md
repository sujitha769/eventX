
# EventX

EventX is an event registration and booking platform built using a **microservices architecture**. It is designed for college events, workshops, conferences, meetups, hackathons, and other types of events.

The platform provides organizer event management, QR-based attendee registration, seat reservation, simulated payment confirmation, Kafka-based asynchronous processing, PDF ticket generation, and email notifications.

> **Project Status:** EventX is currently developed and tested locally using Docker Compose. The frontend and backend are **not deployed to any cloud platform**.

---

## Features

### Organizer

- Organizer registration and login
- JWT-based authentication
- Create events
- View organizer's events
- Update events
- Delete events
- View available seats
- Generate QR code for events

### Attendee

- Scan an event QR code
- Open the event registration page
- Register without creating an EventX account
- Submit attendee details
- Complete simulated payment confirmation
- Receive registration confirmation
- Receive a PDF ticket through email

### Backend

- Microservices architecture
- API Gateway for request routing
- Eureka service discovery
- Apache Kafka asynchronous communication
- Database-per-service architecture
- Concurrent seat reservation
- JWT authentication
- PDF ticket generation
- Email notification

---

## Architecture

```text
                         React Frontend
                               |
                               v
                        API Gateway :8080
                               |
              +----------------+----------------+
              |                                 |
              v                                 v
      Organizer Service                 Registration Service
           :8081                              :8082
              |                                 |
              v                                 v
       organizer_db                     registration_db
       users, events                 registrations, payments
                                                |
                                                v
                                              Kafka
                                         seat-booked topic
                                            /          \
                                           /            \
                                          v              v
                               Analytics Service    Notification Service
                                     :8083                 :8084
                                       |                     |
                                       v                     v
                                 analytics_db          PDF + Email
```

---

## Microservices

| Service | Port | Responsibility |
|---|---:|---|
| Eureka Server | 8761 | Service discovery |
| API Gateway | 8080 | Single entry point and request routing |
| Organizer Service | 8081 | Organizer authentication and event management |
| Registration Service | 8082 | Attendee registration, seat reservation and payment confirmation |
| Analytics Service | 8083 | Booking analytics using Kafka events |
| Notification Service | 8084 | PDF ticket generation and email notifications |

---

## Technology Stack

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- Spring Cloud Gateway
- Eureka
- OpenFeign
- Spring Kafka
- Maven

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS

### Databases

- MySQL 8.4
- Database-per-service architecture

### Messaging

- Apache Kafka 4.0
- Kafka KRaft mode
- Topic: `seat-booked`

### Infrastructure

- Docker
- Docker Compose

### Other

- ZXing for QR code generation
- OpenPDF for PDF ticket generation
- Gmail SMTP for email delivery
- Postman for API testing

---

## Service Communication

EventX uses both **synchronous** and **asynchronous** communication.

### Synchronous Communication

The Registration Service communicates with the Organizer Service using **OpenFeign** to reserve an event seat.

```text
Registration Service
        |
        | OpenFeign
        v
Organizer Service
        |
        v
Reserve Seat
```

Seat reservation uses a conditional database update:

```sql
UPDATE events
SET seats_left = seats_left - 1
WHERE id = ?
AND seats_left > 0;
```

If one row is affected, the seat is reserved.

If zero rows are affected, no seat is available.

### Asynchronous Communication

After a registration is confirmed, the Registration Service publishes a `seat-booked` event to Kafka.

```text
Registration Service
        |
        | publish
        v
   seat-booked
       Kafka
      /     \
     /       \
    v         v
Analytics   Notification
 Service      Service
```

Analytics Service and Notification Service use separate consumer groups, allowing both services to independently process the same booking event.

---

## Registration Flow

```text
Organizer creates event
          |
          v
      Event QR Code
          |
          v
     Attendee scans QR
          |
          v
    Registration Form
          |
          v
    Seat Reservation
          |
          v
  Pending Payment
          |
          v
 Simulated Payment Confirmation
          |
          v
     Registration Confirmed
          |
          v
     Kafka: seat-booked
        /          \
       v            v
   Analytics     Notification
                    |
                    v
                PDF Ticket
                    |
                    v
                  Email
```

---

## Authentication

Organizer authentication uses JWT.

```text
Organizer
    |
    v
Register / Login
    |
    v
JWT Token
    |
    v
Protected Organizer APIs
```

The JWT contains the organizer's user ID, which is used to identify the authenticated organizer and enforce event ownership.

---

## QR Registration

Each organizer event can generate a QR code.

The QR code points to the attendee registration route:

```text
/register/{eventId}
```

During local development, the generated URL uses:

```text
http://localhost:5173/register/{eventId}
```

Therefore, the QR flow is currently intended for local testing on the same machine.

To scan the QR code from another device on the same network, the QR URL would need to use a network-reachable frontend address instead of `localhost`.

---

## Database Design

EventX follows a **database-per-service** architecture.

```text
Organizer Service
    |
    +-- organizer_db
         +-- users
         +-- events


Registration Service
    |
    +-- registration_db
         +-- registrations
         +-- payments


Analytics Service
    |
    +-- analytics_db
```

Services do not directly share database tables or cross-service foreign keys.

---

## API Gateway Routes

The frontend communicates with the backend through the API Gateway:

```text
http://localhost:8080
```

Routes include:

```text
/api/auth/**           -> Organizer Service
/api/events/**         -> Organizer Service
/api/registrations/**  -> Registration Service
/api/analytics/**     -> Analytics Service
```

---

## Main API Endpoints

### Organizer Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Events

```http
POST   /api/events
GET    /api/events
GET    /api/events/public
GET    /api/events/{id}
PUT    /api/events/{id}
DELETE /api/events/{id}
GET    /api/events/{id}/qr
```

### Registration

```http
POST /api/registrations
GET  /api/registrations/{id}
GET  /api/registrations/event/{eventId}
PUT  /api/registrations/{id}/confirm
PUT  /api/registrations/{id}/cancel
GET  /api/registrations/event/{eventId}/count
```

---

## Project Structure

```text
eventX/
│
├── eureka-server/
├── api-gateway/
├── organizer-service/
├── registration-service/
├── analytics-service/
├── notification-service/
├── 0frontend/
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Running Locally

### Prerequisites

Install:

- Java 17
- Maven
- Node.js and npm
- Docker Desktop
- Git

### Start Backend

From the project root:

```bash
cd D:\eventX
docker compose up -d --build
```

Check the running containers:

```bash
docker ps
```

The local services use:

```text
Eureka       http://localhost:8761
API Gateway  http://localhost:8080
Organizer    http://localhost:8081
Registration http://localhost:8082
Analytics    http://localhost:8083
Notification http://localhost:8084
Kafka        localhost:9092
```

### Start Frontend

Open another terminal:

```bash
cd D:\eventX\0frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

## Docker Compose Services

Docker Compose starts:

```text
Kafka
Eureka Server
Organizer MySQL
Registration MySQL
Analytics MySQL
Organizer Service
Registration Service
Analytics Service
Notification Service
API Gateway
```

The MySQL databases use persistent Docker volumes so database data is retained when containers are stopped and recreated.

To stop the application:

```bash
docker compose down
```

To start it again:

```bash
docker compose up -d
```

---

## Current Payment Implementation

The current payment flow is a **simulated payment confirmation** intended for project demonstration.

There is currently no real payment gateway or real-money transaction processing.

```text
Registration
     |
     v
PENDING_PAYMENT
     |
     v
Confirm Payment
     |
     v
CONFIRMED
```

---

## Current Deployment Status

EventX is **not deployed** to a public cloud environment at this stage.

The current setup is:

```text
Frontend  -> Local React/Vite server
Backend   -> Local Docker Compose
Database  -> Local Docker containers
Kafka     -> Local Docker container
Eureka    -> Local Docker container
```

The application is currently developed and demonstrated locally.

---

## Project Goals

The project demonstrates practical implementation of:

- Microservices architecture
- Service discovery
- API Gateway routing
- JWT authentication
- Inter-service communication using OpenFeign
- Event-driven architecture using Kafka
- Database-per-service design
- Concurrent seat reservation
- QR-based registration
- Simulated payment workflow
- PDF ticket generation
- Email notifications
- Docker containerization
- React frontend integration

---

## Future Enhancements

Possible future improvements include:

- Real payment gateway integration
- Organizer revenue and payout management
- Event search and filtering
- Advanced analytics dashboards
- Event categories
- Improved attendee management
- Production cloud deployment
- HTTPS and production domain configuration
- Public QR registration URLs
- Improved Kafka retry and dead-letter handling

---

## Author

**Sujitha Neelam**

B.Tech — Computer Science and Technology

GitHub: **sujitha769**
````
