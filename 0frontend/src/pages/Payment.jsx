import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const registrationId = location.state?.registrationId;
  const eventId = location.state?.eventId;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (!registrationId) {
      setError("Registration information is missing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.put(
        `/api/registrations/${registrationId}/confirm`
      );

      navigate("/payment-success", {
        state: {
          registration: response.data,
          eventId,
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Payment confirmation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">

      {/* Background effects */}
      <div className="payment-glow payment-glow-one"></div>
      <div className="payment-glow payment-glow-two"></div>

      {/* Navbar */}
      <nav className="payment-navbar">
        <div className="payment-nav-inner">

          <button
            className="payment-brand"
            onClick={() => navigate("/events")}
          >
            <div className="payment-logo">
              E
            </div>

            <span>
              Event<span>X</span>
            </span>
          </button>

          <div className="secure-label">
            <span className="secure-dot"></span>
            Secure Registration
          </div>

        </div>
      </nav>

      {/* Main */}
      <main className="payment-main">

        <div className="payment-container">

          {/* Header */}
          <div className="payment-header">

            <div className="payment-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="11"
                  rx="2"
                />

                <path
                  d="M8 10V7a4 4 0 018 0v3"
                />

                <path
                  d="M12 14v3"
                />
              </svg>
            </div>

            <h1>Complete your registration</h1>

            <p>
              Confirm your registration to reserve your seat.
            </p>

          </div>

          {/* Card */}
          <div className="payment-card">

            {/* Test payment notice */}
            <div className="test-payment">

              <div className="notice-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />

                  <path d="M12 11v5" />

                  <path d="M12 8h.01" />
                </svg>
              </div>

              <div>
                <h3>Test Payment Environment</h3>

                <p>
                  No real payment will be charged. Clicking the
                  button below will simulate a successful payment.
                </p>
              </div>

            </div>

            {/* Registration information */}
            <div className="details-section">

              <div className="detail-row">
                <div>
                  <span className="detail-label">
                    Registration ID
                  </span>

                  <span className="detail-description">
                    Your registration reference
                  </span>
                </div>

                <span className="detail-value">
                  {registrationId || "—"}
                </span>
              </div>

              <div className="detail-row">
                <div>
                  <span className="detail-label">
                    Event ID
                  </span>

                  <span className="detail-description">
                    Event you're registering for
                  </span>
                </div>

                <span className="detail-value">
                  {eventId || "—"}
                </span>
              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="payment-error">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />

                  <path d="M12 8v4" />

                  <path d="M12 16h.01" />
                </svg>

                <span>{error}</span>

              </div>
            )}

            {/* Payment button */}
            <button
              className="pay-button"
              onClick={handlePayment}
              disabled={loading || !registrationId}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Processing Payment...
                </>
              ) : (
                <>
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

                    <path d="M3 10h18" />

                    <path d="M7 15h3" />
                  </svg>

                  Pay & Confirm Registration
                </>
              )}
            </button>

            {/* Back button */}
            <button
              className="back-button"
              onClick={() => navigate("/events")}
              disabled={loading}
            >
              ← Back to Events
            </button>

            {/* Security message */}
            <div className="security-message">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                />
              </svg>

              <span>
                Your registration is securely processed by EventX
              </span>

            </div>

          </div>

          {/* Footer */}
          <p className="payment-footer">
            EventX · Event Registration Platform
          </p>

        </div>

      </main>

    </div>
  );
}

export default Payment;