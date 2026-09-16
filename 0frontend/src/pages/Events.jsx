import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/events/public");

        setEvents(response.data);
      } catch (error) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="events-page">
        <div className="events-loading">
          <div className="events-spinner"></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="events-page">
        <div className="events-error">
          <div className="error-icon">!</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>

          <button
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="events-page">

      {/* Background effects */}
      <div className="events-glow events-glow-one"></div>
      <div className="events-glow events-glow-two"></div>

      {/* Navbar */}
      <nav className="events-navbar">
        <div className="events-nav-inner">

          <button
            className="events-brand"
            onClick={() => navigate("/")}
          >
            <div className="events-logo">
              E
            </div>

            <span>
              Event<span>X</span>
            </span>
          </button>

          <div className="events-nav-actions">

            <button
              className="nav-link-button"
              onClick={() => navigate("/")}
            >
              Home
            </button>

            <button
              className="nav-organizer-button"
              onClick={() => navigate("/login")}
            >
              Organizer Login
            </button>

          </div>

        </div>
      </nav>

      {/* Main */}
      <main className="events-main">

        <div className="events-container">

          {/* Header */}
          <section className="events-header">

            <div className="events-eyebrow">
              DISCOVER EVENTS
            </div>

            <h1>
              Find something
              <span> worth attending.</span>
            </h1>

            <p>
              Explore upcoming events and reserve your seat
              in just a few clicks.
            </p>

          </section>

          {/* Empty state */}
          {events.length === 0 ? (
            <div className="empty-events">

              <div className="empty-events-icon">
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

              <h2>No events available</h2>

              <p>
                There are no upcoming events at the moment.
                Check back soon.
              </p>

              <button
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>

            </div>
          ) : (

            /* Event cards */
            <div className="events-grid">

              {events.map((event) => (

                <article
                  className="event-card"
                  key={event.eventId}
                >

                  {/* Card top */}
                  <div className="event-card-top">

                    <div className="event-category">
                      EVENT
                    </div>

                    <div
                      className={
                        event.seatsLeft > 0
                          ? "availability available"
                          : "availability sold-out"
                      }
                    >
                      <span></span>

                      {event.seatsLeft > 0
                        ? `${event.seatsLeft} seats left`
                        : "Sold out"}
                    </div>

                  </div>

                  {/* Event content */}
                  <div className="event-content">

                    <h2>{event.title}</h2>

                    <p className="event-description">
                      {event.description}
                    </p>

                    {/* Event information */}
                    <div className="event-info">

                      <div className="info-item">

                        <div className="info-icon">
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
                          <span>Date</span>
                          <strong>{event.eventDate}</strong>
                        </div>

                      </div>

                      <div className="info-item">

                        <div className="info-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M12 2v20"
                            />

                            <path
                              d="M17 5H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6"
                            />
                          </svg>
                        </div>

                        <div>
                          <span>Price</span>

                          <strong>
                            {Number(event.price) === 0
                              ? "Free"
                              : `₹${event.price}`}
                          </strong>
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Register button */}
                  <div className="event-card-footer">

                    <button
                      className="register-button"
                      disabled={event.seatsLeft <= 0}
                      onClick={() =>
                        navigate(
                          `/register/${event.eventId}`
                        )
                      }
                    >
                      {event.seatsLeft > 0
                        ? "Register for Event"
                        : "Sold Out"}

                      {event.seatsLeft > 0 && (
                        <span>→</span>
                      )}
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="events-footer">
        EventX · Discover. Register. Experience.
      </footer>

    </div>
  );
}

export default Events;