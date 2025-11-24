"use client";

import React, { useState } from "react";
import { useAudioExperience } from "../context/AudioExperienceContext";
import { ChapterList } from "./ChapterList";
import { LinesCaptionsIcon, WordCaptionsIcon } from "./PlayerIcons";

type TranscriptDisplayMode = "line" | "word";

const toggleButtonStyle = (isActive: boolean): React.CSSProperties => ({
  paddingTop: "2px",
  paddingBottom: "2px",
  borderRadius: 999,
  border: "none",
  background: "transparent",
  color: isActive ? "var(--audio-caption-button-text-active)" : "var(--audio-caption-button-text)",
  fontSize: 13,
  cursor: "pointer",
  transition: "all 0.2s ease",
  fontFamily: "inherit",
});

const toggleContainerStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 20,
};

export const ChaptersCaptionsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { transcriptDisplayMode, setTranscriptDisplayMode } = useAudioExperience();

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("chapters-captions-menu-open");
    } else {
      document.body.classList.remove("chapters-captions-menu-open");
    }
  }, [isOpen]);

  React.useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const modeOptions = [
    { value: "line" as const, label: "Line captions", Icon: LinesCaptionsIcon },
    { value: "word" as const, label: "Word captions", Icon: WordCaptionsIcon },
  ];

  const menuOverlayStyle: React.CSSProperties = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isDark ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 235, 0.9)",
    zIndex: 900,
    animation: isOpen ? "fadeIn 0.3s ease-out" : undefined,
  };

  const menuContentStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: "auto",
    bottom: 0,
    width: "min(100%, 320px)",
    backgroundColor: "transparent",
    zIndex: 901,
    flexDirection: "column",
    padding: "24px",
    gap: "12px",
    overflow: "auto",
    color: "var(--audio-text)",
    boxShadow: "none",
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease-out",
  } as React.CSSProperties;

  const closeButtonStyle: React.CSSProperties = {
    position: "fixed",
    top: "16px",
    left: "24px",
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "var(--audio-text)",
    padding: 0,
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6,
    transition: "opacity 0.2s ease",
    zIndex: 902,
  };

  const menuButtonStyle: React.CSSProperties = {
    position: "fixed",
    top: "16px",
    left: "24px",
    zIndex: 50,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    color: isDark ? "white" : "black",
    opacity: 1,
    transition: "opacity 0.2s ease",
  };

  const sectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const captionsSectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "48px",
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 600,
    opacity: 0.6,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Menu Button - visible only on lg and below */}
      <button
         type="button"
         onClick={() => setIsOpen(true)}
        style={isOpen ? { ...menuButtonStyle, display: "none" } : menuButtonStyle}
         className="flex lg:hidden"
        aria-label="Open chapters and captions menu"
        title="Chapters & Captions"
       >
        <svg
           width="20"
           height="16"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           strokeWidth="1.5"
           strokeLinecap="round"
           strokeLinejoin="round"
         >
           <line x1="-6" y1="6" x2="30" y2="6" />
           <line x1="-6" y1="18" x2="30" y2="18" />
         </svg>
      </button>

      {/* Menu Overlay - visible only on lg and below */}
      <div
        style={menuOverlayStyle}
        onClick={() => setIsOpen(false)}
        role="presentation"
        className="lg:hidden"
      />

      {/* Menu Content - visible only on lg and below */}
      <div style={menuContentStyle} className="lg:hidden flex">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          style={closeButtonStyle}
          onMouseEnter={(e) => {
            const svg = e.currentTarget.querySelector("svg");
            if (svg) svg.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            const svg = e.currentTarget.querySelector("svg");
            if (svg) svg.style.opacity = "0.6";
          }}
          aria-label="Close menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="-6" y1="-6" x2="30" y2="30" />
            <line x1="30" y1="-6" x2="-6" y2="30" />
          </svg>
        </button>

        {/* Captions Section */}
        <div style={captionsSectionStyle}>
          <div style={toggleContainerStyle}>
            {modeOptions.map((mode) => {
              const isActive = transcriptDisplayMode === mode.value;
              return (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => setTranscriptDisplayMode(mode.value)}
                  className="px-7 lg:px-3 xl:px-7"
                  style={{
                    ...toggleButtonStyle(isActive),
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    height: 40,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--audio-caption-button-text-hover)";
                    const svg = e.currentTarget.querySelector("svg");
                    if (svg) svg.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive ? "var(--audio-caption-button-text-active)" : "var(--audio-caption-button-text)";
                    const svg = e.currentTarget.querySelector("svg");
                    if (svg) svg.style.opacity = isActive ? "1" : "0.5";
                  }}
                  aria-pressed={isActive}
                  title={mode.label}
                >
                  <mode.Icon style={{ opacity: isActive ? 1 : 0.5 }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Chapters Section */}
        <div style={sectionStyle}>
          <ChapterList className="flex flex-col gap-2" title="" />
        </div>
      </div>
    </>
  );
};
