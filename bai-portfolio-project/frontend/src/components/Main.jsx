import React, { useEffect } from "react";
import { StrictMode } from "react";
import App from "../App";
import AOS from "aos";
import { ThemeProvider } from "../contexts/ThemeProvider";

export default function Main() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
      offset: 100
    });
  }, []);

  return (
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  );
}