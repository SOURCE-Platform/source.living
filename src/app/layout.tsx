import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { BackgroundAnimation } from "@/components/background-animation";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOURCE",
  description: "Simple marketing site for SOURCE",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundAnimation />
          <div className="relative z-10 flex h-screen overflow-hidden">
            <div className="absolute right-6 top-6">
              <ThemeToggle />
            </div>
            <main className="flex flex-1 items-center justify-center">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
