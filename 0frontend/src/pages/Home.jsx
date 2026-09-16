import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="eventx-home">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .eventx-home {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 80% 15%,
              rgba(99, 102, 241, 0.18),
              transparent 28%
            ),
            radial-gradient(
              circle at 15% 75%,
              rgba(20, 184, 166, 0.12),
              transparent 25%
            ),
            #080b14;
          color: #ffffff;
          font-family: "DM Sans", sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* =========================
           NAVBAR
        ========================= */

        .eventx-navbar {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 26px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 10;
        }

        .eventx-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          background: none;
          border: none;
          color: white;
          font-family: "Space Grotesk", sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          padding: 0;
        }

        .eventx-logo-mark {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.35);
          font-size: 1rem;
        }

        .eventx-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .eventx-nav-btn {
          border: none;
          background: transparent;
          color: #a7aec2;
          padding: 10px 16px;
          border-radius: 9px;
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .eventx-nav-btn:hover {
          color: #ffffff;
          background: rgba(255,255,255,0.06);
        }

        .eventx-nav-login {
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
        }

        /* =========================
           HERO
        ========================= */

        .eventx-hero {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 90px 28px 70px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .eventx-hero-content {
          animation: eventx-fade-up 0.7s ease both;
        }

        .eventx-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border: 1px solid rgba(129, 140, 248, 0.25);
          background: rgba(99, 102, 241, 0.08);
          color: #a5b4fc;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .eventx-eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow: 0 0 12px #818cf8;
        }

        .eventx-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(3.4rem, 7vw, 6.6rem);
          line-height: 0.98;
          letter-spacing: -0.055em;
          margin: 0;
          max-width: 760px;
        }

        .eventx-title-gradient {
          background: linear-gradient(
            100deg,
            #ffffff 10%,
            #a5b4fc 48%,
            #67e8f9 90%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .eventx-description {
          max-width: 620px;
          margin: 28px 0 0;
          color: #9da6bb;
          font-size: 1.08rem;
          line-height: 1.75;
        }

        .eventx-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 34px;
        }

        .eventx-main-btn {
          border: none;
          padding: 14px 22px;
          border-radius: 11px;
          font-family: inherit;
          font-size: 0.94rem;
          font-weight: 700;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            opacity 0.2s ease;
        }

        .eventx-main-btn:hover {
          transform: translateY(-2px);
        }

        .eventx-main-btn:active {
          transform: translateY(0);
        }

        .eventx-primary {
          color: white;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          box-shadow: 0 12px 30px rgba(99, 102, 241, 0.3);
        }

        .eventx-primary:hover {
          box-shadow: 0 16px 35px rgba(99, 102, 241, 0.4);
        }

        .eventx-secondary {
          color: #e5e7eb;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .eventx-secondary:hover {
          background: rgba(255,255,255,0.09);
        }

        /* =========================
           EVENT VISUAL
        ========================= */

        .eventx-visual {
          min-height: 430px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: eventx-fade-up 0.7s 0.12s ease both;
        }

        .eventx-orbit {
          position: absolute;
          width: 390px;
          height: 390px;
          border-radius: 50%;
          border: 1px solid rgba(129, 140, 248, 0.13);
        }

        .eventx-orbit::before {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #67e8f9;
          box-shadow: 0 0 25px #67e8f9;
          top: 35px;
          right: 42px;
        }

        .eventx-card {
          width: min(360px, 90%);
          background: rgba(20, 24, 38, 0.9);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 22px;
          padding: 22px;
          position: relative;
          z-index: 2;
          box-shadow:
            0 30px 80px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.05);
          transform: rotate(3deg);
        }

        .eventx-card-top {
          height: 180px;
          border-radius: 15px;
          background:
            linear-gradient(
              135deg,
              rgba(99,102,241,0.9),
              rgba(14,165,233,0.7)
            );
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }

        .eventx-card-top::before,
        .eventx-card-top::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
        }

        .eventx-card-top::before {
          width: 190px;
          height: 190px;
          top: -90px;
          right: -40px;
        }

        .eventx-card-top::after {
          width: 120px;
          height: 120px;
          bottom: -65px;
          left: -30px;
        }

        .eventx-card-label {
          position: relative;
          z-index: 2;
          padding: 6px 10px;
          border-radius: 7px;
          background: rgba(0,0,0,0.2);
          backdrop-filter: blur(8px);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .eventx-card-body {
          padding: 20px 3px 4px;
        }

        .eventx-card-title {
          margin: 0;
          font-family: "Space Grotesk", sans-serif;
          font-size: 1.45rem;
        }

        .eventx-card-meta {
          display: flex;
          gap: 18px;
          margin-top: 12px;
          color: #929bb0;
          font-size: 0.8rem;
        }

        .eventx-card-footer {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .eventx-price {
          font-weight: 700;
          color: #ffffff;
        }

        .eventx-spots {
          color: #67e8f9;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .eventx-floating {
          position: absolute;
          z-index: 4;
          padding: 12px 15px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(16,20,32,0.85);
          backdrop-filter: blur(14px);
          border-radius: 12px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.35);
        }

        .eventx-floating-one {
          left: 0;
          top: 65px;
        }

        .eventx-floating-two {
          right: 0;
          bottom: 75px;
        }

        .eventx-floating-title {
          font-size: 0.72rem;
          color: #7f8aa2;
        }

        .eventx-floating-value {
          margin-top: 3px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        /* =========================
           BOTTOM FEATURES
        ========================= */

        .eventx-features {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 10px 28px 50px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          position: relative;
          z-index: 3;
        }

        .eventx-feature {
          padding: 20px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
          border-radius: 14px;
          transition: 0.2s ease;
        }

        .eventx-feature:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.045);
          border-color: rgba(255,255,255,0.12);
        }

        .eventx-feature-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(99,102,241,0.12);
          color: #a5b4fc;
          margin-bottom: 14px;
        }

        .eventx-feature h3 {
          margin: 0;
          font-size: 0.92rem;
          font-weight: 700;
        }

        .eventx-feature p {
          margin: 6px 0 0;
          color: #7f899f;
          font-size: 0.8rem;
          line-height: 1.5;
        }

        /* =========================
           BACKGROUND DETAILS
        ========================= */

        .eventx-grid {
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
          background-size: 60px 60px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 80%
          );
          pointer-events: none;
        }

        @keyframes eventx-fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .eventx-hero {
            grid-template-columns: 1fr;
            padding-top: 60px;
          }

          .eventx-visual {
            min-height: 360px;
          }

          .eventx-features {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .eventx-navbar {
            padding: 20px 18px;
          }

          .eventx-nav-btn {
            padding: 8px 10px;
          }

          .eventx-hero {
            padding: 45px 18px 35px;
          }

          .eventx-title {
            font-size: clamp(3rem, 15vw, 4.5rem);
          }

          .eventx-description {
            font-size: 0.95rem;
          }

          .eventx-visual {
            min-height: 320px;
          }

          .eventx-orbit {
            width: 300px;
            height: 300px;
          }

          .eventx-floating-one {
            left: -5px;
          }

          .eventx-floating-two {
            right: -5px;
          }

          .eventx-features {
            padding-left: 18px;
            padding-right: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .eventx-hero-content,
          .eventx-visual {
            animation: none;
          }
        }
      `}</style>

      <div className="eventx-grid" aria-hidden="true" />

      {/* NAVBAR */}
      <nav className="eventx-navbar">
        <button
          className="eventx-logo"
          onClick={() => navigate("/")}
        >
          <span className="eventx-logo-mark">X</span>
          EventX
        </button>

        <div className="eventx-nav-actions">
          <button
            className="eventx-nav-btn"
            onClick={() => navigate("/events")}
          >
            Browse Events
          </button>

          <button
            className="eventx-nav-btn eventx-nav-login"
            onClick={() => navigate("/login")}
          >
            Organizer Login
          </button>
        </div>
      </nav>

      {/* HERO */}
      <main className="eventx-hero">
        <section className="eventx-hero-content">
          <div className="eventx-eyebrow">
            <span className="eventx-eyebrow-dot" />
            Your next experience starts here
          </div>

          <h1 className="eventx-title">
            Find events
            <br />
            <span className="eventx-title-gradient">
              worth remembering.
            </span>
          </h1>

          <p className="eventx-description">
            Discover workshops, conferences, hackathons, meetups
            and experiences happening around you. Find your event,
            reserve your seat and make it count.
          </p>

        <div className="eventx-nav-actions">
  <button
    className="eventx-nav-btn eventx-nav-login"
    onClick={() => navigate("/login")}
  >
    Organizer Login
  </button>
</div>
        </section>

        {/* VISUAL */}
        <section className="eventx-visual">
          <div className="eventx-orbit" aria-hidden="true" />

          <div className="eventx-floating eventx-floating-one">
            <div className="eventx-floating-title">
              UPCOMING
            </div>
            <div className="eventx-floating-value">
              24+ events
            </div>
          </div>

          <div className="eventx-floating eventx-floating-two">
            <div className="eventx-floating-title">
              REGISTRATION
            </div>
            <div className="eventx-floating-value">
              Quick & secure
            </div>
          </div>

          <div className="eventx-card">
            <div className="eventx-card-top">
              <span className="eventx-card-label">
                Featured Event
              </span>
            </div>

            <div className="eventx-card-body">
              <h2 className="eventx-card-title">
                Future Tech Summit
              </h2>

              <div className="eventx-card-meta">
                <span>📅 Oct 18</span>
                <span>📍 Campus Hall</span>
              </div>

              <div className="eventx-card-footer">
                <span className="eventx-price">
                  ₹499
                </span>

                <span className="eventx-spots">
                  Seats available
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FEATURES */}
      <section className="eventx-features">
        <div className="eventx-feature">
          <div className="eventx-feature-icon">◈</div>
          <h3>Discover events</h3>
          <p>
            Explore different events and find something
            that matches your interests.
          </p>
        </div>

        <div className="eventx-feature">
          <div className="eventx-feature-icon">✓</div>
          <h3>Simple registration</h3>
          <p>
            Register in a few steps and secure your
            place without unnecessary complexity.
          </p>
        </div>

        <div className="eventx-feature">
          <div className="eventx-feature-icon">⌁</div>
          <h3>Run your own event</h3>
          <p>
            Organizers can create, manage and track
            their events from one place.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;