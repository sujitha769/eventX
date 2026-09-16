import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "eventx_token",
        response.data.token
      );

      navigate("/organizer/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="eventx-login-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .eventx-login-page {
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

        .eventx-login-page::before {
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

        .eventx-login-layout {
          width: 100%;
          max-width: 1000px;
          min-height: 610px;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 26px;
          overflow: hidden;
          background: rgba(14,18,30,0.78);
          backdrop-filter: blur(18px);
          box-shadow: 0 35px 100px rgba(0,0,0,0.45);
          position: relative;
          z-index: 2;
          animation: eventx-login-rise 0.55s ease both;
        }

        /* LEFT PANEL */

        .eventx-login-info {
          padding: 50px 45px;
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
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          );
          box-shadow:
            0 8px 25px rgba(99,102,241,0.35);
        }

        .eventx-login-info-content {
          margin: auto 0;
        }

        .eventx-login-badge {
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

        .eventx-login-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow: 0 0 10px #818cf8;
        }

        .eventx-login-info-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.02;
          letter-spacing: -0.045em;
          margin: 0;
        }

        .eventx-login-gradient {
          background: linear-gradient(
            100deg,
            #a5b4fc,
            #67e8f9
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .eventx-login-info-text {
          max-width: 370px;
          margin: 20px 0 0;
          color: #8993aa;
          font-size: 0.9rem;
          line-height: 1.7;
        }

        .eventx-login-features {
          display: flex;
          flex-direction: column;
          gap: 13px;
          margin-top: 30px;
        }

        .eventx-login-feature {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #aeb6c8;
          font-size: 0.82rem;
        }

        .eventx-login-feature-icon {
          width: 25px;
          height: 25px;
          border-radius: 7px;
          display: grid;
          place-items: center;
          background: rgba(99,102,241,0.12);
          color: #a5b4fc;
          font-size: 0.72rem;
        }

        .eventx-login-footer {
          color: #5e687d;
          font-size: 0.72rem;
        }

        /* RIGHT FORM */

        .eventx-login-form-section {
          padding: 50px 55px;
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
          margin: 8px 0;
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

        .eventx-field input {
          width: 100%;
          height: 49px;
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
          box-shadow:
            0 0 0 3px rgba(99,102,241,0.12);
        }

        .eventx-error {
          margin: 0;
          padding: 11px 13px;
          border-radius: 10px;
          border: 1px solid rgba(248,113,113,0.2);
          background: rgba(248,113,113,0.07);
          color: #fca5a5;
          font-size: 0.8rem;
          line-height: 1.45;
        }

        .eventx-login-button {
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
          box-shadow:
            0 12px 28px rgba(99,102,241,0.25);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            opacity 0.2s ease;
        }

        .eventx-login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 16px 35px rgba(99,102,241,0.35);
        }

        .eventx-login-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .eventx-login-button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .eventx-register-text {
          text-align: center;
          color: #697389;
          font-size: 0.8rem;
          margin: 24px 0 0;
        }

        .eventx-register-button {
          border: none;
          background: none;
          color: #a5b4fc;
          font-family: inherit;
          font-size: inherit;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
        }

        .eventx-register-button:hover {
          text-decoration: underline;
        }

        .eventx-back-button {
          position: absolute;
          top: 25px;
          right: 28px;
          border: none;
          background: transparent;
          color: #657087;
          font-family: inherit;
          font-size: 0.75rem;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .eventx-back-button:hover {
          color: #ffffff;
        }

        @keyframes eventx-login-rise {
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
          .eventx-login-layout {
            grid-template-columns: 1fr;
          }

          .eventx-login-info {
            padding: 35px;
            min-height: 380px;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }

          .eventx-login-info-content {
            margin: 45px 0 0;
          }

          .eventx-login-form-section {
            padding: 40px 35px;
          }
        }

        @media (max-width: 520px) {
          .eventx-login-page {
            padding: 15px;
          }

          .eventx-login-info {
            padding: 28px 24px;
          }

          .eventx-login-form-section {
            padding: 32px 24px;
          }

          .eventx-login-info-title {
            font-size: 2.5rem;
          }

          .eventx-form-title {
            font-size: 1.7rem;
          }

          .eventx-back-button {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .eventx-login-layout {
            animation: none;
          }
        }
      `}</style>

      <div className="eventx-login-layout">

        {/* LEFT INFORMATION PANEL */}

        <section className="eventx-login-info">

          <div className="eventx-brand">
            <span className="eventx-brand-mark">X</span>
            EventX
          </div>

          <div className="eventx-login-info-content">

            <div className="eventx-login-badge">
              <span className="eventx-login-dot" />
              ORGANIZER ACCESS
            </div>

            <h1 className="eventx-login-info-title">
              Welcome
              <br />
              <span className="eventx-login-gradient">
                back.
              </span>
            </h1>

            <p className="eventx-login-info-text">
              Manage your events from one place. Create
              experiences, monitor registrations and keep
              everything organized with EventX.
            </p>

            <div className="eventx-login-features">

              <div className="eventx-login-feature">
                <span className="eventx-login-feature-icon">
                  ✓
                </span>
                Manage your events
              </div>

              <div className="eventx-login-feature">
                <span className="eventx-login-feature-icon">
                  ◈
                </span>
                Track registrations
              </div>

              <div className="eventx-login-feature">
                <span className="eventx-login-feature-icon">
                  ⌁
                </span>
                Share event QR codes
              </div>

            </div>

          </div>

          <div className="eventx-login-footer">
            Your events. Your audience. One platform.
          </div>

        </section>

        {/* LOGIN FORM */}

        <section className="eventx-login-form-section">

          <button
            className="eventx-back-button"
            onClick={() => navigate("/")}
          >
            ← Back to EventX
          </button>

          <div className="eventx-form-header">

            <span className="eventx-form-label">
              Organizer portal
            </span>

            <h2 className="eventx-form-title">
              Log in to your account
            </h2>

            <p className="eventx-form-subtitle">
              Enter your credentials to access your
              organizer dashboard.
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="eventx-form"
          >

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
                placeholder="Enter your password"
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
              className="eventx-login-button"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Log in to EventX →"}
            </button>

          </form>

          <p className="eventx-register-text">
            Don't have an organizer account?{" "}

            <button
              type="button"
              className="eventx-register-button"
              onClick={() =>
                navigate("/organizer/register")
              }
            >
              Create one
            </button>
          </p>

        </section>

      </div>
    </div>
  );
}

export default Login;