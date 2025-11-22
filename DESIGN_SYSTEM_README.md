# SOURCE Design System

A comprehensive, modern design system for the SOURCE marketing site built with Next.js, Tailwind CSS, and Atomic Design principles.

## 🚀 Quick Start

### View the Design System
Open your browser and navigate to: **`/design`**

This interactive documentation includes everything you need to know about:
- Brand Identity (logos, fonts)
- Colors (light/dark palettes)
- Typography (scales, weights)
- Spacing (grid, padding, radius)
- UI Elements (buttons, badges, inputs)
- Components (atoms, molecules, organisms)
- Page Sections (layout patterns)

## 📂 Component Organization

Components follow **Atomic Design** principles:

```
Atoms
├── svg-circle.tsx
└── icons/source-logo.tsx

Molecules
├── theme-toggle.tsx
├── theme-provider.tsx
├── grid-overlay.tsx
└── grid-overlay-toggle.tsx

Organisms
├── main-header.tsx
├── nav-island.tsx
└── background-animation.tsx

UI (shadcn/ui)
├── button.tsx
├── dropdown-menu.tsx
└── scroll-area.tsx
```

**Location**: `src/components/`

## 📚 Documentation

### Main Guides
- **[COMPONENT_ARCHITECTURE.md](COMPONENT_ARCHITECTURE.md)** - Complete guide to component organization, patterns, and best practices
- **[DESIGN_SYSTEM_STRUCTURE.md](DESIGN_SYSTEM_STRUCTURE.md)** - Brand identity, colors, typography, and design tokens
- **[AGENTS.md](AGENTS.md)** - Project commands and quick reference

### Additional Resources
- **[_docs/QUICK_REFERENCE.md](_docs/QUICK_REFERENCE.md)** - Developer cheat sheet with imports, classes, and patterns
- **[_docs/DESIGN_SYSTEM_OVERVIEW.md](_docs/DESIGN_SYSTEM_OVERVIEW.md)** - High-level overview of what was created

## 💻 Development

### Build Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

### View Design System
```bash
npm run dev
# Visit: http://localhost:3000/design
```

## 🎨 Design Tokens

### Colors
- **Primary**: #2a2a30 (light), #cdcdd7 (dark)
- **Background**: #ffffff (light), #171720 (dark)
- **Foreground**: #000000 (light), #ffffff (dark)
- **Muted**: #5a5a5a (light), #cccccc (dark)
- **Border**: #dfe0e8 (light), rgba(255,255,255,0.08) (dark)

### Typography
- **Font**: PP Mori (local)
- **Weights**: 200 (Extralight), 400 (Regular), 600 (SemiBold)
- **Styles**: Normal, Italic

### Spacing
- Scale: xs (4px), sm (8px), md (16px), lg (24px), xl (32px), 2xl (48px), 3xl (64px)
- Border Radius: sm (6px), md (8px), lg (10px), xl (14px)

### Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## 🧩 Component Pattern

All components follow this pattern:

```typescript
// Define props interface
interface ComponentNameProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

// Export component
export function ComponentName({
  children,
  className,
  variant = "primary",
}: ComponentNameProps) {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  );
}
```

## 📦 Import Examples

```typescript
// Atoms (primitives)
import { SvgCircle } from "@/components/atoms/svg-circle";
import { SourceLogo } from "@/components/atoms/icons/source-logo";

// Molecules (simple combinations)
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { ThemeProvider } from "@/components/molecules/theme-provider";

// Organisms (complex combinations)
import { MainHeader } from "@/components/organisms/main-header";
import { BackgroundAnimation } from "@/components/organisms/background-animation";

// UI (shadcn/ui)
import { Button } from "@/components/ui/button";

// Utilities
import { cn } from "@/lib/utils";
```

## 🎯 Common Patterns

### Responsive Padding
```tsx
<div className="px-6 sm:px-12 lg:px-20 xl:px-32 2xl:px-48">
  Content
</div>
```

### Grid Layout
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map(item => <Item key={item.id} {...item} />)}
</div>
```

### Conditional Classes
```tsx
<button className={cn(
  "px-4 py-2 rounded font-medium",
  active && "bg-primary text-white"
)}>
  Click me
</button>
```

### Dark Mode
```tsx
<div className="bg-white dark:bg-zinc-900 text-black dark:text-white">
  Content works in both light and dark modes
</div>
```

## 🚀 Adding Components

### Step 1: Determine Layer
- **Atoms**: Single, primitive UI elements
- **Molecules**: Simple combination of 2-3 atoms
- **Organisms**: Complex combinations
- **Sections**: Full page sections

### Step 2: Create File
```bash
touch src/components/{layer}/component-name.tsx
```

### Step 3: Implement
```typescript
// src/components/molecules/example-button.tsx
interface ExampleButtonProps {
  label: string;
  className?: string;
}

export function ExampleButton({ label, className }: ExampleButtonProps) {
  return (
    <button className={cn("px-4 py-2 rounded-lg font-medium", className)}>
      {label}
    </button>
  );
}
```

### Step 4: Use
```typescript
import { ExampleButton } from "@/components/molecules/example-button";

export function MyComponent() {
  return <ExampleButton label="Click me" />;
}
```

## 🔍 Useful Resources

### Project Files
- `src/app/design/page.tsx` - Interactive design system (view at `/design`)
- `src/app/globals.css` - Design tokens and CSS variables
- `src/components/` - Component directory with atomic structure
- `COMPONENT_ARCHITECTURE.md` - Full component guide
- `DESIGN_SYSTEM_STRUCTURE.md` - Design tokens and brand identity

### External Links
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ✨ Features

✓ **Atomic Design** - Organized component hierarchy  
✓ **Interactive Documentation** - View at `/design` route  
✓ **Design Tokens** - Centralized in CSS variables  
✓ **Dark Mode** - Built-in light/dark support  
✓ **Responsive** - Mobile-first design approach  
✓ **TypeScript** - Strict type safety  
✓ **Tailwind CSS** - Utility-first styling  
✓ **shadcn/ui** - Accessible component primitives  

## 🤝 Contributing

When adding new components:
1. Follow the atomic design hierarchy
2. Define props interface before component
3. Include optional `className` prop
4. Use `cn()` utility for conditional classes
5. Add TypeScript types for all props
6. Update documentation if creating new component layer

## 📊 Component Status

- **Atoms**: 2 components (complete)
- **Molecules**: 4 components (complete)
- **Organisms**: 3 components (complete)
- **Sections**: Ready for implementation
- **UI**: 3 shadcn/ui components (complete)

**Total**: 12 components organized and documented

## 🎓 Next Steps

1. ✓ Review component structure at `/design`
2. ✓ Read COMPONENT_ARCHITECTURE.md for detailed patterns
3. ✓ Start using components with `@/components/` imports
4. ✓ Add new page sections in `src/components/sections/`
5. ✓ Create additional atoms and molecules as needed

---

**Design system complete and ready to use!**

Visit `/design` to explore the full interactive documentation.
