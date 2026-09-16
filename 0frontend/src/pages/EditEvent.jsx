import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("eventx_token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get(
          `/api/events/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const event = response.data;

        setTitle(event.title);
        setDescription(event.description);
        setCapacity(event.capacity);
        setEventDate(event.eventDate);
        setPrice(event.price);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load event"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, navigate]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("eventx_token");

      await api.put(
        `/api/events/${eventId}`,
        {
          title,
          description,
          capacity: Number(capacity),
          eventDate,
          price: Number(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Event updated successfully! 🎉");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update event"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="eventx-edit-page">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

          * {
            box-sizing: border-box;
          }

          .eventx-edit-page {
            min-height: 100vh;
            background:
              radial-gradient(
                circle at 10% 10%,
                rgba(99,102,241,0.15),
                transparent 30%
              ),
              #080b14;
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
          <p>Loading event...</p>
        </div>
      </div>
    );
  }

  if (error && !title) {
    return (
      <div className="eventx-edit-page">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

          * {
            box-sizing: border-box;
          }

          .eventx-edit-page {
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
          <div className="eventx-error-icon">
            !
          </div>

          <p>{error}</p>

          <button
            onClick={() => navigate("/my-events")}
          >
            Back to My Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="eventx-edit-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .eventx-edit-page {
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

        .eventx-edit-page::before {
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

        .eventx-edit-nav {
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

        .eventx-back-nav {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.035);
          color: #8993aa;
          padding: 9px 15px;
          border-radius: 9px;
          font-family: inherit;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .eventx-back-nav:hover {
          color: white;
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.15);
        }

        /* MAIN */

        .eventx-edit-main {
          width: min(900px, 90%);
          margin: 0 auto;
          padding: 65px 0 80px;
          position: relative;
          z-index: 2;
        }

        .eventx-edit-heading {
          margin-bottom: 35px;
        }

        .eventx-edit-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #a5b4fc;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 17px;
        }

        .eventx-edit-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow:
            0 0 12px rgba(129,140,248,0.8);
        }

        .eventx-edit-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(2.7rem, 6vw, 4.4rem);
          line-height: 1;
          letter-spacing: -0.055em;
          margin: 0;
        }

        .eventx-edit-gradient {
          background: linear-gradient(
            100deg,
            #a5b4fc,
            #67e8f9
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .eventx-edit-subtitle {
          color: #7f899f;
          font-size: 0.92rem;
          line-height: 1.7;
          max-width: 590px;
          margin: 18px 0 0;
        }

        /* FORM CARD */

        .eventx-edit-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.022)
            );
          backdrop-filter: blur(16px);
          padding: 38px;
          box-shadow:
            0 25px 70px rgba(0,0,0,0.25);
        }

        .eventx-form {
          display: flex;
          flex-direction: column;
          gap: 21px;
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

        .eventx-field input,
        .eventx-field textarea {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 11px;
          background: rgba(255,255,255,0.045);
          color: #ffffff;
          font-family: inherit;
          font-size: 0.86rem;
          outline: none;
          transition:
            border-color 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .eventx-field input {
          height: 49px;
          padding: 0 14px;
        }

        .eventx-field textarea {
          min-height: 125px;
          padding: 13px 14px;
          resize: vertical;
          line-height: 1.6;
        }

        .eventx-field input:hover,
        .eventx-field textarea:hover {
          border-color: rgba(255,255,255,0.17);
        }

        .eventx-field input:focus,
        .eventx-field textarea:focus {
          border-color: #6366f1;
          background: rgba(99,102,241,0.06);
          box-shadow:
            0 0 0 3px rgba(99,102,241,0.12);
        }

        .eventx-field input::placeholder,
        .eventx-field textarea::placeholder {
          color: #555f73;
        }

        .eventx-field input[type="date"] {
          color-scheme: dark;
        }

        /* TWO COLUMNS */

        .eventx-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        /* MESSAGES */

        .eventx-message {
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 0.8rem;
          line-height: 1.45;
          margin: 0;
        }

        .eventx-error {
          border: 1px solid rgba(248,113,113,0.2);
          background: rgba(248,113,113,0.07);
          color: #fca5a5;
        }

        .eventx-success {
          border: 1px solid rgba(45,212,191,0.18);
          background: rgba(20,184,166,0.07);
          color: #5eead4;
        }

        /* BUTTONS */

        .eventx-update-button {
          width: 100%;
          height: 51px;
          border: none;
          border-radius: 11px;
          margin-top: 4px;
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

        .eventx-update-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 16px 35px rgba(99,102,241,0.35);
        }

        .eventx-update-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .eventx-update-button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .eventx-events-button {
          width: 100%;
          height: 48px;
          margin-top: 15px;
          border-radius: 11px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
          color: #8b95aa;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .eventx-events-button:hover {
          color: white;
          background: rgba(255,255,255,0.055);
          border-color: rgba(255,255,255,0.14);
        }

        @media (max-width: 650px) {
          .eventx-edit-nav {
            padding: 0 5%;
          }

          .eventx-edit-main {
            width: 90%;
            padding: 50px 0 60px;
          }

          .eventx-edit-card {
            padding: 25px;
            border-radius: 18px;
          }

          .eventx-field-row {
            grid-template-columns: 1fr;
            gap: 21px;
          }
        }

        @media (max-width: 430px) {
          .eventx-edit-nav {
            height: 68px;
          }

          .eventx-brand {
            font-size: 1rem;
          }

          .eventx-brand-mark {
            width: 31px;
            height: 31px;
          }

          .eventx-back-nav {
            padding: 8px 11px;
          }

          .eventx-edit-title {
            font-size: 2.55rem;
          }

          .eventx-edit-card {
            padding: 21px;
          }
        }
      `}</style>

      {/* NAVBAR */}

      <nav className="eventx-edit-nav">

        <div className="eventx-brand">
          <span className="eventx-brand-mark">
            X
          </span>
          EventX
        </div>

        <button
          className="eventx-back-nav"
          onClick={() => navigate("/my-events")}
        >
          ← My Events
        </button>

      </nav>

      {/* MAIN */}

      <main className="eventx-edit-main">

        <div className="eventx-edit-heading">

          <div className="eventx-edit-eyebrow">
            <span className="eventx-edit-dot" />
            Event management
          </div>

          <h1 className="eventx-edit-title">
            Refine your
            <br />
            <span className="eventx-edit-gradient">
              event.
            </span>
          </h1>

          <p className="eventx-edit-subtitle">
            Update your event details whenever you need.
            Your existing event and registration flow
            remains connected automatically.
          </p>

        </div>

        <div className="eventx-edit-card">

          <form
            onSubmit={handleUpdate}
            className="eventx-form"
          >

            <div className="eventx-field">

              <label htmlFor="title">
                Event title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Enter event title"
                required
              />

            </div>

            <div className="eventx-field">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe your event..."
                required
              />

            </div>

            <div className="eventx-field-row">

              <div className="eventx-field">

                <label htmlFor="capacity">
                  Maximum capacity
                </label>

                <input
                  id="capacity"
                  type="number"
                  min="1"
                  value={capacity}
                  onChange={(e) =>
                    setCapacity(e.target.value)
                  }
                  required
                />

              </div>

              <div className="eventx-field">

                <label htmlFor="price">
                  Ticket price (₹)
                </label>

                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            <div className="eventx-field">

              <label htmlFor="eventDate">
                Event date
              </label>

              <input
                id="eventDate"
                type="date"
                value={eventDate}
                onChange={(e) =>
                  setEventDate(e.target.value)
                }
                required
              />

            </div>

            {error && (
              <p className="eventx-message eventx-error">
                {error}
              </p>
            )}

            {success && (
              <p className="eventx-message eventx-success">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="eventx-update-button"
              disabled={saving}
            >
              {saving
                ? "Updating event..."
                : "Save changes →"}
            </button>

          </form>

          <button
            className="eventx-events-button"
            onClick={() => navigate("/my-events")}
          >
            Back to My Events
          </button>

        </div>

      </main>
    </div>
  );
}

export default EditEvent;