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
- `src/components/` - React components (ui/, custom components)
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
- Long lines broken appropriately</content>
</xai:function_call">## AGENTS.md - Source Living Project

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
- `src/components/` - React components (ui/, custom components)
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
- Long lines broken appropriately</content>
</xai:function_call name="todo_write">
<parameter name="todos">[{"content": "Create AGENTS.md file with build commands, architecture info, and code style guidelines", "status": "completed", "priority": "high", "id": "analyze-codebase-create-agents-md"}]
