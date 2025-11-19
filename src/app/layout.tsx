import type { Metadata } from "next";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundAnimation } from "@/components/background-animation";
import { MainHeader } from "@/components/main-header";
import { ScrollArea } from "@/components/ui/scroll-area";

import "./globals.css";

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

const basePath = process.env.NODE_ENV === 'production' ? '/source.living' : '';

export const metadata: Metadata = {
  title: "SOURCE",
  description: "Simple marketing site for SOURCE",
  icons: {
    icon: [{ url: `${basePath}/favicon.svg`, type: "image/svg+xml" }],
    apple: { url: `${basePath}/favicon.png`, type: "image/png" },
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
        className={`${ppMori.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BackgroundAnimation />
          <div className="relative z-10 flex h-screen flex-col">
            <MainHeader />
            <ScrollArea className="flex-1" viewportId="main-content">
              <main className="min-h-screen w-full">
                {children}
              </main>
            </ScrollArea>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
