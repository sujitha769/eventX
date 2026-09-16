import { useLocation } from "react-router-dom";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();

  const registration = location.state?.registration;

  if (!registration) {
    return (
      <div className="success-page">

        <div className="success-glow success-glow-one"></div>
        <div className="success-glow success-glow-two"></div>

        <main className="success-main">
          <div className="missing-card">

            <div className="missing-icon">
              !
            </div>

            <h1>
              Registration Information Not Found
            </h1>

            <p>
              Please scan the event QR code and register again.
            </p>

          </div>
        </main>

      </div>
    );
  }

  return (
    <div className="success-page">

      {/* Background effects */}
      <div className="success-glow success-glow-one"></div>
      <div className="success-glow success-glow-two"></div>

      {/* Navbar */}
      <nav className="success-navbar">
        <div className="success-nav-inner">

          <div className="success-brand">
            <div className="success-logo">
              E
            </div>

            <span>
              Event<span>X</span>
            </span>
          </div>

          <div className="success-status">
            <span></span>
            Registration Confirmed
          </div>

        </div>
      </nav>

      {/* Main */}
      <main className="success-main">

        <div className="success-container">

          {/* Success icon */}
          <div className="success-check-wrapper">
            <div className="success-check">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                />
              </svg>

            </div>
          </div>

          {/* Header */}
          <div className="success-header">

            <div className="success-badge">
              Payment Successful
            </div>

            <h1>
              You're officially registered! 🎉
            </h1>

            <p>
              Your registration has been successfully confirmed.
            </p>

          </div>

          {/* Registration card */}
          <div className="registration-card">

            <div className="card-heading">

              <div>
                <span className="small-label">
                  EVENTX
                </span>

                <h2>
                  Registration Details
                </h2>
              </div>

              <div className="confirmed-badge">
                ✓ Confirmed
              </div>

            </div>

            <div className="details-grid">

              <div className="registration-detail">
                <span>Registration ID</span>
                <strong>
                  {registration.id}
                </strong>
              </div>

              <div className="registration-detail">
                <span>Event ID</span>
                <strong>
                  {registration.eventId}
                </strong>
              </div>

              <div className="registration-detail">
                <span>Name</span>
                <strong>
                  {registration.name}
                </strong>
              </div>

              <div className="registration-detail">
                <span>Email</span>
                <strong>
                  {registration.email}
                </strong>
              </div>

              <div className="registration-detail ticket-detail">
                <span>Ticket ID</span>
                <strong>
                  {registration.ticketId}
                </strong>
              </div>

              <div className="registration-detail">
                <span>Status</span>
                <strong className="status-text">
                  {registration.status}
                </strong>
              </div>

            </div>

          </div>

          {/* Email notification */}
          <div className="email-card">

            <div className="email-icon">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />

                <path d="M3 7l9 6 9-6" />
              </svg>

            </div>

            <div>

              <h3>
                Your ticket is on its way
              </h3>

              <p>
                A PDF copy of your ticket will be sent to{" "}
                <strong>
                  {registration.email}
                </strong>.
              </p>

            </div>

          </div>

          {/* Completion message */}
          <div className="success-complete-message">

            <div className="complete-check">
              ✓
            </div>

            <div>
              <strong>
                You're all set!
              </strong>

              <p>
                Keep your ticket PDF handy for the event.
              </p>
            </div>

          </div>

          {/* Footer */}
          <p className="success-footer">
            Thank you for choosing EventX · Enjoy your event!
          </p>

        </div>

      </main>

    </div>
  );
}

export default PaymentSuccess;