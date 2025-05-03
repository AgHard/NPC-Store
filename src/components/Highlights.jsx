import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      "#title",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      ".carousel-wrapper",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  const fontFamily = "'Cairo', sans-serif";

  return (
    <section
      id="highlights"
      ref={sectionRef}
      style={{
        width: "100vw",
        backgroundColor: "#0f0f0f",
        padding: "6rem 1.5rem",
        overflow: "hidden",
        fontFamily,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          <h1
            id="title"
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              color: "#fff",
              opacity: 0,
              transform: "translateY(40px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            Discover Popular Games.
          </h1>

          {/* Optional animated links (commented out) */}
          {/* 
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <p className="link" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#FFD700", cursor: "pointer", opacity: 0 }}>
              Watch the film
              <img src={watchImg} alt="watch" style={{ width: "18px" }} />
            </p>
            <p className="link" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#FFD700", cursor: "pointer", opacity: 0 }}>
              Watch the event
              <img src={rightImg} alt="right" style={{ width: "18px" }} />
            </p>
          </div>
          */}
        </div>

        {/* Animated carousel container */}
        <div className="carousel-wrapper" style={{ opacity: 0, transform: "translateY(60px)" }}>
          <VideoCarousel />
        </div>
      </div>
    </section>
  );
};

export default Highlights;
