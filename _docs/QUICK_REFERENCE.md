# SOURCE Design System - Quick Reference Guide

## Design System Access

**View at**: `/design` route in the browser

**Interactive tabs**:
1. Brand Identity - Logos, fonts, brand elements
2. Colors - Color palette with HEX values
3. Typography - Font sizes and scales
4. Spacing - Spacing scale and border radius
5. UI Elements - Buttons, badges, inputs
6. Components - Atoms, molecules, organisms
7. Page Sections - Page structure and layout

---

## Component Quick Lookup

### Atoms (Primitive Elements)

| Component | Path | Purpose |
|-----------|------|---------|
| SvgCircle | `atoms/svg-circle.tsx` | Animated SVG circle |
| SourceLogo | `atoms/icons/source-logo.tsx` | Logo + wordmark |

### Molecules (Simple Combinations)

| Component | Path | Purpose |
|-----------|------|---------|
| ThemeToggle | `molecules/theme-toggle.tsx` | Light/dark switcher |
| ThemeProvider | `molecules/theme-provider.tsx` | Theme context |
| GridOverlay | `molecules/grid-overlay.tsx` | Dev grid overlay |
| GridOverlayToggle | `molecules/grid-overlay-toggle.tsx` | Grid visibility toggle |

### Organisms (Complex Combinations)

| Component | Path | Purpose |
|-----------|------|---------|
| MainHeader | `organisms/main-header.tsx` | Sticky header with scroll behavior |
| NavIsland | `organisms/nav-island.tsx` | Floating navigation menu |
| BackgroundAnimation | `organisms/background-animation.tsx` | Three.js gradient background |

### UI Components (shadcn/ui)

| Component | Path | Purpose |
|-----------|------|---------|
| Button | `ui/button.tsx` | Base button component |
| DropdownMenu | `ui/dropdown-menu.tsx` | Dropdown menu |
| ScrollArea | `ui/scroll-area.tsx` | Custom scroll container |

---

## Import Examples

```typescript
// Atoms
import { SvgCircle } from "@/components/atoms/svg-circle";
import { SourceLogo } from "@/components/atoms/icons/source-logo";

// Molecules
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { ThemeProvider } from "@/components/molecules/theme-provider";

// Organisms
import { MainHeader } from "@/components/organisms/main-header";
import { BackgroundAnimation } from "@/components/organisms/background-animation";

// UI
import { Button } from "@/components/ui/button";

// Utilities
import { cn } from "@/lib/utils";
```

---

## Common Tailwind Classes

### Spacing
- `px-6 sm:px-12 lg:px-20 xl:px-32 2xl:px-48` - Page padding
- `gap-6`, `gap-12`, `gap-24` - Component spacing
- `py-12` - Vertical padding

### Typography
- `text-5xl sm:text-4xl` - Display text
- `text-base font-semibold` - Headings
- `text-sm text-muted-foreground` - Secondary text

### Colors
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `bg-background` - Main background
- `border border-border` - Borders

### Responsive
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

### Dark Mode
- `dark:bg-zinc-900` - Dark mode background
- `dark:text-white` - Dark mode text

---

## Design Tokens

### Colors (CSS Variables)
```css
--primary: #2a2a30
--foreground: #000000 (light), #ffffff (dark)
--background: #ffffff (light), #171720 (dark)
--muted: #5a5a5a (light), #cccccc (dark)
--border: #dfe0e8 (light), rgba(255,255,255,0.08) (dark)
```

### Typography
- **Font**: PP Mori (local)
- **Weights**: 200 (Extralight), 400 (Regular), 600 (SemiBold)
- **Sizes**: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl

### Border Radius
- `sm`: 6px
- `md`: 8px
- `lg`: 10px (default)
- `xl`: 14px

### Spacing Scale
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

---

## File Structure

```
src/
├── components/
│   ├── atoms/              # Basic building blocks
│   ├── molecules/          # Atom combinations
│   ├── organisms/          # Complex combinations
│   ├── sections/           # Page sections
│   └── ui/                 # shadcn/ui components
├── app/                    # Next.js pages
│   ├── layout.tsx
│   ├── page.tsx            # Home
│   ├── design/page.tsx     # Design system
│   ├── hardware/
│   ├── software/
│   └── open-source/
├── lib/
│   ├── utils.ts            # cn() utility
│   └── navigation.ts
├── three-bg-kit/           # Three.js animations
├── fonts/                  # PP Mori font files
└── app/globals.css         # Design tokens
```

---

## Component Pattern

```typescript
// Always define props interface
interface ComponentNameProps {
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
}

// Create component with clear exports
export function ComponentName({ 
  label, 
  variant = "primary", 
  className 
}: ComponentNameProps) {
  return (
    <div className={cn("base-classes", className)}>
      {label}
    </div>
  );
}
```

---

## Adding a New Component

1. **Determine layer**: Is it atoms → molecules → organisms → sections?
2. **Create file**: `src/components/{layer}/component-name.tsx`
3. **Define props**: Create `ComponentNameProps` interface
4. **Implement**: Use component with proper imports
5. **Use**: Import with absolute path `@/components/{layer}/component-name`

---

## Responsive Design Pattern

```typescript
// Mobile-first approach
<div className="
  px-4 sm:px-6 lg:px-8     // Horizontal padding
  py-6 sm:py-12 lg:py-16  // Vertical padding
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  // Grid
  gap-4 sm:gap-6 lg:gap-8  // Gaps
">
```

---

## Dark Mode Support

```typescript
// Automatically handled by Tailwind
<div className="
  bg-white text-black         // Light mode
  dark:bg-zinc-900 dark:text-white  // Dark mode
">
```

---

## Useful Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production server
npm run start

# Linting
npm run lint

# Format with Prettier (if configured)
npm run format
```

---

## Documentation Files

- **COMPONENT_ARCHITECTURE.md** - Detailed component guide and patterns
- **DESIGN_SYSTEM_STRUCTURE.md** - Brand identity and design tokens
- **AGENTS.md** - Build commands and project structure
- **/design** - Interactive design system (in-app)

---

## Tips & Tricks

### Using cn() for Conditional Classes
```typescript
<button className={cn(
  "px-4 py-2 rounded",
  active && "bg-primary text-white"
)}>
  Click me
</button>
```

### Responsive Text Sizing
```typescript
<h1 className="text-4xl sm:text-5xl lg:text-6xl">
  Big Title
</h1>
```

### Flexible Component Styling
```typescript
// Always include optional className prop
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-card p-4 rounded-lg", className)}>
      {children}
    </div>
  );
}
```

### Group Hover Effects
```typescript
<div className="group hover:bg-muted/30">
  <span className="group-hover:text-foreground">
    Hover me
  </span>
</div>
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Import not found | Check path uses `@/components/{layer}/` |
| Styles not applied | Verify Tailwind classes are correct |
| Dark mode not working | Add `dark:` prefix to classes |
| Component not rendering | Check `"use client"` directive if using hooks |
| Type errors | Ensure props interface is defined |

---

## Resources

- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)
