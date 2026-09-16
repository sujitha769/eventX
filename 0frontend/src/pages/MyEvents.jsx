import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [qrCode, setQrCode] = useState(null);
  const [showQr, setShowQr] = useState(null);
  const [qrLoading, setQrLoading] = useState(null);

  const navigate = useNavigate();

  const handleDelete = async (eventId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("eventx_token");

      await api.delete(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents((currentEvents) =>
        currentEvents.filter(
          (event) => event.eventId !== eventId
        )
      );

      if (showQr === eventId) {
        setShowQr(null);
        setQrCode(null);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete event"
      );
    }
  };

  const handleShowQr = async (eventId) => {
    if (showQr === eventId) {
      setShowQr(null);
      return;
    }

    try {
      const token = localStorage.getItem("eventx_token");

      setQrLoading(eventId);
      setError("");

      const response = await api.get(
        `/api/events/${eventId}/qr`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const qrUrl = URL.createObjectURL(response.data);

      setQrCode(qrUrl);
      setShowQr(eventId);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to generate QR code"
      );
    } finally {
      setQrLoading(null);
    }
  };

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem("eventx_token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get("/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load your events"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [navigate]);

  if (loading) {
    return (
      <div className="eventx-my-events-page">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

          * {
            box-sizing: border-box;
          }

          .eventx-my-events-page {
            min-height: 100vh;
            background: #080b14;
            color: white;
            font-family: "DM Sans", sans-serif;
            display: grid;
            place-items: center;
          }

          .eventx-loading {
            text-align: center;
          }

          .eventx-loading-spinner {
            width: 42px;
            height: 42px;
            border: 3px solid rgba(255,255,255,0.08);
            border-top-color: #818cf8;
            border-radius: 50%;
            margin: 0 auto 18px;
            animation: eventx-spin 0.8s linear infinite;
          }

          .eventx-loading p {
            color: #788298;
            font-size: 0.85rem;
          }

          @keyframes eventx-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

        <div className="eventx-loading">
          <div className="eventx-loading-spinner" />
          <p>Loading your events...</p>
        </div>
      </div>
    );
  }

  if (error && events.length === 0) {
    return (
      <div className="eventx-my-events-page">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

          * {
            box-sizing: border-box;
          }

          .eventx-my-events-page {
            min-height: 100vh;
            background:
              radial-gradient(
                circle at 10% 10%,
                rgba(99,102,241,0.14),
                transparent 30%
              ),
              #080b14;
            color: white;
            font-family: "DM Sans", sans-serif;
            display: grid;
            place-items: center;
            padding: 25px;
          }

          .eventx-error-card {
            width: min(430px, 100%);
            padding: 35px;
            text-align: center;
            border-radius: 20px;
            border: 1px solid rgba(248,113,113,0.15);
            background: rgba(255,255,255,0.035);
          }

          .eventx-error-icon {
            width: 50px;
            height: 50px;
            margin: 0 auto 18px;
            border-radius: 14px;
            display: grid;
            place-items: center;
            background: rgba(248,113,113,0.08);
            color: #fca5a5;
            font-size: 1.2rem;
          }

          .eventx-error-card p {
            color: #fca5a5;
            font-size: 0.85rem;
            line-height: 1.5;
            margin: 0 0 25px;
          }

          .eventx-error-card button {
            width: 100%;
            height: 45px;
            border: none;
            border-radius: 10px;
            background: linear-gradient(135deg,#6366f1,#8b5cf6);
            color: white;
            font-family: inherit;
            font-weight: 700;
            cursor: pointer;
          }
        `}</style>

        <div className="eventx-error-card">
          <div className="eventx-error-icon">!</div>

          <p>{error}</p>

          <button
            onClick={() => navigate("/organizer/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="eventx-my-events-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .eventx-my-events-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 10% 5%,
              rgba(99,102,241,0.15),
              transparent 28%
            ),
            radial-gradient(
              circle at 90% 90%,
              rgba(20,184,166,0.08),
              transparent 28%
            ),
            #080b14;
          color: #ffffff;
          font-family: "DM Sans", sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .eventx-my-events-page::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(
              rgba(255,255,255,0.014) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.014) 1px,
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

        .eventx-my-events-nav {
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

        .eventx-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .eventx-nav-button {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.035);
          color: #9aa3b6;
          padding: 9px 15px;
          border-radius: 9px;
          font-family: inherit;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .eventx-nav-button:hover {
          color: white;
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.15);
        }

        .eventx-create-nav-button {
          border: none;
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          );
          color: white;
          padding: 10px 16px;
          border-radius: 9px;
          font-family: inherit;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow:
            0 8px 22px rgba(99,102,241,0.2);
          transition: all 0.2s ease;
        }

        .eventx-create-nav-button:hover {
          transform: translateY(-1px);
          box-shadow:
            0 12px 28px rgba(99,102,241,0.3);
        }

        /* MAIN */

        .eventx-my-events-main {
          width: min(1180px, 90%);
          margin: 0 auto;
          padding: 65px 0 80px;
          position: relative;
          z-index: 2;
        }

        .eventx-page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 40px;
        }

        .eventx-page-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #a5b4fc;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .eventx-page-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow:
            0 0 12px rgba(129,140,248,0.8);
        }

        .eventx-page-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(2.7rem, 5vw, 4.2rem);
          line-height: 1;
          letter-spacing: -0.055em;
          margin: 0;
        }

        .eventx-page-gradient {
          background: linear-gradient(
            100deg,
            #a5b4fc,
            #67e8f9
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .eventx-page-subtitle {
          color: #778197;
          font-size: 0.9rem;
          line-height: 1.65;
          max-width: 560px;
          margin: 17px 0 0;
        }

        .eventx-header-create {
          flex-shrink: 0;
          height: 45px;
          padding: 0 18px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          );
          color: white;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow:
            0 10px 25px rgba(99,102,241,0.22);
          transition: all 0.2s ease;
        }

        .eventx-header-create:hover {
          transform: translateY(-2px);
          box-shadow:
            0 14px 32px rgba(99,102,241,0.32);
        }

        /* ERROR */

        .eventx-inline-error {
          padding: 12px 15px;
          margin-bottom: 20px;
          border-radius: 10px;
          border: 1px solid rgba(248,113,113,0.18);
          background: rgba(248,113,113,0.06);
          color: #fca5a5;
          font-size: 0.78rem;
        }

        /* EMPTY STATE */

        .eventx-empty {
          padding: 80px 30px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px;
          background: rgba(255,255,255,0.025);
        }

        .eventx-empty-icon {
          width: 65px;
          height: 65px;
          margin: 0 auto 22px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(129,140,248,0.15);
          color: #a5b4fc;
        }

        .eventx-empty-icon svg {
          width: 28px;
          height: 28px;
        }

        .eventx-empty h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: 1.5rem;
          margin: 0;
        }

        .eventx-empty p {
          color: #717b90;
          font-size: 0.84rem;
          margin: 10px 0 25px;
        }

        .eventx-empty button {
          height: 44px;
          padding: 0 20px;
          border: none;
          border-radius: 9px;
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          );
          color: white;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
        }

        /* EVENT GRID */

        .eventx-events-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .eventx-event-card {
          position: relative;
          border: 1px solid rgba(255,255,255,0.075);
          border-radius: 20px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.022)
            );
          overflow: hidden;
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .eventx-event-card:hover {
          transform: translateY(-4px);
          border-color: rgba(129,140,248,0.2);
          box-shadow:
            0 22px 55px rgba(0,0,0,0.25);
        }

        .eventx-event-top {
          padding: 27px 28px 22px;
        }

        .eventx-event-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 9px;
          border-radius: 999px;
          background: rgba(99,102,241,0.09);
          border: 1px solid rgba(129,140,248,0.13);
          color: #a5b4fc;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .eventx-event-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: 1.35rem;
          letter-spacing: -0.025em;
          margin: 0;
          line-height: 1.25;
        }

        .eventx-event-description {
          color: #737d92;
          font-size: 0.8rem;
          line-height: 1.6;
          margin: 10px 0 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* EVENT STATS */

        .eventx-event-stats {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .eventx-stat {
          padding: 17px 18px;
        }

        .eventx-stat + .eventx-stat {
          border-left: 1px solid rgba(255,255,255,0.06);
        }

        .eventx-stat-label {
          color: #596378;
          font-size: 0.63rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 6px;
        }

        .eventx-stat-value {
          color: #d6dbe6;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .eventx-seats-value {
          color: #67e8c7;
        }

        /* QR SECTION */

        .eventx-qr-section {
          padding: 25px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(0,0,0,0.12);
          text-align: center;
          animation: eventx-qr-open 0.25s ease both;
        }

        .eventx-qr-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: 1rem;
          margin: 0;
        }

        .eventx-qr-description {
          color: #717b90;
          font-size: 0.72rem;
          line-height: 1.5;
          max-width: 300px;
          margin: 7px auto 18px;
        }

        .eventx-qr-image {
          width: 210px;
          height: 210px;
          padding: 10px;
          background: white;
          border-radius: 14px;
          object-fit: contain;
          box-shadow:
            0 15px 40px rgba(0,0,0,0.3);
        }

        @keyframes eventx-qr-open {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ACTIONS */

        .eventx-event-actions {
          padding: 17px 20px;
          display: flex;
          gap: 9px;
        }

        .eventx-event-actions button {
          flex: 1;
          height: 40px;
          border-radius: 9px;
          font-family: inherit;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .eventx-qr-button {
          border: 1px solid rgba(45,212,191,0.17);
          background: rgba(20,184,166,0.06);
          color: #67e8c7;
        }

        .eventx-qr-button:hover:not(:disabled) {
          background: rgba(20,184,166,0.12);
          border-color: rgba(45,212,191,0.28);
        }

        .eventx-qr-button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .eventx-edit-button {
          border: 1px solid rgba(99,102,241,0.2);
          background: rgba(99,102,241,0.08);
          color: #a5b4fc;
        }

        .eventx-edit-button:hover {
          background: rgba(99,102,241,0.15);
          border-color: rgba(129,140,248,0.3);
        }

        .eventx-delete-button {
          flex: 0 0 40px !important;
          border: 1px solid rgba(248,113,113,0.13);
          background: rgba(248,113,113,0.045);
          color: #fca5a5;
        }

        .eventx-delete-button:hover {
          background: rgba(248,113,113,0.1);
          border-color: rgba(248,113,113,0.25);
        }

        /* FOOTER */

        .eventx-dashboard-bottom {
          margin-top: 35px;
          text-align: center;
        }

        .eventx-dashboard-bottom button {
          border: none;
          background: transparent;
          color: #697389;
          font-family: inherit;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .eventx-dashboard-bottom button:hover {
          color: #ffffff;
        }

        @media (max-width: 850px) {
          .eventx-events-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .eventx-my-events-nav {
            padding: 0 5%;
          }

          .eventx-my-events-main {
            width: 90%;
            padding: 50px 0 60px;
          }

          .eventx-page-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .eventx-header-create {
            width: 100%;
          }

          .eventx-event-top {
            padding: 24px;
          }
        }

        @media (max-width: 480px) {
          .eventx-nav-button {
            display: none;
          }

          .eventx-event-stats {
            grid-template-columns: 1fr 1fr;
          }

          .eventx-stat:last-child {
            grid-column: span 2;
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.06);
          }

          .eventx-event-actions {
            flex-wrap: wrap;
          }

          .eventx-qr-button,
          .eventx-edit-button {
            flex: 1 1 calc(50% - 5px) !important;
          }

          .eventx-delete-button {
            flex: 0 0 40px !important;
          }

          .eventx-qr-image {
            width: 190px;
            height: 190px;
          }
        }
      `}</style>

      {/* NAVBAR */}

      <nav className="eventx-my-events-nav">

        <div className="eventx-brand">
          <span className="eventx-brand-mark">
            X
          </span>
          EventX
        </div>

        <div className="eventx-nav-actions">

          <button
            className="eventx-nav-button"
            onClick={() =>
              navigate("/organizer/dashboard")
            }
          >
            ← Dashboard
          </button>

          <button
            className="eventx-create-nav-button"
            onClick={() => navigate("/create-event")}
          >
            + Create Event
          </button>

        </div>

      </nav>

      {/* MAIN */}

      <main className="eventx-my-events-main">

        <header className="eventx-page-header">

          <div>

            <div className="eventx-page-eyebrow">
              <span className="eventx-page-dot" />
              Organizer workspace
            </div>

            <h1 className="eventx-page-title">
              My{" "}
              <span className="eventx-page-gradient">
                events.
              </span>
            </h1>

            <p className="eventx-page-subtitle">
              Manage your events, share registration
              QR codes, update details and keep track
              of available seats.
            </p>

          </div>

          <button
            className="eventx-header-create"
            onClick={() => navigate("/create-event")}
          >
            + Create new event
          </button>

        </header>

        {error && (
          <div className="eventx-inline-error">
            {error}
          </div>
        )}

        {events.length === 0 ? (
          <div className="eventx-empty">

            <div className="eventx-empty-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
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
                <path d="M12 13v5" />
                <path d="M9.5 15.5h5" />
              </svg>
            </div>

            <h2>
              Your event space is empty
            </h2>

            <p>
              Create your first event and start bringing
              people together.
            </p>

            <button
              onClick={() => navigate("/create-event")}
            >
              Create Your First Event
            </button>

          </div>
        ) : (
          <div className="eventx-events-grid">

            {events.map((event) => (
              <article
                className="eventx-event-card"
                key={event.eventId}
              >

                <div className="eventx-event-top">

                  <div className="eventx-event-badge">
                    Event
                  </div>

                  <h2 className="eventx-event-title">
                    {event.title}
                  </h2>

                  <p className="eventx-event-description">
                    {event.description}
                  </p>

                </div>

                <div className="eventx-event-stats">

                  <div className="eventx-stat">

                    <div className="eventx-stat-label">
                      Date
                    </div>

                    <div className="eventx-stat-value">
                      {event.eventDate}
                    </div>

                  </div>

                  <div className="eventx-stat">

                    <div className="eventx-stat-label">
                      Capacity
                    </div>

                    <div className="eventx-stat-value">
                      {event.capacity}
                    </div>

                  </div>

                  <div className="eventx-stat">

                    <div className="eventx-stat-label">
                      Seats left
                    </div>

                    <div className="eventx-stat-value eventx-seats-value">
                      {event.seatsLeft}
                    </div>

                  </div>

                </div>

                {showQr === event.eventId &&
                  qrCode && (
                    <div className="eventx-qr-section">

                      <h3 className="eventx-qr-title">
                        Scan to Register
                      </h3>

                      <p className="eventx-qr-description">
                        Attendees can scan this QR code
                        to open the registration page.
                      </p>

                      <img
                        className="eventx-qr-image"
                        src={qrCode}
                        alt={`Registration QR code for ${event.title}`}
                      />

                    </div>
                  )}

                <div className="eventx-event-actions">

                  <button
                    className="eventx-qr-button"
                    onClick={() =>
                      handleShowQr(event.eventId)
                    }
                    disabled={
                      qrLoading === event.eventId
                    }
                  >
                    {qrLoading === event.eventId
                      ? "Generating..."
                      : showQr === event.eventId
                        ? "Hide QR"
                        : "Show QR"}
                  </button>

                  <button
                    className="eventx-edit-button"
                    onClick={() =>
                      navigate(
                        `/edit-event/${event.eventId}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="eventx-delete-button"
                    onClick={() =>
                      handleDelete(event.eventId)
                    }
                    aria-label={`Delete ${event.title}`}
                    title="Delete event"
                  >
                    ×
                  </button>

                </div>

              </article>
            ))}

          </div>
        )}

        <div className="eventx-dashboard-bottom">

          <button
            onClick={() =>
              navigate("/organizer/dashboard")
            }
          >
            ← Back to Organizer Dashboard
          </button>

        </div>

      </main>
    </div>
  );
}

export default MyEvents;