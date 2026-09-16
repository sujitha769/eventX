import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function OrganizerRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      setSuccess(true);

      setName("");
      setEmail("");
      setPassword("");
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
    <div className="eventx-register-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .eventx-register-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(99, 102, 241, 0.18),
              transparent 28%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(20, 184, 166, 0.12),
              transparent 28%
            ),
            #080b14;
          color: #ffffff;
          font-family: "DM Sans", sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
          position: relative;
          overflow: hidden;
        }

        .eventx-register-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(
              rgba(255,255,255,0.018) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.018) 1px,
              transparent 1px
            );
          background-size: 55px 55px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 90%
          );
          pointer-events: none;
        }

        .eventx-register-layout {
          width: 100%;
          max-width: 1050px;
          min-height: 650px;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 26px;
          overflow: hidden;
          background: rgba(14, 18, 30, 0.78);
          backdrop-filter: blur(18px);
          box-shadow: 0 35px 100px rgba(0,0,0,0.45);
          position: relative;
          z-index: 2;
          animation: eventx-register-rise 0.55s ease both;
        }

        /* LEFT SIDE */

        .eventx-register-info {
          padding: 55px 45px;
          background:
            linear-gradient(
              145deg,
              rgba(99,102,241,0.18),
              rgba(15,23,42,0.35)
            );
          border-right: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .eventx-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .eventx-brand-mark {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          box-shadow: 0 8px 25px rgba(99,102,241,0.35);
        }

        .eventx-info-content {
          margin-top: auto;
          margin-bottom: auto;
        }

        .eventx-info-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 11px;
          border-radius: 999px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(129,140,248,0.2);
          color: #a5b4fc;
          font-size: 0.72rem;
          font-weight: 700;
          margin-bottom: 22px;
        }

        .eventx-info-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow: 0 0 10px #818cf8;
        }

        .eventx-info-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1.02;
          letter-spacing: -0.045em;
          margin: 0;
        }

        .eventx-info-gradient {
          background: linear-gradient(
            100deg,
            #a5b4fc,
            #67e8f9
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .eventx-info-text {
          color: #8993aa;
          line-height: 1.7;
          font-size: 0.92rem;
          max-width: 390px;
          margin-top: 20px;
        }

        .eventx-benefits {
          display: flex;
          flex-direction: column;
          gap: 13px;
          margin-top: 30px;
        }

        .eventx-benefit {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #aeb6c8;
          font-size: 0.82rem;
        }

        .eventx-benefit-icon {
          width: 25px;
          height: 25px;
          border-radius: 7px;
          display: grid;
          place-items: center;
          background: rgba(99,102,241,0.12);
          color: #a5b4fc;
          font-size: 0.72rem;
        }

        .eventx-info-footer {
          color: #5e687d;
          font-size: 0.72rem;
        }

        /* RIGHT SIDE */

        .eventx-register-form-section {
          padding: 55px 55px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: rgba(8,11,20,0.3);
        }

        .eventx-form-header {
          margin-bottom: 30px;
        }

        .eventx-form-label {
          color: #818cf8;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .eventx-form-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: 2rem;
          letter-spacing: -0.03em;
          margin: 8px 0 8px;
        }

        .eventx-form-subtitle {
          color: #7f899f;
          font-size: 0.86rem;
          line-height: 1.55;
          margin: 0;
        }

        .eventx-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .eventx-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .eventx-field label {
          color: #c5cbda;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .eventx-input-wrapper {
          position: relative;
        }

        .eventx-field input {
          width: 100%;
          height: 48px;
          padding: 0 14px;
          border-radius: 11px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.045);
          color: #ffffff;
          font-family: inherit;
          font-size: 0.88rem;
          outline: none;
          transition:
            border-color 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .eventx-field input::placeholder {
          color: #555f73;
        }

        .eventx-field input:hover {
          border-color: rgba(255,255,255,0.17);
        }

        .eventx-field input:focus {
          border-color: #6366f1;
          background: rgba(99,102,241,0.06);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        .eventx-error {
          padding: 11px 13px;
          margin: 0;
          border-radius: 10px;
          border: 1px solid rgba(248,113,113,0.2);
          background: rgba(248,113,113,0.07);
          color: #fca5a5;
          font-size: 0.8rem;
          line-height: 1.45;
        }

        .eventx-submit {
          width: 100%;
          height: 50px;
          border: none;
          border-radius: 11px;
          margin-top: 3px;
          color: #ffffff;
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          );
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(99,102,241,0.25);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            opacity 0.2s ease;
        }

        .eventx-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 35px rgba(99,102,241,0.35);
        }

        .eventx-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .eventx-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .eventx-login-text {
          text-align: center;
          color: #697389;
          font-size: 0.8rem;
          margin: 24px 0 0;
        }

        .eventx-login-button {
          border: none;
          background: none;
          color: #a5b4fc;
          font-family: inherit;
          font-size: inherit;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
        }

        .eventx-login-button:hover {
          text-decoration: underline;
        }

        /* SUCCESS */

        .eventx-success {
          text-align: center;
          max-width: 400px;
          margin: 0 auto;
        }

        .eventx-success-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 22px;
          border-radius: 20px;
          display: grid;
          place-items: center;
          background: rgba(45,212,191,0.1);
          border: 1px solid rgba(45,212,191,0.18);
          color: #5eead4;
          box-shadow: 0 15px 40px rgba(20,184,166,0.1);
        }

        .eventx-success-icon svg {
          width: 30px;
          height: 30px;
        }

        .eventx-success-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: 2rem;
          margin: 0;
          letter-spacing: -0.03em;
        }

        .eventx-success-text {
          color: #7f899f;
          font-size: 0.88rem;
          line-height: 1.6;
          margin: 12px 0 28px;
        }

        .eventx-success-button {
          width: 100%;
          height: 48px;
          border: none;
          border-radius: 11px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-family: inherit;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(99,102,241,0.25);
        }

        @keyframes eventx-register-rise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 800px) {
          .eventx-register-layout {
            grid-template-columns: 1fr;
          }

          .eventx-register-info {
            padding: 35px;
            min-height: 380px;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }

          .eventx-info-content {
            margin: 45px 0 0;
          }

          .eventx-register-form-section {
            padding: 40px 35px;
          }
        }

        @media (max-width: 520px) {
          .eventx-register-page {
            padding: 15px;
          }

          .eventx-register-info {
            padding: 28px 24px;
          }

          .eventx-register-form-section {
            padding: 32px 24px;
          }

          .eventx-info-title {
            font-size: 2.5rem;
          }

          .eventx-form-title {
            font-size: 1.7rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .eventx-register-layout {
            animation: none;
          }
        }
      `}</style>

      <div className="eventx-register-layout">

        {/* LEFT INFORMATION PANEL */}
        <section className="eventx-register-info">

          <div className="eventx-brand">
            <span className="eventx-brand-mark">X</span>
            EventX
          </div>

          <div className="eventx-info-content">

            <div className="eventx-info-badge">
              <span className="eventx-info-badge-dot" />
              ORGANIZER PLATFORM
            </div>

            <h1 className="eventx-info-title">
              Bring your
              <br />
              <span className="eventx-info-gradient">
                event to life.
              </span>
            </h1>

            <p className="eventx-info-text">
              Create and manage events, track registrations,
              share your event QR code and give attendees a
              simple way to reserve their seats.
            </p>

            <div className="eventx-benefits">
              <div className="eventx-benefit">
                <span className="eventx-benefit-icon">✓</span>
                Create and manage events
              </div>

              <div className="eventx-benefit">
                <span className="eventx-benefit-icon">✓</span>
                Track available seats
              </div>

              <div className="eventx-benefit">
                <span className="eventx-benefit-icon">✓</span>
                Generate registration QR codes
              </div>
            </div>

          </div>

          <div className="eventx-info-footer">
            Built for modern event experiences.
          </div>

        </section>

        {/* FORM PANEL */}
        <section className="eventx-register-form-section">

          {success ? (
            <div className="eventx-success">

              <div className="eventx-success-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>

              <h1 className="eventx-success-title">
                Account created
              </h1>

              <p className="eventx-success-text">
                Your organizer account is ready.
                Log in to start creating and managing
                your events on EventX.
              </p>

              <button
                className="eventx-success-button"
                onClick={() => navigate("/login")}
              >
                Continue to login →
              </button>

            </div>
          ) : (
            <>
              <div className="eventx-form-header">
                <span className="eventx-form-label">
                  Get started
                </span>

                <h2 className="eventx-form-title">
                  Create organizer account
                </h2>

                <p className="eventx-form-subtitle">
                  Set up your account and start hosting
                  memorable events.
                </p>
              </div>

              <form
                onSubmit={handleRegister}
                className="eventx-form"
              >

                <div className="eventx-field">
                  <label htmlFor="name">
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="eventx-field">
                  <label htmlFor="email">
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="eventx-field">
                  <label htmlFor="password">
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Create a secure password"
                    required
                  />
                </div>

                {error && (
                  <p className="eventx-error">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="eventx-submit"
                  disabled={loading}
                >
                  {loading
                    ? "Creating account..."
                    : "Create organizer account"}
                </button>

              </form>

              <p className="eventx-login-text">
                Already have an account?{" "}

                <button
                  type="button"
                  className="eventx-login-button"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
              </p>
            </>
          )}

        </section>

      </div>
    </div>
  );
}

export default OrganizerRegister;