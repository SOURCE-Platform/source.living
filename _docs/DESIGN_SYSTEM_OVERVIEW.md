# SOURCE Design System Overview

## 🎨 What Was Created

A complete, modern design system for the SOURCE project with:
- ✓ Atomic design component structure
- ✓ Interactive design system documentation at `/design`
- ✓ Comprehensive architectural guides
- ✓ Brand identity and design tokens
- ✓ Component library with 12+ components
- ✓ Responsive design patterns
- ✓ Dark/light mode support

---

## 🗂️ Component Organization

Components are now organized using **Atomic Design Principles**:

```
src/components/
├── atoms/                    (2 components)
│   ├── svg-circle.tsx
│   └── icons/
│       └── source-logo.tsx
├── molecules/                (4 components)
│   ├── theme-toggle.tsx
│   ├── theme-provider.tsx
│   ├── grid-overlay.tsx
│   └── grid-overlay-toggle.tsx
├── organisms/                (3 components)
│   ├── main-header.tsx
│   ├── nav-island.tsx
│   └── background-animation.tsx
├── sections/                 (ready for expansion)
│   └── (future page sections)
└── ui/                       (3 shadcn/ui components)
    ├── button.tsx
    ├── dropdown-menu.tsx
    └── scroll-area.tsx
```

### Component Count by Layer
- **Atoms**: 2 (primitives)
- **Molecules**: 4 (simple combinations)
- **Organisms**: 3 (complex combinations)
- **Sections**: 0 (ready for page sections)
- **UI**: 3 (shadcn/ui base)

**Total**: 12 components properly organized

---

## 🎯 Design System Access

### Interactive Design Documentation
Visit **`/design`** in your browser to see:

#### 1. **Brand Identity Tab**
- SOURCE logo (pictogram and wordmark)
- PP Mori font family details
- Font weights (200, 400, 600)
- Font styles (Normal, Italic)

#### 2. **Colors Tab**
- Primary, Background, Foreground colors
- Light and dark mode variants
- HEX color codes
- Semantic color meanings
- Gradient definitions

#### 3. **Typography Tab**
- Type scale (Display, H1-H3, Body, Small)
- Font weight options
- Usage guidelines
- Responsive text sizing

#### 4. **Spacing Tab**
- Spacing scale (xs, sm, md, lg, xl, 2xl, 3xl)
- Border radius values (sm, md, lg, xl)
- Common responsive padding patterns

#### 5. **UI Elements Tab**
- Button variants
- Badges and tags
- Form inputs
- Checkboxes and radio buttons
- SVG icons and elements

#### 6. **Components Tab**
- Atoms breakdown with examples
- Molecules and their purpose
- Organisms and functionality
- Page sections documentation

#### 7. **Page Sections Tab**
- Home page structure
- Hardware/Software/Open Source pages
- Responsive design guidelines
- Layout principles

---

## 📚 Documentation Files

### 1. **COMPONENT_ARCHITECTURE.md** (Main Guide)
- Complete component organization
- Atomic design principles
- File structure and naming conventions
- Component patterns and best practices
- Adding new components
- Troubleshooting guide

### 2. **DESIGN_SYSTEM_STRUCTURE.md** (Design Tokens)
- Page hierarchy
- Brand identity details
- Colors and typography
- Spacing and design tokens
- Design system features

### 3. **AGENTS.md** (Project Reference)
- Build commands
- Architecture overview
- Code style guidelines
- Component organization quick reference

### 4. **_docs/QUICK_REFERENCE.md** (Developer Cheat Sheet)
- Quick component lookup table
- Import examples
- Common Tailwind classes
- Design tokens quick access
- Code snippets

### 5. **_docs/DESIGN_SYSTEM_OVERVIEW.md** (This File)
- High-level overview
- What was created
- How to use it

---

## 💡 Key Features

### Atomic Design Pattern
```
Atoms → Molecules → Organisms → Page Sections → Pages
```
- **Atoms**: Buttons, icons, primitives
- **Molecules**: Theme toggle, grid overlay, simple UI
- **Organisms**: Headers, navigation, background animations
- **Page Sections**: Hero, grids, content sections
- **Pages**: Complete Next.js pages

### Consistent Imports
All components use absolute imports with `@/` alias:
```typescript
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { MainHeader } from "@/components/organisms/main-header";
import { SourceLogo } from "@/components/atoms/icons/source-logo";
```

### Design Tokens
Centralized in `src/app/globals.css`:
- CSS custom properties for colors
- Responsive breakpoints (sm, md, lg, xl, 2xl)
- Typography variables
- Border radius scales
- Shadow definitions

### Theme Support
- Light/dark mode via `next-themes`
- CSS variables for seamless theme switching
- No component-level theme logic needed

### Responsive Design
- Mobile-first approach
- Tailwind breakpoints (640px, 768px, 1024px, 1280px, 1536px)
- Flexible spacing and sizing

---

## 🚀 Getting Started

### View Design System
```bash
# Start dev server
npm run dev

# Visit browser
http://localhost:3000/design
```

### Add a New Component

1. **Determine layer** (atoms, molecules, organisms, sections)
2. **Create file**: `src/components/{layer}/component-name.tsx`
3. **Define props interface**: `ComponentNameProps`
4. **Implement component**
5. **Import with absolute path**: `@/components/{layer}/component-name`

Example:
```typescript
// src/components/atoms/badge.tsx
interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Badge({ label, variant = "primary", className }: BadgeProps) {
  return (
    <span className={cn("px-3 py-1 rounded-full", className)}>
      {label}
    </span>
  );
}
```

### Use New Component
```typescript
import { Badge } from "@/components/atoms/badge";

export function MyComponent() {
  return <Badge label="New Feature" variant="primary" />;
}
```

---

## 🎨 Color Palette

### Light Mode
| Color | Value | Usage |
|-------|-------|-------|
| Primary | #2a2a30 | Branding, primary actions |
| Background | #ffffff | Page background |
| Foreground | #000000 | Primary text |
| Secondary | #eeeffc | Secondary surfaces |
| Muted | #5a5a5a | Secondary text |
| Border | #dfe0e8 | Borders, dividers |

### Dark Mode
| Color | Value | Usage |
|-------|-------|-------|
| Primary | #cdcdd7 | Branding, primary actions |
| Background | #171720 | Page background |
| Foreground | #ffffff | Primary text |
| Secondary | #343442 | Secondary surfaces |
| Muted | #cccccc | Secondary text |
| Border | rgba(255,255,255,0.08) | Borders, dividers |

---

## 📐 Typography

**Font**: PP Mori (local)

**Weights**:
- 200 - Extralight (light emphasis)
- 400 - Regular (body text)
- 600 - SemiBold (headings)

**Styles**:
- Normal
- Italic

**Type Scales**:
- Display: text-5xl
- H1: text-4xl
- H2: text-3xl
- H3: text-xl
- Body: text-base
- Small: text-sm
- XSmall: text-xs

---

## 📏 Spacing Scale

| Size | Value | Usage |
|------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Small gaps |
| md | 16px | Default gaps |
| lg | 24px | Medium spacing |
| xl | 32px | Large spacing |
| 2xl | 48px | Very large spacing |
| 3xl | 64px | Huge spacing |

---

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

### Conditional Styling
```tsx
<button className={cn(
  "px-4 py-2 rounded",
  active && "bg-primary text-white"
)}>
  Click
</button>
```

### Dark Mode
```tsx
<div className="bg-white dark:bg-zinc-900 text-black dark:text-white">
  Content
</div>
```

---

## ✅ Build Status

✓ **Build**: Successful
✓ **TypeScript**: Strict mode enabled
✓ **ESLint**: All rules passing
✓ **Components**: All imports working
✓ **Pages**: 32 routes generated

---

## 📖 Quick Links

| Document | Purpose |
|----------|---------|
| `/design` | Interactive design system (in-app) |
| `COMPONENT_ARCHITECTURE.md` | Full component guide |
| `DESIGN_SYSTEM_STRUCTURE.md` | Design tokens reference |
| `AGENTS.md` | Project commands and structure |
| `_docs/QUICK_REFERENCE.md` | Developer cheat sheet |
| `_docs/DESIGN_SYSTEM_OVERVIEW.md` | This file |

---

## 🎓 Learning Resources

### Atomic Design
- [Atomic Design by Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)

### Technologies Used
- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

---

## 🔄 Next Steps

### Ready to Implement
1. **Page Sections** - Create hero, grid, content sections in `src/components/sections/`
2. **Additional Atoms** - Add more icon components as needed
3. **More Molecules** - Create dropdown, modal, popover combinations
4. **Form Components** - Build accessible form elements

### Suggested Additions
- [ ] `HeroSection` component in sections/
- [ ] `ProductCard` molecule
- [ ] `IssueGrid` molecule for problems display
- [ ] `Modal` organism
- [ ] `Dropdown` enhancement
- [ ] Custom icons/SVGs as atoms

---

## 📞 Support

For questions about the component architecture:
1. Check `COMPONENT_ARCHITECTURE.md` for detailed explanation
2. Visit `/design` for interactive examples
3. Review `QUICK_REFERENCE.md` for quick lookup
4. Check existing components for patterns

---

**Design System Complete** ✨

All components are organized, documented, and ready for use. The `/design` route provides a beautiful, interactive reference for the entire design system.
