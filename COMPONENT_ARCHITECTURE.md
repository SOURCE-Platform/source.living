# SOURCE Component Architecture

A comprehensive guide to the component structure, organization, and patterns used in the SOURCE marketing site.

---

## Table of Contents

1. [Overview](#overview)
2. [Atomic Design Principles](#atomic-design-principles)
3. [Directory Structure](#directory-structure)
4. [Component Layers](#component-layers)
5. [File Organization](#file-organization)
6. [Import Paths](#import-paths)
7. [Component Patterns](#component-patterns)
8. [Design System Access](#design-system-access)

---

## Overview

This project uses **Atomic Design** methodology to organize components into logical, reusable, and maintainable units. Components are organized in a hierarchical structure from simple atoms to complex page sections.

The design system is fully documented and interactive at `/design` route.

---

## Atomic Design Principles

Atomic Design breaks down a user interface into its fundamental components and builds from there. The hierarchy is:

```
Atoms → Molecules → Organisms → Page Sections → Pages
```

### Benefits

- **Reusability**: Smaller components can be reused across larger ones
- **Consistency**: Shared design tokens and patterns across the app
- **Maintainability**: Clear separation of concerns
- **Scalability**: Easy to add new components following established patterns
- **Collaboration**: Clear mental model for designers and developers

---

## Directory Structure

```
src/
├── components/
│   ├── atoms/                   # Primitive, indivisible components
│   │   ├── svg-circle.tsx
│   │   └── icons/
│   │       └── source-logo.tsx
│   ├── molecules/               # Simple component combinations
│   │   ├── theme-toggle.tsx
│   │   ├── theme-provider.tsx
│   │   ├── grid-overlay.tsx
│   │   └── grid-overlay-toggle.tsx
│   ├── organisms/               # Complex combinations of molecules/atoms
│   │   ├── main-header.tsx
│   │   ├── nav-island.tsx
│   │   └── background-animation.tsx
│   ├── sections/                # Large reusable page sections
│   │   ├── hero-section.tsx
│   │   ├── problems-grid.tsx
│   │   ├── forecasts-section.tsx
│   │   ├── solution-section.tsx
│   │   ├── category-hero.tsx
│   │   └── product-grid.tsx
│   └── ui/                      # shadcn/ui base components
│       ├── button.tsx
│       ├── dropdown-menu.tsx
│       └── scroll-area.tsx
├── app/                         # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── design/
│   │   └── page.tsx             # Design system documentation
│   ├── hardware/
│   │   ├── page.tsx
│   │   ├── computer/
│   │   ├── monitor/
│   │   └── public-infrastructure/
│   ├── software/
│   │   ├── page.tsx
│   │   ├── prover/
│   │   ├── source-id/
│   │   ├── cast/
│   │   └── non-ad-platform/
│   ├── open-source/
│   │   ├── process/
│   │   ├── transparency/
│   │   └── trustless-trust/
│   └── [category]/[slug]/
├── three-bg-kit/                # Three.js background animation
│   ├── ThreeGradientBackground.tsx
│   ├── GradientControls.tsx
│   ├── PostProcessor.tsx
│   └── ThreeBGContext.tsx
├── lib/                         # Utilities
│   ├── navigation.ts
│   └── utils.ts
└── fonts/                       # Local fonts
    ├── PPMori-Extralight.otf
    ├── PPMori-ExtralightItalic.otf
    ├── PPMori-Regular.otf
    ├── PPMori-RegularItalic.otf
    ├── PPMori-SemiBold.otf
    └── PPMori-SemiBoldItalic.otf
```

---

## Component Layers

### Atoms

**Definition**: The smallest, most primitive building blocks that cannot be broken down further without losing meaning.

**Location**: `src/components/atoms/`

**Examples**:
- `SvgCircle` - Animated SVG circle element
- `SourceLogo` - Logo + wordmark combination
- Base icons and SVG elements

**Characteristics**:
- No dependencies on other custom components
- May use UI primitives (HTML elements, tailwind classes)
- Highly reusable
- Focused, single responsibility
- Pure functional components

**Example**:
```typescript
// src/components/atoms/svg-circle.tsx
export function SvgCircle({ className }: SvgCircleProps) {
  return (
    <svg className={cn("size-4", className)}>
      <circle cx="50%" cy="50%" r="45%" fill="currentColor" />
    </svg>
  );
}
```

### Molecules

**Definition**: Simple combinations of atoms bonded together to form functional units.

**Location**: `src/components/molecules/`

**Examples**:
- `ThemeToggle` - Theme switcher (atoms: icons + button)
- `ThemeProvider` - Theme context provider
- `GridOverlay` - Development grid overlay
- `GridOverlayToggle` - Grid visibility toggle

**Characteristics**:
- Combine 2-3 atoms
- Still relatively simple
- Handle a single UI concern
- May manage local state
- Reusable across pages

**Example**:
```typescript
// src/components/molecules/theme-toggle.tsx
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <SunIcon /> {/* Atom */}
    </button>
  );
}
```

### Organisms

**Definition**: Complex combinations of molecules and/or atoms that form distinct sections of the interface.

**Location**: `src/components/organisms/`

**Examples**:
- `MainHeader` - Sticky header with scroll behavior
- `NavIsland` - Floating navigation with dropdown menus
- `BackgroundAnimation` - Three.js animated background
- `ScrollArea` - Custom scroll container (shadcn/ui)

**Characteristics**:
- Combine molecules and atoms
- Handle complex interactions
- May manage significant state
- Often have client-side logic
- Represent major UI sections

**Example**:
```typescript
// src/components/organisms/main-header.tsx
export function MainHeader() {
  const [isFloating, setIsFloating] = useState(false);
  
  useEffect(() => {
    // Scroll listener logic
  }, []);
  
  return (
    <header>
      <ThemeToggle /> {/* Molecule */}
    </header>
  );
}
```

### Page Sections

**Definition**: Large, reusable sections composed of organisms, molecules, and atoms. These form major building blocks of pages.

**Location**: `src/components/sections/`

**Examples**:
- `HeroSection` - Hero intro with title, subtitle, description
- `ProblemsGrid` - 2x2 grid of problem categories
- `ForecastsSection` - Forecast items
- `ProductGrid` - Product cards listing
- `CategoryHero` - Category page introduction
- `SolutionSection` - Solution space content

**Characteristics**:
- Compose multiple organisms
- Represent distinct page areas
- Manage their own layout
- May handle data fetching
- Self-contained styling

**Example**:
```typescript
// src/components/sections/hero-section.tsx
interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

export function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  return (
    <section className="space-y-8">
      <h1 className="text-5xl font-semibold">{title}</h1>
      <h2 className="text-3xl font-semibold">{subtitle}</h2>
      <p className="text-muted-foreground">{description}</p>
    </section>
  );
}
```

### Pages

**Definition**: Complete, functional pages that combine page sections and layouts.

**Location**: `src/app/`

**Examples**:
- Home page (`/`)
- Hardware page (`/hardware`)
- Software page (`/software`)
- Product detail pages

**Characteristics**:
- Use Next.js App Router
- Combine multiple page sections
- May use layouts
- Handle routing
- Server or client components

**Example**:
```typescript
// src/app/page.tsx
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemsGrid } from "@/components/sections/problems-grid";

export default function Home() {
  return (
    <div>
      <HeroSection 
        title="Setting the Stage"
        subtitle="Current Systemic Conditions"
        description="..."
      />
      <ProblemsGrid />
    </div>
  );
}
```

---

## File Organization

### Naming Conventions

- **Files**: `kebab-case` (e.g., `theme-toggle.tsx`)
- **Components**: `PascalCase` (e.g., `ThemeToggle`)
- **Props Interfaces**: `PascalCase` with `Props` suffix (e.g., `ThemeToggleProps`)
- **Folders**: `kebab-case` (e.g., `atoms`, `molecules`)

### File Structure

Each component file should follow this pattern:

```typescript
// src/components/molecules/example-component.tsx

"use client"; // If using hooks/interactivity

import React from "react";
import { cn } from "@/lib/utils";
// External imports
import { OtherComponent } from "@/components/atoms/other-component";

// Props interface
interface ExampleComponentProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary";
}

// Component implementation
export function ExampleComponent({
  children,
  className,
  variant = "default",
}: ExampleComponentProps) {
  return (
    <div className={cn("base-classes", variant === "secondary" && "variant-classes", className)}>
      {children}
    </div>
  );
}
```

---

## Import Paths

### Using Absolute Imports

All imports should use absolute paths with the `@/` alias (configured in `tsconfig.json`).

```typescript
// ✓ Good
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { SourceLogo } from "@/components/atoms/icons/source-logo";
import { cn } from "@/lib/utils";

// ✗ Avoid
import { ThemeToggle } from "../molecules/theme-toggle";
import { cn } from "../../lib/utils";
```

### Import Organization

Group imports in this order:
1. React/Next.js imports
2. External library imports
3. Internal component imports (from `@/components`)
4. Utility imports (from `@/lib`)
5. Type imports (if using TypeScript)

```typescript
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { cn } from "@/lib/utils";
```

---

## Component Patterns

### Props Pattern

Always define a props interface before the component:

```typescript
interface ComponentProps {
  label: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

export function Component({ label, variant = "primary", disabled = false, className }: ComponentProps) {
  return <button className={cn(baseClasses, className)}>{label}</button>;
}
```

### Optional className Prop

Most components should accept an optional `className` prop for styling flexibility:

```typescript
export function Component({ className }: { className?: string }) {
  return <div className={cn("base-classes", className)} />;
}
```

### Using cn() for Conditional Classes

Always use the `cn()` utility (clsx + tailwind-merge) for combining classes:

```typescript
export function Component({ active }: { active?: boolean }) {
  return <div className={cn("base", active && "active-classes")} />;
}
```

### Default Exports

Components are exported as default exports:

```typescript
export function ThemeToggle() {
  // ...
}

export default ThemeToggle; // Or just use default directly
```

### Client vs Server Components

Mark client components with `"use client"` at the top:

```typescript
"use client";

import { useState } from "react";

export function InteractiveComponent() {
  const [state, setState] = useState(false);
  // ...
}
```

---

## Styling Patterns

### Tailwind CSS

Use Tailwind CSS classes directly in JSX:

```typescript
export function Button({ variant = "primary" }: ButtonProps) {
  return (
    <button className={cn(
      "px-4 py-2 rounded-lg font-medium transition-colors",
      variant === "primary" && "bg-primary text-primary-foreground hover:opacity-90",
      variant === "secondary" && "border border-border hover:bg-muted/30"
    )}>
      Click me
    </button>
  );
}
```

### Dark Mode

Use the `dark:` prefix for dark mode styles:

```typescript
<div className="bg-white text-black dark:bg-zinc-900 dark:text-white" />
```

### Responsive Design

Use Tailwind breakpoints:

```typescript
<div className="px-4 sm:px-6 lg:px-8 xl:px-12" />
```

---

## Design System Access

### View the Design System

Visit `/design` to see a comprehensive, interactive design system documentation including:

- **Brand Identity**: Logos, fonts, and core brand elements
- **Colors**: Full palette with light/dark mode variants
- **Typography**: Type scales and font weights
- **Spacing**: Spacing scale and border radius values
- **UI Elements**: Buttons, badges, inputs, and other primitives
- **Components**: Atoms, molecules, organisms with documentation
- **Page Sections**: Structure of pages and layout patterns

### Design System Tabs

The design system page includes tabs for:
1. **Brand Identity** - Logo, fonts, core branding
2. **Colors** - Color palette with HEX values and usage
3. **Typography** - Font sizes, weights, and scales
4. **Spacing** - Spacing scale, border radius, padding
5. **UI Elements** - Buttons, badges, inputs, SVG elements
6. **Components** - Atomic design breakdown and documentation
7. **Page Sections** - Page composition and layout patterns

---

## Best Practices

### Do's

- ✓ Keep atoms small and focused
- ✓ Use TypeScript for type safety
- ✓ Define props interfaces before components
- ✓ Use absolute imports with `@/` alias
- ✓ Include optional `className` props for flexibility
- ✓ Use `cn()` for conditional classes
- ✓ Organize components by layer
- ✓ Keep styling in Tailwind classes
- ✓ Document complex components
- ✓ Use semantic HTML

### Don'ts

- ✗ Mix atoms, molecules, and organisms in the same folder
- ✗ Create components that are too general
- ✗ Use relative imports
- ✗ Inline complex styles
- ✗ Skip props interfaces
- ✗ Export multiple components from one file (usually)
- ✗ Use `any` type in TypeScript
- ✗ Create deep nesting of components without reason

---

## Adding New Components

### 1. Determine the Layer

Is this component:
- A basic building block? → **Atom**
- A simple combination of 2-3 atoms? → **Molecule**
- A complex combination or major UI section? → **Organism**
- A full page section? → **Page Section**

### 2. Create the File

```bash
# For atoms
touch src/components/atoms/component-name.tsx

# For molecules
touch src/components/molecules/component-name.tsx

# For organisms
touch src/components/organisms/component-name.tsx

# For sections
touch src/components/sections/component-name.tsx
```

### 3. Implement the Component

```typescript
interface ComponentNameProps {
  // Define props
}

export function ComponentName({}: ComponentNameProps) {
  return (
    <div>
      {/* Implementation */}
    </div>
  );
}
```

### 4. Use the Component

```typescript
import { ComponentName } from "@/components/atoms/component-name";

export function ParentComponent() {
  return <ComponentName />;
}
```

---

## Troubleshooting

### Import errors after moving files

If you move a component, update all imports:

```bash
# Find all files importing the old path
grep -r "from \"@/components/old-path\"" src/

# Update imports manually or use find/replace
```

### Component not rendering

Check:
1. Is it exported correctly?
2. Are all imports valid?
3. Are `"use client"` directives present for interactive components?
4. Are TypeScript types correct?

### Styling not applied

Check:
1. Are Tailwind classes spelled correctly?
2. Is the component using `cn()` for conditional classes?
3. Is the parent container constraining width/height?
4. Are there conflicting class names?

---

## References

- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/)

