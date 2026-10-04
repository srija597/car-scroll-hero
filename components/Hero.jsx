"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const headline = "WELCOME ITZFIZZ";

const statCards = [
  { value: "58%", text: "Increase in pick up point use", tone: "lime" },
  { value: "27%", text: "Increase in pick up point use", tone: "ink" },
  { value: "23%", text: "Decreased in customer phone calls", tone: "blue" },
  { value: "40%", text: "Decreased in customer phone calls", tone: "orange" },
];

function StatCard({ value, text, tone }) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <strong>{value}</strong>
      <p>{text}</p>
    </article>
  );
}

export default function Hero() {
  const rootRef = useRef(null);
  const carRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const car = carRef.current;
      const trail = root.querySelector(".road__trail");
      const letters = root.querySelectorAll(".letter");
      const cards = root.querySelectorAll(".stat-card");
      const topStats = root.querySelector(".stats--top");
      const bottomStats = root.querySelector(".stats--bottom");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(trail, { scaleX: 1 });
        gsap.set(car, { x: () => window.innerWidth - car.offsetWidth * 0.32 });
        gsap.set([...letters, ...cards], { opacity: 1, y: 0 });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(trail, { scaleX: 0.05, transformOrigin: "left center" });
        gsap.set(letters, { y: 60, opacity: 0 });
        gsap.set(cards, { y: 40, opacity: 0 });

        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro.to(letters, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
        });
        // Cards stay hidden at the opening frame and enter with the scroll reveal.
        // Pin the hero for a long, reversible drive through the scene.
        const drive = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        // The headline is dark on the road; the advancing green layer reveals it.
        drive
          .to(trail, { scaleX: 1, ease: "none" }, 0)
          .to(
            car,
            {
              x: () => window.innerWidth - car.offsetWidth * 0.32,
              ease: "none",
            },
            0,
          )
          .to(topStats, { y: -30, ease: "none" }, 0)
          .to(bottomStats, { y: 30, ease: "none" }, 0)
          .to(cards, { y: 0, opacity: 1, stagger: 0.04, ease: "none" }, 0.12);
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <main className="hero" ref={rootRef}>
      <div className="stats stats--top" aria-label="Service improvements">
        {statCards.slice(0, 2).map((card) => (
          <StatCard key={card.value} {...card} />
        ))}
      </div>

      <div className="road" aria-hidden="true">
        <div className="road__trail" />
        <h1 className="road__headline" aria-label={headline}>
          {headline.split("").map((letter, index) => (
            <span className={`letter${letter === " " ? " letter--space" : ""}`} key={`${letter}-${index}`}>
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </h1>
        <Image
          className="car"
          ref={carRef}
          src="/car-scroll-hero/car.png"
          alt=""
          width={3981}
          height={1901}
          priority
          unoptimized
        />
      </div>

      <div className="stats stats--bottom" aria-label="Customer support improvements">
        {statCards.slice(2).map((card) => (
          <StatCard key={card.value} {...card} />
        ))}
      </div>
    </main>
  );
}