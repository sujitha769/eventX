import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./RegisterEvent.css";

function RegisterEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        "/api/registrations",
        {
          eventId: Number(eventId),
          name: formData.name,
          rollNumber: formData.rollNumber,
          branch: formData.branch,
          email: formData.email,
          phone: formData.phone,
        }
      );

      navigate("/payment", {
        state: {
          registrationId: response.data.id,
          eventId: Number(eventId),
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-glow register-glow-one"></div>
      <div className="register-glow register-glow-two"></div>

      <nav className="register-navbar">
        <div className="register-nav-inner">

          <div className="register-brand">
            <div className="register-logo">
              E
            </div>

            <span>
              Event<span>X</span>
            </span>
          </div>

          <div className="registration-label">
            Event Registration
          </div>

        </div>
      </nav>

      <main className="register-main">

        <div className="register-container">

          <div className="register-header">

            <div className="register-badge">
              EVENT REGISTRATION
            </div>

            <h1>
              Register for this event.
            </h1>

            <p>
              Enter your details below to reserve your
              place at this event.
            </p>

          </div>

          <div className="register-card">

            <div className="event-reference">
              <div className="reference-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="17"
                    rx="2"
                  />
                  <path d="M16 2v4" />
                  <path d="M8 2v4" />
                  <path d="M3 10h18" />
                </svg>
              </div>

              <div>
                <span>EVENT</span>
                <strong>Event #{eventId}</strong>
              </div>
            </div>

            <div className="form-divider"></div>

            <form onSubmit={handleSubmit}>

              <div className="form-section-title">
                Personal Information
              </div>

              <div className="form-grid">

                <div className="form-group full-width">
                  <label htmlFor="name">
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rollNumber">
                    Roll Number
                  </label>

                  <input
                    id="rollNumber"
                    name="rollNumber"
                    type="text"
                    placeholder="Enter roll number"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="branch">
                    Branch
                  </label>

                  <input
                    id="branch"
                    name="branch"
                    type="text"
                    placeholder="e.g. CSE"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                  />
                </div>

              </div>

              {error && (
                <div className="register-error">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>

                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="continue-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="register-spinner"></span>
                    Registering...
                  </>
                ) : (
                  <>
                    Continue to Payment
                    <span>→</span>
                  </>
                )}
              </button>

            </form>

            <div className="registration-security">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />
              </svg>

              <span>
                Your information is securely processed by EventX
              </span>

            </div>

          </div>

          <p className="register-footer">
            EventX · Event Registration Platform
          </p>

        </div>

      </main>

    </div>
  );
}

export default RegisterEvent;