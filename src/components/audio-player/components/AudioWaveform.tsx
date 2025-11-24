"use client";

import React, { useCallback, useState } from "react";
import { useAudioExperience } from "../context/AudioExperienceContext";
import {
    PauseIcon,
    PlayIcon,
    SkipBackIcon,
    SkipForwardIcon,
    VolumeSpeakerIcon,
    VolumeSpeakerMutedIcon,
    VolumeWavesIcon,
} from "./PlayerIcons";
import { SegmentedTimeline } from "./SegmentedTimeline";

const SpeedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width={60} height={62} viewBox="0 0 60 62" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Speedometer/gauge style icon */}
        <circle cx="30" cy="30" r="24" stroke="currentColor" strokeWidth="4" fill="none" />
        <line x1="30" y1="6" x2="30" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="49" y1="30" x2="55" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Speed needle */}
        <line x1="30" y1="30" x2="42" y2="18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

export type AudioWaveformProps = {
    className?: string;
};

const baseContainerClassName = "pointer-events-auto";

const containerBaseStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "16px 24px 0 0",
    background: "transparent",
    color: "var(--audio-text)",
    position: "fixed",
    left: "50%",
    bottom: 24,
    transform: "translateX(-50%)",
    width: "min(960px, calc(100vw - 48px))",
    zIndex: 100,
};

const controlsRowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    gap: "12px",
    color: "var(--audio-text)",
};

const flexGroupStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

const iconButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    border: "none",
    background: "none",
    cursor: "pointer",
};

const disabledButtonStyle: React.CSSProperties = {
    ...iconButtonStyle,
    opacity: 0.5,
    cursor: "not-allowed",
};

const timeLabelStyle: React.CSSProperties = {
    background: "var(--audio-time-bg)",
    color: "var(--audio-text)",
    fontVariantNumeric: "tabular-nums",
    fontSize: 14,
    fontWeight: 600,
};

const ICON_SCALE = 0.35;

const iconDimensions = {
    volumeSpeaker: { width: 60, height: 62 },
    volumeMute: { width: 27, height: 52 },
    volumeWaves: { width: 31, height: 56 },
    skipBack: { width: 86, height: 68 },
    skipForward: { width: 87, height: 68 },
    play: { width: 102, height: 112 },
    pause: { width: 98, height: 112 },
} as const;

const scaledStyle = (width: number, height: number): React.CSSProperties => ({
    width: Math.round(width * ICON_SCALE),
    height: Math.round(height * ICON_SCALE),
});

const formatTime = (milliseconds: number) => {
    if (!Number.isFinite(milliseconds) || milliseconds < 0) return "0:00";
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const playbackSpeedButtonClass = "audio-speed-option";
const playbackSpeedButtonActiveClass = "audio-speed-option--active";

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
    className,
}) => {
    const {
        isReady,
        isPlaying,
        isMuted,
        volume,
        playbackRate,
        currentTimeMs,
        durationMs,
        chapters,
        config,
        togglePlayback,
        skipBySeconds,
        setVolume,
        toggleMute,
        setPlaybackRate,
        seekToMs,
        isTranscriptVisible,
        hasPlaybackStarted,
        play,
    } = useAudioExperience();

    // Must call all hooks before any conditional returns
    const [isVolumeHovered, setIsVolumeHovered] = useState(false);
    const [isSpeedModalOpen, setIsSpeedModalOpen] = useState(false);

    const isExpanded = isTranscriptVisible;
    const skipSeconds = config.skipIntervalSeconds;
    const disabled = !isReady;

    const volumeIconStyle = scaledStyle(iconDimensions.volumeSpeaker.width, iconDimensions.volumeSpeaker.height);
    const VolumeLevelIcon = VolumeWavesIcon;
    const volumeLevelStyle = scaledStyle(iconDimensions.volumeWaves.width, iconDimensions.volumeWaves.height);
    const skipBackStyle = scaledStyle(iconDimensions.skipBack.width, iconDimensions.skipBack.height);
    const skipForwardStyle = scaledStyle(iconDimensions.skipForward.width, iconDimensions.skipForward.height);
    const playPauseStyle = isPlaying
        ? scaledStyle(iconDimensions.pause.width, iconDimensions.pause.height)
        : scaledStyle(iconDimensions.play.width, iconDimensions.play.height);

    const handleVolumeChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const nextVolume = Number(event.target.value);
            if (Number.isNaN(nextVolume)) return;
            if (isMuted && nextVolume > 0) {
                toggleMute();
            }
            setVolume(nextVolume);
        },
        [isMuted, setVolume, toggleMute],
    );

    const handleMaxVolume = useCallback(() => {
        if (disabled) return;
        if (isMuted) {
            toggleMute();
        }
        setVolume(1);
    }, [disabled, isMuted, setVolume, toggleMute]);

    // Show initial play button if playback hasn't started (after all hooks are called)
    if (!hasPlaybackStarted) {
        const initialPlayButtonStyle: React.CSSProperties = {
            position: "fixed",
            left: "50%",
            bottom: 40,
            transform: "translateX(-50%)",
            zIndex: 100,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
        };

        const initialPlayIconStyle = scaledStyle(iconDimensions.play.width, iconDimensions.play.height);

        return (
            <div style={initialPlayButtonStyle} className="initial-play-button">
                <button
                    type="button"
                    onClick={play}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    aria-label="Start audio experience"
                >
                    <PlayIcon style={initialPlayIconStyle} aria-hidden="true" focusable="false" />
                </button>
            </div>
        );
    }

    const timeDisplay = `${formatTime(currentTimeMs)} / ${formatTime(durationMs)}`;

    const playbackRates = [1, 1.25, 1.5, 2];

    const playbackRateIndex = playbackRates.indexOf(playbackRate);

    const combinedClassName = [baseContainerClassName, "audio-player-shell", className]
        .filter(Boolean)
        .join(" ");

    const containerStyle: React.CSSProperties = {
        ...containerBaseStyle,
        background: "transparent",
        boxShadow: "none",
        gap: isExpanded ? "12px" : "0",
        paddingTop: isExpanded ? "16px" : "12px",
        paddingRight: isExpanded ? "0" : "20px",
        paddingBottom: "24px",
        paddingLeft: isExpanded ? "0" : "20px",
        transition: "padding 0.5s ease, gap 0.5s ease",
    };

    const controlsRowDynamicStyle: React.CSSProperties = {
        ...controlsRowStyle,
        justifyItems: "center",
        gridTemplateColumns: isExpanded ? "auto 1fr auto" : "1fr",
      };

    const expandableGroupStyle = (base: React.CSSProperties): React.CSSProperties => ({
        ...base,
        transition: "opacity 0.5s ease",
        opacity: isExpanded ? 1 : 0,
        pointerEvents: isExpanded ? "auto" : "none",
    });

    const transportGroupBaseStyle: React.CSSProperties = {
        ...flexGroupStyle,
        justifySelf: "center",
    };

    const skipButtonSlotWidth = Math.max(
        typeof skipBackStyle.width === "number" ? skipBackStyle.width : 0,
        typeof skipForwardStyle.width === "number" ? skipForwardStyle.width : 0,
    );

    const skipButtonSlotStyle = (expanded: boolean): React.CSSProperties => ({
        width: skipButtonSlotWidth,
        opacity: expanded ? 1 : 0,
        pointerEvents: expanded ? "auto" : "none",
        transition: "opacity 0.5s ease",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
    });

    const composeButtonStyle = (extra?: React.CSSProperties): React.CSSProperties => (
        disabled ? { ...disabledButtonStyle, ...extra } : { ...iconButtonStyle, ...extra }
    );

    const renderPlayToggle = () => (
        <button
            type="button"
            onClick={togglePlayback}
            disabled={disabled}
            style={composeButtonStyle()}
            className="audio-player-shell__play-button"
            aria-label={isPlaying ? "Pause" : "Play"}
        >
            {isPlaying ? (
                <PauseIcon style={playPauseStyle} aria-hidden="true" focusable="false" />
            ) : (
                <PlayIcon style={playPauseStyle} aria-hidden="true" focusable="false" />
            )}
        </button>
    );

    const renderSkipButton = (direction: "back" | "forward") => {
        const isBack = direction === "back";
        const onClick = () => skipBySeconds(isBack ? -skipSeconds : skipSeconds);
        const ariaLabel = isBack
            ? `Skip backward ${skipSeconds} seconds`
            : `Skip forward ${skipSeconds} seconds`;
        const icon = isBack ? <SkipBackIcon style={skipBackStyle} aria-hidden="true" focusable="false" /> : (
            <SkipForwardIcon style={skipForwardStyle} aria-hidden="true" focusable="false" />
        );

        return (
            <div className="audio-player-shell__skip-slot" style={skipButtonSlotStyle(isExpanded)}>
                <button
                    type="button"
                    onClick={onClick}
                    disabled={disabled}
                    style={composeButtonStyle()}
                    className="audio-player-shell__skip-button"
                    aria-label={ariaLabel}
                >
                    {icon}
                </button>
            </div>
        );
    };

    return (
        <div
            className={combinedClassName}
            style={containerStyle}
            data-expanded={isExpanded ? "true" : "false"}
        >
            {/* Time display */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "8px",
                opacity: isExpanded ? 1 : 0,
                transition: "opacity 0.5s ease",
                pointerEvents: isExpanded ? "auto" : "none"
            }}>
                <span style={timeLabelStyle}>{timeDisplay}</span>
            </div>

            {/* Segmented Timeline - appears above controls when expanded */}
            {isExpanded && (
                <SegmentedTimeline
                    chapters={chapters}
                    currentTimeMs={currentTimeMs}
                    durationMs={durationMs}
                    onSeek={seekToMs}
                    disabled={disabled}
                    className="audio-player-shell__timeline"
                />
            )}

            <div className="audio-player-shell__controls" style={{ ...controlsRowDynamicStyle, background: "transparent" }}>
               <div
                 className="!hidden sm:!flex"
                 onMouseEnter={() => setIsVolumeHovered(true)}
                 onMouseLeave={() => setIsVolumeHovered(false)}
                 style={{
                   ...flexGroupStyle,
                   justifySelf: "start",
                   gap: 12,
                   minWidth: "205px",
                   opacity: isExpanded ? 1 : 0,
                   pointerEvents: isExpanded ? "auto" : "none",
                   transition: "opacity 0.5s ease",
                   cursor: "pointer",
                   position: "relative",
                   zIndex: 50
                 }}
               >
                    {/* Volume controls */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12
                        }}
                    >
                        <button
                            type="button"
                            onClick={toggleMute}
                            disabled={disabled}
                            style={{ ...composeButtonStyle(), opacity: isVolumeHovered ? 1 : 0.5 }}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? (
                                <VolumeSpeakerMutedIcon style={volumeIconStyle} aria-hidden="true" focusable="false" />
                            ) : (
                                <VolumeSpeakerIcon style={volumeIconStyle} aria-hidden="true" focusable="false" />
                            )}
                        </button>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            disabled={disabled}
                            className="audio-slider audio-slider--volume"
                            style={{
                                width: isVolumeHovered ? "140px" : "0",
                                opacity: isVolumeHovered ? 1 : 0,
                                overflow: "hidden",
                                color: "var(--audio-text)",
                                transition: "opacity 0.3s ease, width 0.3s ease",
                                position: "relative",
                                zIndex: 50,
                                // @ts-expect-error - CSS custom property
                                "--volume-percent": `${(isMuted ? 0 : volume) * 100}%`
                            }}
                            aria-label="Volume"
                        />
                        <button
                            type="button"
                            onClick={handleMaxVolume}
                            disabled={disabled}
                            style={{
                                ...composeButtonStyle(),
                                opacity: isVolumeHovered ? 1 : 0,
                                width: isVolumeHovered ? "auto" : "0",
                                overflow: "hidden",
                                transition: "opacity 0.3s ease, width 0.3s ease",
                                position: "relative",
                                zIndex: 50
                            }}
                            aria-label="Max volume"
                        >
                            <VolumeLevelIcon style={volumeLevelStyle} aria-hidden="true" focusable="false" />
                        </button>
                    </div>
                </div>

                <div
                    className="audio-player-shell__transport"
                    style={{ ...transportGroupBaseStyle, gap: 16 }}
                >
                    {renderSkipButton("back")}
                    {renderPlayToggle()}
                    {renderSkipButton("forward")}
                </div>

                {/* Speed controls - full width version (hidden on mobile) */}
                <div
                  className="audio-player-shell__speed-group !hidden sm:!flex"
                  style={{
                    justifySelf: "end",
                    justifyContent: "flex-end",
                    gap: "8px",
                    minWidth: "205px",
                    transition: "opacity 0.5s ease",
                    opacity: isExpanded ? 1 : 0,
                    pointerEvents: isExpanded ? "auto" : "none",
                  }}
                >
                    {playbackRates.map((rate, index) => {
                        const isActive = index === playbackRateIndex;
                        const buttonClassName = isActive
                            ? `${playbackSpeedButtonClass} ${playbackSpeedButtonActiveClass}`
                            : playbackSpeedButtonClass;

                        return (
                            <button
                                key={rate}
                                type="button"
                                onClick={() => setPlaybackRate(rate)}
                                className={buttonClassName}
                                aria-pressed={isActive}
                                disabled={disabled}
                            >
                                {rate.toFixed(rate % 1 === 0 ? 0 : 2)}x
                            </button>
                        );
                    })}
                </div>

                {/* Speed icon button (visible only on mobile) */}
                <div
                  className="!flex sm:!hidden"
                  style={{
                    justifySelf: "end",
                    justifyContent: "flex-end",
                    transition: "opacity 0.5s ease",
                    opacity: isExpanded ? 1 : 0,
                    pointerEvents: isExpanded ? "auto" : "none",
                  }}
                >
                    <button
                        type="button"
                        onClick={() => setIsSpeedModalOpen(true)}
                        disabled={disabled}
                        style={composeButtonStyle({ opacity: isExpanded ? 0.6 : 0, pointerEvents: isExpanded ? "auto" : "none" })}
                        aria-label="Playback speed"
                    >
                        <SpeedIcon style={scaledStyle(iconDimensions.volumeSpeaker.width, iconDimensions.volumeSpeaker.height)} aria-hidden="true" focusable="false" />
                    </button>
                </div>
            </div>

            {/* Speed selection modal (mobile only) */}
            {isSpeedModalOpen && (
                <>
                    {/* Overlay */}
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 1000,
                            display: "flex",
                            alignItems: "flex-end",
                        }}
                        onClick={() => setIsSpeedModalOpen(false)}
                    />
                    {/* Modal */}
                    <div
                        style={{
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: "var(--audio-bg)",
                            borderTopLeftRadius: "16px",
                            borderTopRightRadius: "16px",
                            padding: "24px",
                            zIndex: 1001,
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--audio-text)" }}>
                            Playback Speed
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {playbackRates.map((rate, index) => {
                                const isActive = index === playbackRateIndex;
                                return (
                                    <button
                                        key={rate}
                                        type="button"
                                        onClick={() => {
                                            setPlaybackRate(rate);
                                            setIsSpeedModalOpen(false);
                                        }}
                                        disabled={disabled}
                                        style={{
                                          padding: "16px 24px",
                                          fontSize: "18px",
                                          fontWeight: 500,
                                          border: "1px solid var(--audio-border)",
                                          borderRadius: "8px",
                                          backgroundColor: isActive ? "var(--audio-accent)" : "transparent",
                                          color: isActive ? "#ffffff" : "var(--audio-text)",
                                          cursor: disabled ? "not-allowed" : "pointer",
                                          opacity: disabled ? 0.5 : 1,
                                          transition: "all 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                          if (!disabled && !isActive) {
                                            e.currentTarget.style.backgroundColor = "var(--audio-button-hover-bg)";
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!disabled && !isActive) {
                                            e.currentTarget.style.backgroundColor = "transparent";
                                          }
                                        }}
                                    >
                                        {rate.toFixed(rate % 1 === 0 ? 0 : 2)}x
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
