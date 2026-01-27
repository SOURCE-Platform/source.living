import type { Metadata } from "next";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/molecules/theme-provider";
import { GlobalAudioProvider } from "@/contexts/GlobalAudioContext";
import { BackgroundAnimation } from "@/components/organisms/background-animation";
import { MobileNav } from "@/components/mobile-nav";
import { TransitionProvider, TransitionEffect } from "@/components/providers/transition-context";
import { EarthSceneBackground } from "@/components/3d/EarthSceneBackground";

import { SmoothScrolling } from "@/components/providers/smooth-scrolling";

import "./globals.css";
import "@/components/audio-player/styles/audio-player.css";

const ppMori = localFont({
  src: [
    {
      path: "../fonts/PPMori-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-ExtralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/PPMori-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/PPMori-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/PPMori-SemiBoldItalic.otf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-pp-mori",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOURCE",
  description: "Simple marketing site for SOURCE",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: { url: "/favicon.png", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&family=Figtree:ital,wght@0,300..900;1,300..900&family=Lexend:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Outfit:wght@100..900&family=Questrial&family=Quicksand:wght@300..700&family=Urbanist:ital,wght@0,100..900;1,100..900&family=Atkinson+Hyperlegible+Mono:ital,wght@0,200..800;1,200..800&family=Inconsolata:wght@200..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Forum&family=Antic+Didone&family=Paprika&family=Montaga&family=Aref+Ruqaa+Ink:wght@400;700&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Funnel+Display:wght@300..800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${ppMori.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalAudioProvider>
            <TransitionProvider>
              <BackgroundAnimation />
              {/* Fixed EarthSceneV2 background - sits behind scroll container */}
              <EarthSceneBackground />
              <MobileNav />
              <TransitionEffect>
                <SmoothScrolling id="scroll-container" className="h-dvh overflow-y-auto overflow-x-hidden relative z-10">
                  {children}
                </SmoothScrolling>
              </TransitionEffect>
            </TransitionProvider>
          </GlobalAudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
