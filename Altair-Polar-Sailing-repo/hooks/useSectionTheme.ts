"use client";

import { useEffect } from "react";

export default function useSectionTheme() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section-theme]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target) return;
        const theme = visible.target.getAttribute("data-section-theme");
        if (theme) document.body.setAttribute("data-section-theme", theme);
      },
      { threshold: [0.2, 0.4, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
}
