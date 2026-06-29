"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const WEDDING_DATE = new Date("2026-08-08T18:00:00");

function getTimeLeft() {
  const diff = WEDDING_DATE - new Date();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Wedding() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef(null);
  // const videoRef = useRef(null);
  const [startIntro, setStartIntro] = useState(false);

  useEffect(() => {
    setTime(getTimeLeft());

    const id = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(id);
  }, []);

useEffect(() => {
  if (!startIntro) return;

  const audio = audioRef.current;

  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0.8;
    audio.play().catch((err) => {
      console.log("Audio blocked:", err);
    });
  }

  const timer = setTimeout(() => {
    setShowIntro(false);
  }, 4300);

  return () => {
    clearTimeout(timer);
  };
}, [startIntro]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <>
    <audio ref={audioRef} src="/images/AU.mp3" preload="auto" loop />
      {/* ── Hero Section ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        {/* video */}
        {!startIntro && showIntro && (
  <button
    onClick={() => setStartIntro(true)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 999999,
      background: "#f7f0e8",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      cursor: "pointer",
    }}
  >
    <img
      src="/images/opening.jpg"
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "absolute",
        inset: 0,
      }}
    />

    <span
      style={{
        position: "relative",
        zIndex: 2,
        fontFamily: "var(--font-cookie), cursive",
        fontSize: "0.75rem",
        letterSpacing: "0.25em",
        color: "#6a5a4a",
        background: "rgba(255,255,255,0.65)",
        padding: "12px 18px",
        borderRadius: "999px",
      }}
    >
      TAP TO OPEN
    </span>
  </button>
)}

{startIntro && showIntro && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100vh",
      zIndex: 99999,
      overflow: "hidden",
      background: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
    }}
  >
    <img
      src="/images/opening.gif"
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  </div>
)}
        {/* Background image */}
        <Image
          src="/images/hero.jpg"
          alt="hero background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />

        {/* Left vase */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "clamp(65px, 17vw, 130px)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <Image
            src="/images/vase-left-DfaX_fU4.png"
            alt=""
            width={130}
            height={210}
            style={{
              objectFit: "contain",
              objectPosition: "bottom left",
              display: "block",
            }}
          />
        </div>

        {/* Right vase (mirrored) */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "clamp(65px, 17vw, 130px)",
            pointerEvents: "none",
            zIndex: 2,
            transform: "scaleX(-1)",
          }}
        >
          <Image
            src="/images/vase-left-DfaX_fU4.png"
            alt=""
            width={130}
            height={210}
            style={{
              objectFit: "contain",
              objectPosition: "bottom left",
              display: "block",
            }}
          />
        </div>

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "clamp(2.5rem, 7vw, 4rem) clamp(2rem, 6vw, 3rem) 0",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Bismillah */}
          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(1rem, 3vw, 1.4rem)",
              color: "#5a4a3a",
              direction: "rtl",
              marginBottom: "0.4rem",
              lineHeight: 1.8,
            }}
          >
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          {/* Nikkah Ceremony label */}
          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              letterSpacing: "0.22em",
              color: "#8a7a6a",
              marginBottom: "1.2rem",
            }}
          >
            NIKKAH CEREMONY · 2026
          </p>

          {/* Monogram */}
          <div style={{ marginBottom: "0.8rem" }}>
            <Image
              src="/images/logo-1.png"
              alt="monogram"
              width={80}
              height={80}
              style={{
                objectFit: "contain",
                margin: "0 auto",
                display: "block",
              }}
            />
          </div>

          {/* Couple names */}
          {/* <h1
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(2.8rem, 9vw, 5rem)",
              color: "#3c3228",
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: "1.2rem",
            }}
          >
            Rafey &amp; Minahil
          </h1> */}
          <div className="mb-5 flex flex-col items-center justify-center gap-3 md:flex-row md:items-start md:gap-6">
            {/* Rafey */}
            <div className="flex flex-col items-center gap-1">
              <h1
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(2.8rem, 25vw, 5rem)",
                  color: "#3c3228",
                  fontWeight: 400,
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                Rafey
              </h1>

              <p
                className="text-center  text-[19px] font-medium tracking-[0.14em] text-[#3c3228]/80 md:text-[16px]"
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  wordSpacing: "0.08em",
                }}
              >
                S/o Mr. &amp; Mrs. Faisal Azhar
              </p>
            </div>

            {/* & */}
            <h1
              className="md:mt-0"
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(2.8rem, 9vw, 5rem)",
                color: "#3c3228",
                fontWeight: 400,
                lineHeight: 1,
                margin: 0,
              }}
            >
              &amp;
            </h1>

            {/* Minahil */}
            <div className="flex flex-col items-center gap-1">
              <h1
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(2.8rem, 25vw, 5rem)",
                  color: "#3c3228",
                  fontWeight: 400,
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                Minahil
              </h1>

              <p
                className="text-center text-[17px] font-medium tracking-[0.14em] text-[#3c3228]/80 md:text-[16px]"
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  wordSpacing: "0.08em",
                }}
              >
                &amp; D/o Mr. &amp; Mrs. Muhammad Shahzad Rafi
              </p>
            </div>
          </div>

          {/* Invitation text */}
          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              letterSpacing: "0.18em",
              color: "#6a5a4a",
              lineHeight: 1.9,
              textAlign: "center",
              textTransform: "uppercase",
              marginTop: "0.6rem",
              marginBottom: "2.6rem",
            }}
          >
            WE REQUEST THE PLEASURE OF YOUR COMPANY
            <br />
            TO CELEBRATE OUR EVENT ON
          </p>

          {/* Date display: JULY | 23 | 2026 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "0.4rem",
            }}
          >
            {/* JULY */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "1px",
                  background: "#8a7a6a",
                  marginBottom: "4px",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  letterSpacing: "0.2em",
                  color: "#6a5a4a",
                }}
              >
                AUGUST
              </p>
              <div
                style={{
                  width: "50px",
                  height: "1px",
                  background: "#8a7a6a",
                  marginTop: "4px",
                }}
              />
            </div>

            {/* 23 */}
            <p
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(3rem, 10vw, 5rem)",
                color: "#3c3228",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              8
            </p>

            {/* 2026 */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "1px",
                  background: "#8a7a6a",
                  marginBottom: "4px",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  letterSpacing: "0.2em",
                  color: "#6a5a4a",
                }}
              >
                2026
              </p>
              <div
                style={{
                  width: "50px",
                  height: "1px",
                  background: "#8a7a6a",
                  marginTop: "4px",
                }}
              />
            </div>
          </div>

          {/* THURSDAY */}
          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              letterSpacing: "0.25em",
              color: "#8a7a6a",
              marginBottom: "1.8rem",
            }}
          >
            SATURDAY
          </p>

          {/* TO BE HELD AT */}
          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              letterSpacing: "0.2em",
              color: "#6a5a4a",
              marginBottom: "0.4rem",
            }}
          >
            TO BE HELD AT
          </p>

          {/* Venue */}
          <h2
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
              color: "#3c3228",
              fontWeight: 400,
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Emerald Banquet Hall #8 Garrison Golf & Country Club, Lahore
          </h2>

          {/* Time */}
          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              letterSpacing: "0.2em",
              color: "#6a5a4a",
              marginBottom: "clamp(2rem, 6vw, 3.5rem)",
            }}
          >
            AT SEVEN O&apos; CLOCK IN THE EVENING
          </p>
        </div>

        {/* Keep scrolling */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            paddingBottom: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              letterSpacing: "0.25em",
              color: "#8a7a6a",
              marginBottom: "0.3rem",
            }}
          >
            KEEP SCROLLING
          </p>
          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              letterSpacing: "0.25em",
              color: "#8a7a6a",
              marginBottom: "0.5rem",
            }}
          >
            AND RSVP
          </p>
          <div style={{ fontSize: "1rem", color: "#8a7a6a" }}>↓</div>
        </div>
      </section>

      {/* ── Countdown Section ── */}
      <section
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f0e8",
          overflow: "hidden",
          padding: "clamp(2.5rem, 6vw, 4rem) 0",
        }}
      >
        {/* Left Pillar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "clamp(60px, 14vw, 130px)",
          }}
        >
          <Image
            src="/images/column-left-Deau9Trj.png"
            alt="left pillar"
            fill
            style={{ objectFit: "contain", objectPosition: "left center" }}
            priority
          />
        </div>

        {/* Right Pillar */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "clamp(60px, 14vw, 130px)",
          }}
        >
          <Image
            src="/images/column-right-DejZoXz8.png"
            alt="right pillar"
            fill
            style={{ objectFit: "contain", objectPosition: "right center" }}
            priority
          />
        </div>

        {/* Center Content */}
        <div
          style={{
            textAlign: "center",
            padding: "2rem clamp(80px, 16vw, 160px)",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(2.8rem, 8vw, 5rem)",
              color: "#3c3228",
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: "0.6rem",
            }}
          >
            Countdown
          </h1>

          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(0.9rem, 2.2vw, 1.05rem)",
              letterSpacing: "0.22em",
              color: "#7a6a5a",
              marginBottom: "clamp(1.5rem, 5vw, 3rem)",
            }}
          >
            UNTIL 08 AUGUST 2026
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Days */}
            <div
              style={{
                textAlign: "center",
                padding: "0 clamp(1rem, 3vw, 2.5rem)",
              }}
            >
              <div
                key={`days-${time.days}`}
                className="count-number"
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(3rem, 9vw, 5.5rem)",
                  color: "#3c3228",
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                {pad(time.days)}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  letterSpacing: "0.2em",
                  color: "#7a6a5a",
                  marginTop: "0.6rem",
                }}
              >
                DAYS
              </p>
            </div>

            <div
              style={{
                width: "1px",
                height: "clamp(50px, 10vw, 80px)",
                background: "#c4a882",
                flexShrink: 0,
              }}
            />

            {/* Hours */}
            <div
              style={{
                textAlign: "center",
                padding: "0 clamp(1rem, 3vw, 2.5rem)",
              }}
            >
              <div
                key={`hours-${time.hours}`}
                className="count-number"
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(3rem, 9vw, 5.5rem)",
                  color: "#3c3228",
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                {pad(time.hours)}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  letterSpacing: "0.2em",
                  color: "#7a6a5a",
                  marginTop: "0.6rem",
                }}
              >
                HOURS
              </p>
            </div>

            <div
              style={{
                width: "1px",
                height: "clamp(50px, 10vw, 80px)",
                background: "#c4a882",
                flexShrink: 0,
              }}
            />

            {/* Minutes */}
            <div
              style={{
                textAlign: "center",
                padding: "0 clamp(1rem, 3vw, 2.5rem)",
              }}
            >
              <div
                key={`minutes-${time.minutes}`}
                className="count-number"
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(3rem, 9vw, 5.5rem)",
                  color: "#3c3228",
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                {pad(time.minutes)}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  letterSpacing: "0.2em",
                  color: "#7a6a5a",
                  marginTop: "0.6rem",
                }}
              >
                MINUTES
              </p>
            </div>
            <div
              style={{
                width: "1px",
                height: "clamp(50px, 10vw, 80px)",
                background: "#c4a882",
                flexShrink: 0,
              }}
            />

            {/* Seconds */}
            <div
              style={{
                textAlign: "center",
                padding: "0 clamp(1rem, 3vw, 2.5rem)",
              }}
            >
              <div
                key={`seconds-${time.seconds}`}
                className="count-number"
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(3rem, 9vw, 5.5rem)",
                  color: "#3c3228",
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                {pad(time.seconds)}
              </div>

              <p
                style={{
                  fontFamily: "var(--font-cookie), cursive",
                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                  letterSpacing: "0.2em",
                  color: "#7a6a5a",
                  marginTop: "0.6rem",
                }}
              >
                SECONDS
              </p>
            </div>
          </div>

          <div style={{ marginTop: "clamp(1.5rem, 4vw, 2.5rem)" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#c4a882",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── The Celebrations Section ── */}
      <section
        style={{
          background: "#f2ece3",
          padding: "clamp(3rem, 8vw, 5rem) 1.5rem clamp(3rem, 8vw, 5rem)",
          textAlign: "center",
        }}
      >
        {/* Section Title */}
        {/* <h2
          style={{
            fontFamily: "var(--font-cookie), cursive",
            fontSize: "clamp(2.4rem, 7vw, 3.8rem)",
            color: "#3c3228",
            fontWeight: 400,
            marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          The Celebrations
        </h2> */}

        {/* Event Card */}
        <div
          style={{
            maxWidth: "400px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Yacht overlapping the card */}
          {/* <div
            style={{
              position: "relative",
              zIndex: 2,
              marginBottom: "-40px",
              padding: "0 1.5rem",
            }}
          >
            <Image
              src="/images/yacht-illustration-BxPtm2NZ.png"
              alt="yacht illustration"
              width={320}
              height={180}
              style={{
                objectFit: "contain",
                margin: "0 auto",
                display: "block",
              }}
            />
          </div> */}

          {/* Card */}
          {/* <div
            style={{
              background: "rgba(255, 252, 247, 0.85)",
              border: "1px solid #ddd5c4",
              borderRadius: "14px",
              padding:
                "clamp(3rem, 8vw, 4.5rem) clamp(1.5rem, 5vw, 2.5rem) clamp(1.5rem, 4vw, 2rem)",
              position: "relative",
              zIndex: 1,
            }}
          > */}
          {/* Event Type */}
          {/* <p
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(0.6rem, 1.6vw, 0.72rem)",
                letterSpacing: "0.2em",
                color: "#B76E79",
                marginBottom: "1.2rem",
                lineHeight: 1.6,
              }}
            >
              WELCOME CRUISE ON THE BOSPHORUS
            </p> */}

          {/* Venue Name Cursive 1 */}
          {/* <h3
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(2rem, 6vw, 2.8rem)",
                color: "#3c3228",
                fontWeight: 400,
                lineHeight: 1.1,
                marginBottom: "0.2rem",
              }}
            >
              Emerald Banquet Hall #8
            </h3> */}

          {/* Venue Name Cursive 2 */}
          {/* <h3
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(2rem, 6vw, 2.8rem)",
                color: "#3c3228",
                fontWeight: 400,
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Garrison Golf & Country Club
            </h3> */}

          {/* Location description */}
          {/* <p
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(0.7rem, 1.8vw, 0.82rem)",
                color: "#8a7f74",
                marginBottom: "1.4rem",
              }}
            >
              Departing from Emerald Banquet Hall #8 Garrison Golf & Country
              Club
            </p> */}

          {/* Divider */}
          {/* <div
              style={{
                width: "50px",
                height: "1px",
                background: "#c4a882",
                margin: "0 auto 1.4rem",
              }}
            /> */}

          {/* Date */}
          {/* <p
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(0.72rem, 1.8vw, 0.85rem)",
                color: "#7a6a5a",
                marginBottom: "0.5rem",
                letterSpacing: "0.05em",
              }}
            >
              08 AUGUST 2026
            </p> */}

          {/* Time */}
          {/* <p
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(1.6rem, 4.5vw, 2.2rem)",
                color: "#3c3228",
                fontWeight: 400,
                marginBottom: "1.6rem",
              }}
            >
              6:30 P.M
            </p> */}

          {/* View on Map */}
          {/* <a
              href="#"
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(0.6rem, 1.6vw, 0.72rem)",
                letterSpacing: "0.2em",
                color: "#B76E79",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              VIEW ON MAP
            </a> */}
          {/* </div> */}
        </div>

        {/* ── Wedding Card ── */}
        <div
          style={{
            maxWidth: "400px",
            margin: "clamp(2.5rem, 6vw, 4rem) auto 0",
            position: "relative",
          }}
        >
          {/* Hotel image overlapping the card */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              marginBottom: "-50px",
              padding: "0 1rem",
            }}
          >
            <Image
              src="/images/h3.png"
              alt="Emerald Banquet Hall #8 Garrison Golf & Country Club, Lahore"
              width={340}
              height={200}
              className="picture-float"
              style={{
                objectFit: "contain",
                margin: "0 auto",
                display: "block",
              }}
            />
          </div>

          {/* Card */}
          <div
            style={{
              background: "rgba(255, 252, 247, 0.85)",
              border: "1px solid #ddd5c4",
              borderRadius: "14px",
              padding:
                "clamp(3.5rem, 9vw, 5rem) clamp(1.5rem, 5vw, 2.5rem) clamp(1.5rem, 4vw, 2rem)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Event Type */}
            {/* <p
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(0.78rem, 1.9vw, 0.92rem)",
                letterSpacing: "0.28em",
                wordSpacing: "0.1em",
                color: "#B76E79",
                marginBottom: "1.2rem",
              }}
            >
              WEDDING
            </p> */}

            {/* Venue Name Cursive 1 */}
            <h3
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(2rem, 6vw, 2.5rem)",
                color: "#3c3228",
                fontWeight: 600,
                lineHeight: 1.1,
                marginBottom: "0.2rem",
              }}
            >
              Emerald Banquet Hall #8
            </h3>

            {/* Venue Name Cursive 2 */}
            <h3
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(2rem, 6vw, 2.5rem)",
                color: "#3c3228",
                fontWeight: 600,
                lineHeight: 1.1,
                marginBottom: "1.4rem",
              }}
            >
              Garrison Golf & Country Club, Lahore
            </h3>

            {/* Divider */}
            <div
              style={{
                width: "50px",
                height: "1px",
                background: "#c4a882",
                margin: "0 auto 1.4rem",
              }}
            />

            {/* Date */}
            <p
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(1rem, 2.4vw, 1.2rem)",
                color: "#7a6a5a",
                marginBottom: "0.5rem",
                letterSpacing: "0.12em",
                wordSpacing: "0.1em",
              }}
            >
              08 AUGUST 2026
            </p>

            {/* Time */}
            <p
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                color: "#3c3228",
                fontWeight: 400,
                marginBottom: "1.6rem",
                letterSpacing: "0.06em",
              }}
            >
              7:00 P.M
            </p>

            {/* View on Map */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Emerald%20Hall%20%238%2C%20Emerald%20Banquet%20Hall%20No%208%2C%20Garrison%20Golf%20%26%20Country%20Club%2C%20Saddar%20Town%2C%20Lahore%2C%20Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(0.78rem, 1.9vw, 0.92rem)",
                letterSpacing: "0.28em",
                wordSpacing: "0.1em",
                color: "#B76E79",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              VIEW ON MAP
            </a>
          </div>
        </div>
      </section>

      {/* ── Wedding Weekend Itinerary Section ── */}
      <section
        style={{
          position: "relative",
          background: "#f5f2eb",
          overflow: "hidden",
          textAlign: "center",
          padding: "0 0 clamp(3rem, 8vw, 5rem)",
        }}
      >
        {/* Left curtain */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "clamp(50px, 13vw, 110px)",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <Image
            src="/images/curtain-left-new-C9yBPbWK.png"
            alt=""
            fill
            className="curtain-wave curtain-wave-right"
            style={{ objectFit: "contain", objectPosition: "top left" }}
          />
        </div>

        {/* Right curtain (mirrored) */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "clamp(50px, 13vw, 110px)",
            height: "100%",
            pointerEvents: "none",
            transform: "scaleX(-1)",
          }}
        >
          <Image
            src="/images/curtain-left-new-C9yBPbWK.png"
            alt=""
            fill
            className="curtain-wave curtain-wave-left"
            style={{ objectFit: "contain", objectPosition: "top left" }}
          />
        </div>

        {/* Top crystal swag decoration */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "clamp(0rem, 0vw, 0rem) clamp(50px, 15vw, 130px) 0",
          }}
        >
          {/* Center curtain image */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "clamp(0rem, 0vw, 0rem)",
            }}
          >
            <Image
              src="/images/curtain-center-new-EwKr26ZU.png"
              alt="curtain center decoration"
              width={400}
              height={100}
              className="center-curtain-wave"
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Wedding Weekend heading */}
          <h2
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(2.2rem, 7vw, 3.5rem)",
              color: "#3c3228",
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: "0.8rem",
            }}
          >
            NIKKAH CEREMONY
          </h2>

        

          {/* Date range */}
          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(1rem, 2.4vw, 1.2rem)",
              color: "#7a6a5a",
              marginBottom: "clamp(2rem, 6vw, 3.5rem)",
              letterSpacing: "0.12em",
              wordSpacing: "0.1em",
            }}
          >
            08 AUGUST 2026
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(1.4rem, 2.4vw, 1.2rem)",
              color: "#8a7f74",
              fontStyle: "italic",
              lineHeight: 1.7,
              maxWidth: "300px",
              margin: "0 auto 1.2rem",
              wordSpacing: "0.1em",
            }}
          >
            Let’s celebrate the joyous moment of our families coming together at the Nikkah of our beloved children 
            <br/>
            <span style={{ fontSize: "1.4em", fontStyle: "normal", color: "#6b5c52" }}>Rafey &amp; Minahil</span>
          </p>

          {/* ── Timeline ── */}
          <div
            style={{
              maxWidth: "300px",
              margin: "clamp(1.5rem, 4vw, 2.5rem) auto 0",
              textAlign: "left",
              position: "relative",
              paddingLeft: "2rem",
            }}
          >
            Event Timeline 
            <div
              style={{
                position: "absolute",
                left: "5px",
                top: "8px",
                bottom: "8px",
                width: "1px",
                background: "#d4c8b8",
              }}
            />

            {[
              {
                time: "7:00 PM",
                label:
                  "Guest arrival",
              },
              {
                time: "7:30 npm",
                label: "Nikkah Cermony",
              },
              {
                time: "8:30 PM",
                label:
                  "Dinner ",
              },
               {
                time: "10:00 PM",
                label:
                  "Event concludes",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{ position: "relative", marginBottom: "1.8rem" }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-1.7rem",
                    top: "4px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#c4b8a4",
                    border: "1.5px solid #a89880",
                  }}
                />
                {/* Time */}
                <p
                  style={{
                    fontFamily: "var(--font-cookie), cursive",
                    fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
                    color: "#B76E79",
                    letterSpacing: "0.1em",
                    wordSpacing: "0.08em",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.time}
                </p>
                {/* Label */}
                <p
                  style={{
                    fontFamily: "var(--font-cookie), cursive",
                    fontSize: "clamp(1.05rem, 2.5vw, 1.2rem)",
                    color: "#3c3228",
                    lineHeight: 1.5,
                    wordSpacing: "0.08em",
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer Section ── */}
      <section
        style={{
          position: "relative",
          background: "#f2ece3",
          padding: "clamp(3rem, 8vw, 5rem) 0 clamp(2rem, 5vw, 3rem)",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Left vase */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "clamp(70px, 18vw, 140px)",
            pointerEvents: "none",
          }}
        >
          <Image
            src="/images/vase-left-DfaX_fU4.png"
            alt=""
            width={140}
            height={220}
            style={{
              objectFit: "contain",
              objectPosition: "bottom left",
              display: "block",
            }}
          />
        </div>

        {/* Right vase (mirrored) */}
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "clamp(70px, 18vw, 140px)",
            pointerEvents: "none",
            transform: "scaleX(-1)",
          }}
        >
          <Image
            src="/images/vase-left-DfaX_fU4.png"
            alt=""
            width={140}
            height={220}
            style={{
              objectFit: "contain",
              objectPosition: "bottom left",
              display: "block",
            }}
          />
        </div>

        {/* Center content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "0 clamp(100px, 22vw, 180px)",
          }}
        >
          {/* Monogram */}
          <div style={{ marginBottom: "1.2rem" }}>
            <Image
              src="/images/logo-1.png"
              alt="monogram"
              width={110}
              height={110}
              style={{
                objectFit: "contain",
                margin: "0 auto",
                display: "block",
              }}
            />
          </div>

          {/* Names */}
          {/* <h2
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(1.8rem, 5.5vw, 2.6rem)",
              color: "#3c3228",
              fontWeight: 400,
              marginBottom: "0.6rem",
              lineHeight: 1.2,
            }}
          >
            Rafey &amp; Minahil
          </h2> */}

          {/* Date */}
          <p
            style={{
              fontFamily: "var(--font-cookie), cursive",
              fontSize: "clamp(1rem, 2.4vw, 1.2rem)",
              color: "#7a6a5a",
              letterSpacing: "0.12em",
              wordSpacing: "0.1em",
              marginBottom: "clamp(2rem, 6vw, 3.5rem)",
            }}
          >
            08 AUGUST 2026
          </p>
          <div
            style={{
              maxWidth: "360px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(2rem, 6vw, 2.8rem)",
                color: "#3c3228",
                fontWeight: 600,
                marginBottom: "0.8rem",
                lineHeight: 1.2,
              }}
            >
              We&apos;d Love To See You
            </h3>

            <p
              style={{
                fontFamily: "var(--font-cookie), cursive",
                fontSize: "clamp(1.4rem, 2.4vw, 1.2rem)",
                color: "#7a6a5a",
                lineHeight: 1.8,
                marginBottom: "1.6rem",
                wordSpacing: "0.1em",
              }}
            >
              Your prayers and presence mean the world to us.<br/> Awaiting for your blessed presence
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <div>
                {/* <p
                  style={{
                    fontFamily: "var(--font-cookie), cursive",
                    fontSize: "1rem",
                    color: "#3c3228",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                  }}
                >
                  Faisal Azhar
                </p> */}
                <a
                  href="tel:+923214022085"
                  style={{
                    fontFamily: "var(--font-cookie), cursive",
                    fontSize: "0.82rem",
                    color: "#B76E79",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  0321-4022085
                </a>
              </div>

              <div>
                {/* <p
                  style={{
                    fontFamily: "var(--font-cookie), cursive",
                    fontSize: "1rem",
                    color: "#3c3228",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                  }}
                >
                  Mubashir Azhar
                </p> */}
                <a
                  href="tel:+923009489905"
                  style={{
                    fontFamily: "var(--font-cookie), cursive",
                    fontSize: "0.82rem",
                    color: "#B76E79",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  0300-9489905
                </a>
              </div>

              <div>
                {/* <p
                  style={{
                    fontFamily: "var(--font-cookie), cursive",
                    fontSize: "1rem",
                    color: "#3c3228",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                  }}
                >
                  Kashif Shafiq
                </p> */}
                <a
                  href="tel:+923233656591"
                  style={{
                    fontFamily: "var(--font-cookie), cursive",
                    fontSize: "0.82rem",
                    color: "#B76E79",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  0323-3656591
                </a>
              </div>
              <div>
                {/* <p
                  style={{
                    fontFamily: "var(--font-cookie), cursive",
                    fontSize: "1rem",
                    color: "#3c3228",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                  }}
                >
                  Irfan Shakeel
                </p> */}
                <a
                  href="tel:+923334422155"
                  style={{
                    fontFamily: "var(--font-cookie), cursive",
                    fontSize: "0.82rem",
                    color: "#B76E79",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  0333-4422155
                </a>
              </div>
            </div>
          </div>

          {/* Made with love */}
        </div>
      </section>

      <style jsx>{`
        @keyframes countdownPop {
          0% {
            transform: translateY(8px) scale(0.96);
            opacity: 0.4;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        .count-number {
          animation: countdownPop 0.35s ease;
        }

        @keyframes heroSlowZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }

        @keyframes softFloat {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -10px, 0) scale(1.02);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes pictureFloat {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(0, -8px, 0) rotate(0.7deg);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
        }

        @keyframes curtainWaveLeft {
          0% {
            transform: translate3d(0, 0, 0) skewX(0deg);
          }
          50% {
            transform: translate3d(-4px, 2px, 0) skewX(1.5deg);
          }
          100% {
            transform: translate3d(0, 0, 0) skewX(0deg);
          }
        }

        @keyframes curtainWaveRight {
          0% {
            transform: translate3d(0, 0, 0) skewX(0deg);
          }
          50% {
            transform: translate3d(4px, 2px, 0) skewX(-1.5deg);
          }
          100% {
            transform: translate3d(0, 0, 0) skewX(0deg);
          }
        }

        @keyframes centerCurtainWave {
          0% {
            transform: translateY(0) scaleX(1);
          }
          50% {
            transform: translateY(4px) scaleX(1.03);
          }
          100% {
            transform: translateY(0) scaleX(1);
          }
        }

        :global(.hero-bg-animate) {
          animation: heroSlowZoom 12s ease-in-out infinite alternate;
          will-change: transform;
        }

        :global(.soft-float) {
          animation: softFloat 4.5s ease-in-out infinite;
          will-change: transform;
        }

        :global(.picture-float) {
          animation: pictureFloat 5.5s ease-in-out infinite;
          will-change: transform;
        }

        :global(.curtain-wave) {
          transform-origin: top center;
          will-change: transform;
        }

        :global(.curtain-wave-left) {
          animation: curtainWaveLeft 4.5s ease-in-out infinite;
        }

        :global(.curtain-wave-right) {
          animation: curtainWaveRight 4.8s ease-in-out infinite;
        }

        :global(.center-curtain-wave) {
          animation: centerCurtainWave 5s ease-in-out infinite;
          transform-origin: top center;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.hero-bg-animate),
          :global(.soft-float),
          :global(.picture-float),
          :global(.curtain-wave-left),
          :global(.curtain-wave-right),
          :global(.center-curtain-wave),
          .count-number {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
