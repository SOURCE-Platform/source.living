import { audioManifest } from "@/data/audio-manifest";
import { useGlobalAudio } from "@/contexts/GlobalAudioContext";
import { PlayIcon, PauseIcon } from "@/components/audio-player/components/PlayerIcons";
import { WaveformAnimation } from "@/components/audio-player/components/WaveformAnimation";
import { cn } from "@/lib/utils";

export const SectionPlayButton = ({
    title,
    audioSrc,
    trackId,
    transcript,
    chapters,
    className
}: {
    title?: string;
    audioSrc?: string;
    trackId?: string;
    transcript?: any;
    chapters?: any;
    className?: string;
}) => {
    const { toggleTrack, toggleTrackById, currentTrack, isPlaying } = useGlobalAudio();

    const manifestItem = trackId ? audioManifest.find(t => t.id === trackId) : null;
    const effectiveSrc = manifestItem?.audioSrc || audioSrc;
    const effectiveTitle = manifestItem?.title || title || "Audio";

    const isCurrentTrack = currentTrack?.src === effectiveSrc;
    const isActive = isCurrentTrack && isPlaying;

    const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();

        if (trackId && toggleTrackById) {
            toggleTrackById(trackId);
        } else if (effectiveSrc && effectiveTitle) { // Fallback for legacy
            toggleTrack({
                title: effectiveTitle,
                src: effectiveSrc,
                transcript: transcript || { utterances: [] },
                chapters: chapters || []
            });
        }
    };

    return (
        <>
            <svg width="0" height="0" className="absolute block w-0 h-0 overflow-hidden" aria-hidden="true">
                <defs>
                    <linearGradient id="playgrade" gradientTransform="rotate(22, 0.2, 0.5) translate(0.2, 0.5) scale(2.5) translate(-0.5, -0.5)">
                        <stop offset="0%" stopColor="#FFC1D5" />
                        <stop offset="29.69%" stopColor="#FFC1D5" />
                        <stop offset="61.98%" stopColor="#FEFFE3" />
                        <stop offset="100%" stopColor="#97A1FB" />
                    </linearGradient>
                    <linearGradient id="playgrade-hover" gradientTransform="rotate(22, 0.2, 0.5) translate(0.3, 0.5) scale(1.0) translate(-0.5, -0.5)">
                        <stop offset="0%" stopColor="#FFC1D5" />
                        <stop offset="29.69%" stopColor="#FFC1D5" />
                        <stop offset="61.98%" stopColor="#FEFFE3" />
                        <stop offset="100%" stopColor="#97A1FB" />
                    </linearGradient>
                    <linearGradient id="playgrade-light" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#02ABFF" />
                        <stop offset="100%" stopColor="#001AFF" />
                    </linearGradient>
                    <linearGradient id="playgrade-light-hover" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#02ABFF" />
                        <stop offset="100%" stopColor="#001AFF" />
                    </linearGradient>
                    <linearGradient id="playgrade-light-reverse" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#001AFF" />
                        <stop offset="100%" stopColor="#02ABFF" />
                    </linearGradient>
                </defs>
            </svg>
            <button
                onClick={handlePlay}
                className={`inline-flex items-center justify-center rounded-lg pb-2 pt-1 transition-colors group cursor-pointer overflow-visible ${className}`}
                aria-label={`Play section: ${effectiveTitle}`}
                title="Play audio for this section"
            >
                {/* Visual improvement: show play icon. If active, maybe show a playing indicator or just the play icon styled differently */}
                <div className="relative w-[30px] h-[30px] transition-transform duration-200 group-hover:scale-110">
                    {/* --- PLAY ICON GROUP --- */}
                    <div className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${isActive ? "opacity-0" : "opacity-100"}`}>
                        {/* Glow Effect - Blurred Icon */}
                        <PlayIcon className="absolute inset-0 w-full h-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 [&_path]:fill-[url(#playgrade-light-reverse)] dark:[&_path]:fill-[url(#playgrade-reverse)] scale-90" />

                        {/* Base Icon (Default State) */}
                        <PlayIcon className="relative z-10 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-200 [&_path]:fill-[url(#playgrade-light)] dark:[&_path]:fill-[url(#playgrade)]" />

                        {/* Hover Icon (Hover State) - Fades in */}
                        <PlayIcon className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out [&_path]:fill-[url(#playgrade-light-hover)] dark:[&_path]:fill-[url(#playgrade-hover)]" />
                    </div>

                    {/* --- PAUSE ICON GROUP --- */}
                    <div className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"}`}>
                        {/* Glow Effect - Blurred Icon */}
                        <PauseIcon className="absolute inset-0 w-full h-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 [&_path]:fill-[url(#playgrade-light-reverse)] dark:[&_path]:fill-[url(#playgrade-reverse)] scale-90" />

                        {/* Base Icon (Default State) */}
                        <PauseIcon className="relative z-10 w-full h-full opacity-100 group-hover:opacity-100 transition-opacity duration-200 [&_path]:fill-[url(#playgrade-light)] dark:[&_path]:fill-[url(#playgrade)]" />

                        {/* Hover Icon (Hover State) - Fades in */}
                        <PauseIcon className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out [&_path]:fill-[url(#playgrade-light-hover)] dark:[&_path]:fill-[url(#playgrade-hover)]" />
                    </div>
                </div>
                <WaveformAnimation className="ml-4" isActive={!!isActive} />
            </button>
        </>
    );
};
