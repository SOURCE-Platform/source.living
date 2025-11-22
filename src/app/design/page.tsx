"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SourceLogo } from "@/components/atoms/icons/source-logo";

type TabType =
  | "brand-identity"
  | "colors"
  | "typography"
  | "spacing"
  | "ui-elements"
  | "components"
  | "page-sections";

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<TabType>("brand-identity");

  const tabs = [
    { id: "brand-identity" as const, label: "Brand Identity", icon: "◆" },
    { id: "colors" as const, label: "Colors", icon: "●" },
    { id: "typography" as const, label: "Typography", icon: "Aa" },
    { id: "spacing" as const, label: "Spacing", icon: "▭" },
    { id: "ui-elements" as const, label: "UI Elements", icon: "⬚" },
    { id: "components" as const, label: "Components", icon: "◇" },
    { id: "page-sections" as const, label: "Page Sections", icon: "⊞" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <SourceLogo className="h-8" />
            <h1 className="text-xl font-semibold">Design System</h1>
          </div>
          <p className="text-sm text-muted-foreground">Atomic Design Documentation</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-[73px] z-30 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        {activeTab === "brand-identity" && <BrandIdentityTab />}
        {activeTab === "colors" && <ColorsTab />}
        {activeTab === "typography" && <TypographyTab />}
        {activeTab === "spacing" && <SpacingTab />}
        {activeTab === "ui-elements" && <UIElementsTab />}
        {activeTab === "components" && <ComponentsTab />}
        {activeTab === "page-sections" && <PageSectionsTab />}
      </main>
    </div>
  );
}

// ============================================================================
// TAB COMPONENTS
// ============================================================================

function BrandIdentityTab() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">Brand Identity</h2>
          <p className="text-lg text-muted-foreground">
            The foundational elements that define SOURCE's visual identity
          </p>
        </div>

        {/* Logo Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Logo & Wordmark</h3>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-lg bg-white p-2 dark:bg-zinc-900">
                <img
                  src="/logo/SOURCE-pictogram.svg"
                  alt="SOURCE pictogram"
                  className="h-full w-full"
                />
              </div>
              <div>
                <p className="font-mono text-sm text-muted-foreground">
                  /logo/SOURCE-pictogram.svg
                </p>
                <p className="text-sm text-muted-foreground">44 × 44 px</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-12 rounded-lg bg-white p-2 dark:bg-zinc-900">
                <img
                  src="/logo/SOURCE-wordmark.svg"
                  alt="SOURCE wordmark"
                  className="h-full"
                />
              </div>
              <div>
                <p className="font-mono text-sm text-muted-foreground">
                  /logo/SOURCE-wordmark.svg
                </p>
                <p className="text-sm text-muted-foreground">184 × 34 px</p>
              </div>
            </div>
          </div>
        </div>

        {/* Font Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Typography Family</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="font-mono text-sm text-muted-foreground">Font: PP Mori</p>
              <p className="text-sm text-muted-foreground">
                Local font family with multiple weights and styles
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">Available Weights:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 200 (Extralight) - Light, refined typography</li>
                <li>• 400 (Regular) - Body text and standard content</li>
                <li>• 600 (SemiBold) - Headings and emphasis</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">Styles:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Normal - Standard upright text</li>
                <li>• Italic - Slanted emphasis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ColorsTab() {
  const colorPairs = [
    {
      name: "Primary",
      light: "#2a2a30",
      dark: "#cdcdd7",
      usage: "Main branding color for primary actions and emphasis",
    },
    {
      name: "Background",
      light: "#ffffff",
      dark: "#171720",
      usage: "Main background color for pages and surfaces",
    },
    {
      name: "Foreground",
      light: "#000000",
      dark: "#ffffff",
      usage: "Primary text color with full contrast",
    },
    {
      name: "Secondary",
      light: "#eeeffc",
      dark: "#343442",
      usage: "Secondary surfaces and subtle backgrounds",
    },
    {
      name: "Muted",
      light: "#5a5a5a",
      dark: "#cccccc",
      usage: "Secondary text and disabled states",
    },
    {
      name: "Border",
      light: "#dfe0e8",
      dark: "rgba(255,255,255,0.08)",
      usage: "Border and divider elements",
    },
    {
      name: "Accent",
      light: "#eeeffc",
      dark: "#343442",
      usage: "Highlight and accent elements",
    },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">Color Palette</h2>
          <p className="text-lg text-muted-foreground">
            Semantic colors used throughout the design system with light and dark mode variants
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {colorPairs.map((color) => (
            <div
              key={color.name}
              className="space-y-3"
            >
              <h3 className="font-semibold">{color.name}</h3>
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-xs font-mono text-muted-foreground">Light Mode</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-lg border border-border"
                      style={{ backgroundColor: color.light }}
                    />
                    <span className="font-mono text-sm">{color.light}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-mono text-muted-foreground">Dark Mode</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-lg border border-border"
                      style={{ backgroundColor: color.dark }}
                    />
                    <span className="font-mono text-sm">{color.dark}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{color.usage}</p>
            </div>
          ))}
        </div>

        {/* Gradient Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Gradients</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold">Light Mode</h4>
              <div
                className="h-32 rounded-lg border border-border"
                style={{
                  background: "linear-gradient(55deg, #eef2db 0%, #dfddf2 100%)",
                }}
              />
              <code className="block break-all rounded bg-muted/50 p-2 font-mono text-xs">
                linear-gradient(55deg, #eef2db 0%, #dfddf2 100%)
              </code>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Dark Mode</h4>
              <div
                className="h-32 rounded-lg border border-border"
                style={{
                  background: "linear-gradient(55deg, rgba(16,16,15,1) 0%, rgba(35,34,43,1) 100%)",
                }}
              />
              <code className="block break-all rounded bg-muted/50 p-2 font-mono text-xs">
                linear-gradient(55deg, rgba(16,16,15,1) 0%, rgba(35,34,43,1) 100%)
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TypographyTab() {
  const scales = [
    { name: "Display", size: "text-5xl", weight: "font-semibold", usage: "Page titles, hero headings" },
    { name: "H1", size: "text-4xl", weight: "font-semibold", usage: "Section headings" },
    { name: "H2", size: "text-3xl", weight: "font-semibold", usage: "Subsection headings" },
    { name: "H3", size: "text-xl", weight: "font-semibold", usage: "Component headings" },
    { name: "Body", size: "text-base", weight: "font-normal", usage: "Body text, paragraphs" },
    { name: "Small", size: "text-sm", weight: "font-normal", usage: "Secondary text, captions" },
    { name: "XSmall", size: "text-xs", weight: "font-normal", usage: "Labels, metadata" },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">Typography System</h2>
          <p className="text-lg text-muted-foreground">
            Font family: PP Mori. Responsive type scales designed for clarity and hierarchy.
          </p>
        </div>

        {/* Type Scale */}
        <div className="space-y-4">
          {scales.map((scale) => (
            <div key={scale.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{scale.name}</h3>
                <code className="font-mono text-xs text-muted-foreground">
                  {scale.size} {scale.weight}
                </code>
              </div>
              <p className={cn(scale.size, scale.weight)}>
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-sm text-muted-foreground">{scale.usage}</p>
            </div>
          ))}
        </div>

        {/* Font Weights */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Font Weights</h3>
          <div className="space-y-3">
            <div>
              <p className="font-extralight text-lg">200 - Extralight</p>
              <p className="text-sm text-muted-foreground">Light, refined typography for emphasis</p>
            </div>
            <div>
              <p className="font-normal text-lg">400 - Regular</p>
              <p className="text-sm text-muted-foreground">Standard text for body and general content</p>
            </div>
            <div>
              <p className="font-semibold text-lg">600 - SemiBold</p>
              <p className="text-sm text-muted-foreground">Bold emphasis for headings and highlights</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SpacingTab() {
  const spacingValues = [
    { size: "xs", value: "0.25rem", px: "4px", scale: 4 },
    { size: "sm", value: "0.5rem", px: "8px", scale: 8 },
    { size: "md", value: "1rem", px: "16px", scale: 16 },
    { size: "lg", value: "1.5rem", px: "24px", scale: 24 },
    { size: "xl", value: "2rem", px: "32px", scale: 32 },
    { size: "2xl", value: "3rem", px: "48px", scale: 48 },
    { size: "3xl", value: "4rem", px: "64px", scale: 64 },
  ];

  const borderRadius = [
    { name: "sm", value: "6px", usage: "Small buttons, subtle elements" },
    { name: "md", value: "8px", usage: "Standard inputs and cards" },
    { name: "lg", value: "10px", usage: "Default radius for most elements" },
    { name: "xl", value: "14px", usage: "Large cards and containers" },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">Spacing & Layout</h2>
          <p className="text-lg text-muted-foreground">
            Consistent spacing scales for padding, margins, and gaps
          </p>
        </div>

        {/* Spacing Scale */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-6">Spacing Scale</h3>
          <div className="space-y-4">
            {spacingValues.map((spacing) => (
              <div key={spacing.size} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold">{spacing.size}</span>
                  <span className="text-sm text-muted-foreground">
                    {spacing.value} ({spacing.px})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="bg-accent"
                    style={{ width: `${Math.min(spacing.scale, 200)}px`, height: "24px" }}
                  />
                  <span className="font-mono text-xs text-muted-foreground">
                    {spacing.px} wide
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-6">Border Radius</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {borderRadius.map((radius) => (
              <div key={radius.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-semibold">{radius.name}</span>
                  <span className="font-mono text-sm text-muted-foreground">{radius.value}</span>
                </div>
                <div
                  className="h-24 border-2 border-border bg-accent"
                  style={{ borderRadius: radius.value }}
                />
                <p className="text-sm text-muted-foreground">{radius.usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive Padding */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Common Responsive Padding</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-mono">px-6 sm:px-12 lg:px-20 xl:px-32 2xl:px-48</span> -
              Page horizontal padding
            </p>
            <p>
              <span className="font-mono">py-12</span> - Page vertical padding
            </p>
            <p>
              <span className="font-mono">gap-6, gap-12, gap-24</span> - Component spacing
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function UIElementsTab() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">UI Elements</h2>
          <p className="text-lg text-muted-foreground">
            Primitive and simple UI components that form the foundation
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90">
              Primary
            </button>
            <button className="rounded-lg border border-border px-4 py-2 font-medium hover:bg-muted/30">
              Secondary
            </button>
            <button className="rounded-lg bg-destructive px-4 py-2 font-medium text-destructive-foreground hover:opacity-90">
              Destructive
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Badges & Tags</h3>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              Badge
            </span>
            <span className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-medium">
              Outline
            </span>
            <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Muted
            </span>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Form Inputs</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Text input"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              placeholder="Textarea"
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Checkboxes & Radio */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Checkboxes & Radio Buttons</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Checkbox option</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="radio-group" />
              <span>Radio option</span>
            </label>
          </div>
        </div>

        {/* SVG Elements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">SVG Elements</h3>
          <div className="flex items-center gap-8">
            {/* Star Icon */}
            <div className="flex flex-col items-center gap-2">
              <svg width="48" height="48" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M27.5 0L28.8318 20.5684C29.0266 23.5767 31.4233 25.9734 34.4316 26.1682L55 27.5L34.4316 28.8318C31.4233 29.0266 29.0266 31.4233 28.8318 34.4316L27.5 55L26.1682 34.4316C25.9734 31.4233 23.5767 29.0266 20.5684 28.8318L0 27.5L20.5684 26.1682C23.5767 25.9734 25.9734 23.5767 26.1682 20.5684L27.5 0Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-xs text-muted-foreground">Star</span>
            </div>
            {/* Circle Icon */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full border-2 border-current" />
              <span className="text-xs text-muted-foreground">Circle</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ComponentsTab() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">Components</h2>
          <p className="text-lg text-muted-foreground">
            Reusable components organized by atomic design principles
          </p>
        </div>

        {/* Atoms */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Atoms</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Basic building blocks that can't be broken down further
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-primary">◆</span>
              <span className="font-mono">SvgCircle</span>
              <span className="text-sm text-muted-foreground">- Animated SVG circle element</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">◆</span>
              <span className="font-mono">SourceLogo</span>
              <span className="text-sm text-muted-foreground">- SOURCE pictogram + wordmark</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">◆</span>
              <span className="font-mono">Button</span>
              <span className="text-sm text-muted-foreground">- Base button (shadcn/ui)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">◆</span>
              <span className="font-mono">Badge</span>
              <span className="text-sm text-muted-foreground">- Label and tag elements</span>
            </li>
          </ul>
        </div>

        {/* Molecules */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Molecules</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Simple combination of atoms forming functional units
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-primary">○</span>
              <span className="font-mono">ThemeToggle</span>
              <span className="text-sm text-muted-foreground">- Light/dark mode switcher</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">○</span>
              <span className="font-mono">ThemeProvider</span>
              <span className="text-sm text-muted-foreground">- Theme context (next-themes)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">○</span>
              <span className="font-mono">GridOverlay</span>
              <span className="text-sm text-muted-foreground">- Development grid for alignment</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">○</span>
              <span className="font-mono">GridOverlayToggle</span>
              <span className="text-sm text-muted-foreground">- Toggle grid visibility</span>
            </li>
          </ul>
        </div>

        {/* Organisms */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Organisms</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Complex combinations of molecules and/or atoms
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">⬢</span>
              <div>
                <span className="font-mono">MainHeader</span>
                <p className="text-sm text-muted-foreground">
                  Sticky header with scroll-triggered animations. Shows/hides based on scroll
                  position.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">⬢</span>
              <div>
                <span className="font-mono">NavIsland</span>
                <p className="text-sm text-muted-foreground">
                  Floating navigation with dropdown menus. Supports multi-column layouts.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">⬢</span>
              <div>
                <span className="font-mono">BackgroundAnimation</span>
                <p className="text-sm text-muted-foreground">
                  Three.js animated gradient background. Provides visual depth and polish.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">⬢</span>
              <div>
                <span className="font-mono">ScrollArea</span>
                <p className="text-sm text-muted-foreground">
                  Custom scrollable container (shadcn/ui Radix). Powers main content area.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Page Sections */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Page Sections</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Large reusable sections for building pages
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-primary">⊞</span>
              <span className="font-mono">HeroSection</span>
              <span className="text-sm text-muted-foreground">- Page intro with title and description</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">⊞</span>
              <span className="font-mono">ProblemsGrid</span>
              <span className="text-sm text-muted-foreground">- 2x2 grid with hover tooltips</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">⊞</span>
              <span className="font-mono">ForecastsSection</span>
              <span className="text-sm text-muted-foreground">- Forecast items grid</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">⊞</span>
              <span className="font-mono">ProductGrid</span>
              <span className="text-sm text-muted-foreground">- Product cards listing</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function PageSectionsTab() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold">Page Sections</h2>
          <p className="text-lg text-muted-foreground">
            Live examples of reusable sections from the site
          </p>
        </div>

        {/* Hero Section Example */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold">Hero Section</h3>
            <p className="text-sm text-muted-foreground">Used on homepage, category pages, and landing pages</p>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold sm:text-5xl">Setting the Stage</h1>
            <h2 className="text-2xl font-semibold sm:text-3xl">Current Systemic Conditions</h2>
            <p className="pt-2 text-base text-muted-foreground">
              To understand what comes next we must first understand the current systemic civilisational problem set.
            </p>
          </div>
        </div>

        {/* PEST Grid Section Example */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold">PEST Grid Section</h3>
            <p className="text-sm text-muted-foreground">2x2 responsive grid with hover tooltips. Adapts from 1 column (mobile) to 4 columns (desktop)</p>
          </div>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
              {/* Economic */}
              <div className="relative sm:border-b sm:border-r lg:border-b-0 lg:border-r-0 border-[#CCCCCC] dark:border-[#333333] p-6">
                <div className="hidden sm:block lg:hidden absolute bottom-0 right-0 z-10 translate-x-1/2 translate-y-1/2">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 55 55"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-12"
                    aria-hidden="true"
                  >
                    <path
                      d="M27.5 0L28.8318 20.5684C29.0266 23.5767 31.4233 25.9734 34.4316 26.1682L55 27.5L34.4316 28.8318C31.4233 29.0266 29.0266 31.4233 28.8318 34.4316L27.5 55L26.1682 34.4316C25.9734 31.4233 23.5767 29.0266 20.5684 28.8318L0 27.5L20.5684 26.1682C23.5767 25.9734 25.9734 23.5767 26.1682 20.5684L27.5 0Z"
                      className="fill-[#CCCCCC] dark:fill-[#333333]"
                    />
                  </svg>
                </div>
                <h4 className="mb-4 text-lg font-semibold">Economic</h4>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      Escalating Layoffs
                    </span>
                  </li>
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      AI Agentification
                    </span>
                  </li>
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      Supply Chain Disruptions
                    </span>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div className="sm:border-b lg:border-b-0 lg:border-r-0 border-[#CCCCCC] dark:border-[#333333] p-6">
                <h4 className="mb-4 text-lg font-semibold">Social</h4>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      Social Media Algos
                    </span>
                  </li>
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      Breakdown of Community
                    </span>
                  </li>
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      Loneliness Epidemic
                    </span>
                  </li>
                </ul>
              </div>

              {/* Political */}
              <div className="sm:border-r lg:border-r-0 border-[#CCCCCC] dark:border-[#333333] p-6">
                <h4 className="mb-4 text-lg font-semibold">Political</h4>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      Inadequate Problem Solving
                    </span>
                  </li>
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      Political Polarization
                    </span>
                  </li>
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      Erosion of Trust
                    </span>
                  </li>
                </ul>
              </div>

              {/* Technological */}
              <div className="p-6">
                <h4 className="mb-4 text-lg font-semibold">Technological</h4>
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      Data Privacy Concerns
                    </span>
                  </li>
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      Security Vulnerabilities
                    </span>
                  </li>
                  <li className="group">
                    <span className="relative inline-block cursor-eye rounded-md px-2 -mx-2 py-1 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
                      Deepfakes
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Section Example */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold">Forecast Section</h3>
            <p className="text-sm text-muted-foreground">Section with heading and 2x2 grid of forecast items</p>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-4xl font-semibold sm:text-5xl">Forecasts</h2>
              <h3 className="text-2xl font-semibold sm:text-3xl">A Dark Dystopian Future</h3>
              <p className="pt-2 text-base text-muted-foreground">
                Based on the current systemic problem set the forecast does not look hopeful with out a significant civilisational pivot across all core dimensions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <article className="space-y-2">
                <h4 className="text-lg font-semibold">A New Global Populous Movement</h4>
                <p className="text-sm text-muted-foreground">
                  Due to the widespread economic and political discontent across the left, right, and center, there&apos;s a strong possibility that a unification of the 99% will emerge.
                </p>
              </article>

              <article className="space-y-2">
                <h4 className="text-lg font-semibold">Consolidation of Power & Wealth</h4>
                <p className="text-sm text-muted-foreground">
                  Increasing wealth concentration to the few will inevitably result in greater social tension and reduce social mobility.
                </p>
              </article>

              <article className="space-y-2">
                <h4 className="text-lg font-semibold">Escalating Crime Rates Global</h4>
                <p className="text-sm text-muted-foreground">
                  Due to rising unemployment, decrease in purchasing power, and social inequality, crime rates will likely increase.
                </p>
              </article>

              <article className="space-y-2">
                <h4 className="text-lg font-semibold">Possibility for Global Civil War</h4>
                <p className="text-sm text-muted-foreground">
                  A war not between the political left and right but between the 99% grass roots populous and the established power structure.
                </p>
              </article>
            </div>
          </div>
        </div>

        {/* Logo Section Example */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold">Logo Header</h3>
            <p className="text-sm text-muted-foreground">Used at the top of pages for branding</p>
          </div>
          <div className="flex items-center gap-[18px]">
            <img
              src="/logo/SOURCE-pictogram.svg"
              alt="SOURCE pictogram"
              width="44"
              height="44"
              className="h-11 w-11 min-w-[2.75rem] invert transition-colors duration-300 dark:invert-0"
            />
            <img
              src="/logo/SOURCE-wordmark.svg"
              alt="SOURCE wordmark"
              width="184"
              height="34"
              className="h-8 w-auto invert transition-colors duration-300 dark:invert-0"
            />
          </div>
        </div>

        {/* Responsive Guidelines */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Responsive Design Guidelines</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold">Mobile (sm: 640px)</p>
              <p className="text-muted-foreground">Single column layouts, stacked sections, full-width padding</p>
            </div>
            <div>
              <p className="font-semibold">Tablet (md: 768px to lg: 1024px)</p>
              <p className="text-muted-foreground">PEST grid becomes 2x2, wider spacing, increased padding</p>
            </div>
            <div>
              <p className="font-semibold">Desktop (lg: 1024px+)</p>
              <p className="text-muted-foreground">PEST grid becomes 4 columns, full layouts, max-width constraints</p>
            </div>
            <div>
              <p className="font-semibold">Large (xl: 1280px and up)</p>
              <p className="text-muted-foreground">Expanded content areas with consistent max-width</p>
            </div>
          </div>
        </div>

        {/* Layout Principles */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Layout Principles</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <div>
                <strong>Centered Containers:</strong> Sections use max-width constraints (xl, 6xl) for readability
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <div>
                <strong>Responsive Padding:</strong> <code className="font-mono text-xs">px-6 sm:px-12 lg:px-20 xl:px-32 2xl:px-48</code> scales with viewport
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <div>
                <strong>Consistent Spacing:</strong> Gap scales (gap-0, gap-6, gap-12, gap-24) for grid sections
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-primary">✓</span>
              <div>
                <strong>Section Separation:</strong> Large vertical spacing (space-y-16, space-y-24) between sections
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
