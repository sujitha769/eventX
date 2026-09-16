import { useNavigate } from "react-router-dom";

function OrganizerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("eventx_token");
    navigate("/login");
  };

  return (
    <div className="eventx-dashboard">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .eventx-dashboard {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 10% 10%,
              rgba(99, 102, 241, 0.15),
              transparent 30%
            ),
            radial-gradient(
              circle at 90% 85%,
              rgba(20, 184, 166, 0.09),
              transparent 28%
            ),
            #080b14;
          color: #ffffff;
          font-family: "DM Sans", sans-serif;
          position: relative;
          overflow: hidden;
        }

        .eventx-dashboard::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(
              rgba(255,255,255,0.015) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.015) 1px,
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

        /* NAVBAR */

        .eventx-dashboard-nav {
          height: 76px;
          padding: 0 6%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: rgba(8,11,20,0.72);
          backdrop-filter: blur(18px);
          position: relative;
          z-index: 5;
        }

        .eventx-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 1.18rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .eventx-brand-mark {
          width: 35px;
          height: 35px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          );
          box-shadow:
            0 8px 25px rgba(99,102,241,0.32);
        }

        .eventx-nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .eventx-organizer-label {
          color: #7f899f;
          font-size: 0.78rem;
        }

        .eventx-logout {
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          color: #b8c0d0;
          padding: 9px 16px;
          border-radius: 9px;
          font-family: inherit;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease;
        }

        .eventx-logout:hover {
          background: rgba(255,255,255,0.08);
          color: #ffffff;
          border-color: rgba(255,255,255,0.15);
        }

        /* MAIN */

        .eventx-dashboard-main {
          width: min(1120px, 90%);
          margin: 0 auto;
          padding: 75px 0 80px;
          position: relative;
          z-index: 2;
        }

        .eventx-dashboard-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #a5b4fc;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .eventx-dashboard-eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow: 0 0 12px rgba(129,140,248,0.8);
        }

        .eventx-dashboard-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          line-height: 1;
          letter-spacing: -0.055em;
          margin: 0;
          max-width: 800px;
        }

        .eventx-dashboard-gradient {
          background: linear-gradient(
            100deg,
            #a5b4fc,
            #67e8f9
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .eventx-dashboard-subtitle {
          color: #7f899f;
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 570px;
          margin: 20px 0 0;
        }

        /* ACTION CARDS */

        .eventx-dashboard-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 55px;
        }

        .eventx-action-card {
          position: relative;
          min-height: 270px;
          padding: 32px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.065),
              rgba(255,255,255,0.025)
            );
          backdrop-filter: blur(14px);
          overflow: hidden;
          cursor: pointer;
          text-align: left;
          color: #ffffff;
          font-family: inherit;
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease;
        }

        .eventx-action-card::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(99,102,241,0.1);
          filter: blur(40px);
          right: -70px;
          bottom: -80px;
          pointer-events: none;
        }

        .eventx-action-card:hover {
          transform: translateY(-5px);
          border-color: rgba(129,140,248,0.28);
          background:
            linear-gradient(
              145deg,
              rgba(99,102,241,0.11),
              rgba(255,255,255,0.035)
            );
          box-shadow:
            0 20px 55px rgba(0,0,0,0.25);
        }

        .eventx-action-icon {
          width: 52px;
          height: 52px;
          border-radius: 15px;
          display: grid;
          place-items: center;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(129,140,248,0.16);
          color: #a5b4fc;
          margin-bottom: 30px;
        }

        .eventx-action-icon svg {
          width: 24px;
          height: 24px;
        }

        .eventx-action-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: 1.35rem;
          margin: 0;
          letter-spacing: -0.025em;
        }

        .eventx-action-description {
          color: #747e94;
          font-size: 0.82rem;
          line-height: 1.6;
          max-width: 380px;
          margin: 10px 0 0;
        }

        .eventx-action-arrow {
          position: absolute;
          right: 28px;
          bottom: 27px;
          color: #697389;
          font-size: 1.1rem;
          transition:
            transform 0.2s ease,
            color 0.2s ease;
        }

        .eventx-action-card:hover .eventx-action-arrow {
          transform: translateX(5px);
          color: #a5b4fc;
        }

        /* INFO */

        .eventx-dashboard-info {
          margin-top: 35px;
          padding: 22px 25px;
          border-radius: 15px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.025);
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .eventx-info-icon {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          border-radius: 9px;
          display: grid;
          place-items: center;
          background: rgba(20,184,166,0.09);
          color: #5eead4;
          font-size: 0.85rem;
        }

        .eventx-dashboard-info p {
          color: #687287;
          font-size: 0.78rem;
          line-height: 1.5;
          margin: 0;
        }

        /* MOBILE */

        @media (max-width: 700px) {
          .eventx-dashboard-nav {
            padding: 0 5%;
          }

          .eventx-organizer-label {
            display: none;
          }

          .eventx-dashboard-main {
            width: 90%;
            padding: 55px 0 60px;
          }

          .eventx-dashboard-actions {
            grid-template-columns: 1fr;
            margin-top: 40px;
          }

          .eventx-action-card {
            min-height: 235px;
          }
        }

        @media (max-width: 430px) {
          .eventx-dashboard-nav {
            height: 68px;
          }

          .eventx-brand {
            font-size: 1rem;
          }

          .eventx-brand-mark {
            width: 31px;
            height: 31px;
          }

          .eventx-logout {
            padding: 8px 12px;
          }

          .eventx-dashboard-title {
            font-size: 2.65rem;
          }

          .eventx-action-card {
            padding: 25px;
          }

          .eventx-action-icon {
            margin-bottom: 25px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .eventx-action-card,
          .eventx-action-arrow {
            transition: none;
          }
        }
      `}</style>

      {/* NAVBAR */}

      <nav className="eventx-dashboard-nav">

        <div className="eventx-brand">
          <span className="eventx-brand-mark">
            X
          </span>
          EventX
        </div>

        <div className="eventx-nav-right">

          <span className="eventx-organizer-label">
            Organizer Portal
          </span>

          <button
            className="eventx-logout"
            onClick={handleLogout}
          >
            Log out
          </button>

        </div>

      </nav>

      {/* MAIN CONTENT */}

      <main className="eventx-dashboard-main">

        <div className="eventx-dashboard-eyebrow">
          <span className="eventx-dashboard-eyebrow-dot" />
          Organizer Dashboard
        </div>

        <h1 className="eventx-dashboard-title">
          Build events
          <br />
          <span className="eventx-dashboard-gradient">
            people remember.
          </span>
        </h1>

        <p className="eventx-dashboard-subtitle">
          Create new experiences, manage your existing
          events and keep your registrations organized
          from one place.
        </p>

        {/* ACTIONS */}

        <div className="eventx-dashboard-actions">

          <button
            className="eventx-action-card"
            onClick={() => navigate("/create-event")}
          >
            <div className="eventx-action-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                <path d="M12 13v5" />
                <path d="M9.5 15.5h5" />
              </svg>
            </div>

            <h2 className="eventx-action-title">
              Create an event
            </h2>

            <p className="eventx-action-description">
              Set up a new event with its details,
              capacity, date and pricing.
            </p>

            <span className="eventx-action-arrow">
              →
            </span>
          </button>

          <button
            className="eventx-action-card"
            onClick={() => navigate("/my-events")}
          >
            <div className="eventx-action-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="17"
                  rx="2"
                />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M3 10h18" />
                <path d="M8 14h2" />
                <path d="M14 14h2" />
                <path d="M8 18h2" />
                <path d="M14 18h2" />
              </svg>
            </div>

            <h2 className="eventx-action-title">
              My events
            </h2>

            <p className="eventx-action-description">
              View your events, monitor available seats,
              edit details and manage registrations.
            </p>

            <span className="eventx-action-arrow">
              →
            </span>
          </button>

        </div>

        {/* INFO */}

        <div className="eventx-dashboard-info">

          <div className="eventx-info-icon">
            ✓
          </div>

          <p>
            Your organizer account is connected.
            Everything you create and manage will be
            available from your EventX dashboard.
          </p>

        </div>

      </main>
    </div>
  );
}

export default OrganizerDashboard;