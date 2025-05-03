import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "#000000", // Dark space background
      },
    },
    particles: {
      number: {
        value: 150, // Increase the number for a denser look
        density: {
          enable: true,
          value_area: 1000,
        },
      },
      shape: {
        type: "circle", // Smoke effect usually looks like soft circles
      },
      opacity: {
        value: 0.7, // Higher opacity for denser particles
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.2,
        },
      },
      size: {
        value: 5,
        random: true,
        animation: {
          enable: true,
          speed: 10,
          minimumValue: 2,
        },
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
        attract: {
          enable: false,
        },
      },
      links: {
        enable: false, // No linking to keep the smoke look
      },
      tilt: {
        enable: true,
        value: 5,
        random: true,
        animation: {
          enable: true,
          speed: 10,
          minimumValue: 0.5,
        },
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse", // Particles move away from the cursor
        },
        onclick: {
          enable: true,
          mode: "push", // Push particles on click
        },
      },
      mouse: {
        distance: 100, // Adjust the distance for better interaction
      },
    },
    retina_detect: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default ParticlesBackground;
