# SOURCE Design System - Atomic Architecture

## Page Structure (Atomic Design Hierarchy)

### Pages
- **Home** (`/`) - Setting the Stage + Forecasts + Solution Space
  - Page Sections: HeroSection, ProblemsGrid, ForecastsSection, SolutionSection

- **Hardware** (`/hardware`) - Hardware products
  - Page Sections: CategoryHero, ProductGrid
  - Sub-pages: `/hardware/computer`, `/hardware/monitor`, `/hardware/public-infrastructure`

- **Software** (`/software`) - Software products
  - Page Sections: CategoryHero, ProductGrid
  - Sub-pages: `/software/prover`, `/software/source-id`, `/software/cast`, `/software/non-ad-platform`

- **Open Source** (`/open-source`) - Open source initiatives
  - Page Sections: CategoryHero, ProcessFlow, TransparencyGuide
  - Sub-pages: `/open-source/process`, `/open-source/transparency`, `/open-source/trustless-trust`

- **[Dynamic Category]** (`/[category]/[slug]`) - Product detail pages

---

## Component Hierarchy

### Atoms (Primitive UI Elements)
- **Typography**: Heading, Text, Label
- **Buttons**: Button (base), IconButton, LinkButton
- **Icons**: LogoIcon, ThemeIcon, etc.
- **Inputs**: TextInput, Checkbox, RadioButton
- **Indicators**: Badge, Dot, Tag

### Molecules (Simple Component Combinations)
- **SvgCircle** - Animated circular SVG element
- **SourceLogo** - Logo + wordmark combination
- **ThemeToggle** - Theme switcher component
- **ThemeProvider** - Theme context provider
- **GridOverlay** - Dev grid overlay
- **GridOverlayToggle** - Grid overlay toggle

### Organisms (Complex Components)
- **MainHeader** - Top navigation header with scroll behavior
- **NavIsland** - Floating navigation menu (shadcn)
- **BackgroundAnimation** - Three.js animated background
- **ScrollArea** - Scrollable content wrapper (shadcn)

### Page Sections
- **HeroSection** - Hero with title, subtitle, description
- **ProblemsGrid** - 2x2 grid of problem categories with hover dropdowns
- **ForecastsSection** - 2x2 grid of forecast items
- **SolutionSection** - Solution space section
- **CategoryHero** - Category page hero
- **ProductGrid** - Product cards grid

### Layouts
- **RootLayout** - Main app layout with header, scroll area, background

---

## Current Component Organization

```
src/components/
├── ui/                          # shadcn/ui base components
│   ├── button.tsx
│   ├── dropdown-menu.tsx
│   └── scroll-area.tsx
├── theme-provider.tsx           # Molecule
├── theme-toggle.tsx             # Molecule
├── source-logo.tsx              # Molecule
├── svg-circle.tsx               # Atom
├── grid-overlay.tsx             # Molecule
├── grid-overlay-toggle.tsx      # Molecule
├── main-header.tsx              # Organism
└── nav-island.tsx               # Organism
```

### Three.js Components
```
src/three-bg-kit/
├── ThreeGradientBackground.tsx  # Main 3D background
├── GradientControls.tsx         # Controls for gradient
├── PostProcessor.tsx            # Post-processing effects
└── ThreeBGContext.tsx           # Context for 3D state
```

---

## Proposed Reorganized Structure

```
src/components/
├── atoms/
│   ├── svg-circle.tsx
│   └── icons/
│       └── source-logo.tsx
├── molecules/
│   ├── theme-toggle.tsx
│   ├── theme-provider.tsx
│   ├── grid-overlay.tsx
│   └── grid-overlay-toggle.tsx
├── organisms/
│   ├── main-header.tsx
│   ├── nav-island.tsx
│   └── background-animation.tsx
├── sections/
│   ├── hero-section.tsx
│   ├── problems-grid.tsx
│   ├── forecasts-section.tsx
│   ├── solution-section.tsx
│   ├── category-hero.tsx
│   └── product-grid.tsx
└── ui/                          # shadcn/ui base components (unchanged)
```

---

## Brand Identity

### Colors
- **Primary**: `#2a2a30`
- **Foreground**: `#000000` (light), `#ffffff` (dark)
- **Background**: `#ffffff` (light), `#171720` (dark)
- **Secondary**: `#eeeffC` (light), `#343442` (dark)
- **Accent**: `#eeeffC`
- **Muted**: `#5a5a5a` (light), `#cccccc` (dark)
- **Border**: `#dfe0e8` (light), `rgba(255,255,255,0.08)` (dark)
- **Gradient**: Light: `55deg, #eef2db 0%, #dfddf2 100%` | Dark: `55deg, rgba(16,16,15,1) 0%, rgba(35,34,43,1) 100%`

### Typography
- **Font Family**: PP Mori (local font)
- **Weights**: 200 (Extralight), 400 (Regular), 600 (SemiBold)
- **Styles**: Normal, Italic

### Spacing System
- **Border Radius**: Base `0.625rem` (10px)
  - `sm`: `calc(radius - 4px)` = 6px
  - `md`: `calc(radius - 2px)` = 8px
  - `lg`: `radius` = 10px
  - `xl`: `calc(radius + 4px)` = 14px

---

## Design System Features

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Theme System
- Light/Dark mode support
- CSS custom properties for theming
- `next-themes` for theme management

### Animations
- Scroll-based header animations
- Three.js background animations
- Tailwind transition utilities
- Custom cursor animations

---

## Design Tokens

### Shadows
- Default Tailwind shadows
- Custom: `dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)]`

### Borders
- Subtle light borders for cards/dropdowns
- Dark mode: `rgba(255,255,255,0.08)`

### Transitions
- Color: `transition-colors duration-300`
- All: `transition-all duration-300 ease-out`
