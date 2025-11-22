# AGENTS.md - Source Living Project

## Build/Lint/Test Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- No test scripts configured

## Architecture & Structure
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with custom design system
- **UI**: shadcn/ui components (Radix UI primitives)
- **3D**: Three.js for background gradient animations
- **Fonts**: Local PP Mori font family
- **Themes**: Light/dark mode with next-themes
- **Path Aliases**: `@/` maps to `./src/`

### Key Directories
- `src/app/` - Next.js app router pages and layout
- `src/components/` - React components (organized by atomic design)
- `src/lib/` - Utilities and shared code
- `src/three-bg-kit/` - Three.js background animation system
- `src/fonts/` - Local font files
- `public/` - Static assets

### No Backend/Database
This is a frontend-only marketing site with no API routes, database, or server components.

## Code Style Guidelines

### TypeScript
- Strict mode enabled
- Explicit types for props, avoid `any`
- Interface naming: PascalCase with descriptive names
- Props interface before component definition

### Components
- PascalCase naming (e.g., `SvgCircle`, `ThemeToggle`)
- Default export functions
- Props destructuring with default values
- Optional `className` prop for styling
- Use `role` and `aria-label` for accessibility

### Imports
- Absolute imports with `@/` alias
- Group: React imports, then external libs, then internal
- One import per line for clarity

### Styling
- Tailwind CSS classes directly in JSX
- Use `cn()` utility for conditional classes (clsx + tailwind-merge)
- Responsive design with sm:/lg:/xl: breakpoints
- Custom CSS variables for theming
- Dark mode support with `dark:` prefix

### Naming Conventions
- **Components**: PascalCase (e.g., `BackgroundAnimation`)
- **Files**: kebab-case (e.g., `theme-provider.tsx`)
- **Variables**: camelCase
- **CSS Classes**: kebab-case in Tailwind
- **Types**: PascalCase (e.g., `SvgCircleProps`)

### Error Handling
- TypeScript strict mode catches most errors
- ESLint for code quality
- No custom error boundaries visible

### Formatting
- ESLint with Next.js config (auto-formatting expected)
- Consistent spacing and indentation
- Long lines broken appropriately

## Component Organization (Atomic Design)

### Folder Structure
Components organized by atomic design hierarchy in `src/components/`:

```
src/components/
├── atoms/                 # Primitive, indivisible elements
│   ├── svg-circle.tsx
│   └── icons/
│       └── source-logo.tsx
├── molecules/             # Simple atom combinations
│   ├── theme-toggle.tsx
│   ├── theme-provider.tsx
│   ├── grid-overlay.tsx
│   └── grid-overlay-toggle.tsx
├── organisms/             # Complex combinations
│   ├── main-header.tsx
│   ├── nav-island.tsx
│   └── background-animation.tsx
├── sections/              # Large reusable page sections
│   └── (future page sections)
└── ui/                    # shadcn/ui base components
    ├── button.tsx
    ├── dropdown-menu.tsx
    └── scroll-area.tsx
```

### Import Standards
Always use absolute imports with `@/` alias:

```typescript
// Atoms
import { SvgCircle } from "@/components/atoms/svg-circle";
import { SourceLogo } from "@/components/atoms/icons/source-logo";

// Molecules
import { ThemeToggle } from "@/components/molecules/theme-toggle";
import { ThemeProvider } from "@/components/molecules/theme-provider";

// Organisms
import { MainHeader } from "@/components/organisms/main-header";
import { NavIsland } from "@/components/organisms/nav-island";

// UI (shadcn)
import { Button } from "@/components/ui/button";

// Utilities
import { cn } from "@/lib/utils";
```

### Component Hierarchy
- **Atoms**: Single, primitive UI elements (buttons, icons, simple shapes)
- **Molecules**: Simple combinations of atoms (theme toggle, logo with text)
- **Organisms**: Complex combinations of molecules and atoms (headers, navigation, backgrounds)
- **Sections**: Large reusable page sections (hero, grid sections, footer areas)
- **Pages**: Complete Next.js pages using sections

## Design System

### Interactive Documentation
Visit `/design` route for full design system documentation with tabs for:
- **Brand Identity** - Logos, fonts, and core branding elements
- **Colors** - Complete color palette with light/dark variants
- **Typography** - Type scales, font weights, and usage guidelines
- **Spacing** - Spacing scale, border radius, padding patterns
- **UI Elements** - Buttons, badges, inputs, SVG elements
- **Components** - Atomic design breakdown with examples
- **Page Sections** - Page composition and layout patterns

### Documentation Files
- `COMPONENT_ARCHITECTURE.md` - Comprehensive component organization guide
- `DESIGN_SYSTEM_STRUCTURE.md` - Design tokens, brand identity, atomic structure

### Design Tokens
All design tokens defined in `src/app/globals.css`:
- Colors with CSS custom properties
- Breakpoints for responsive design
- Typography variables
- Border radius scales
- Shadow definitions
