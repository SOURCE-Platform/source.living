# @w3rk17/circular-menu-next

A beautiful, animated circular menu component for Next.js applications with Three.js tunnel background effects and full dark mode support.

## Features

- 🎨 **Animated Three.js Background** - Stunning shader-based tunnel animation
- 🌓 **Dark Mode Support** - Built-in support for light/dark themes via next-themes
- 📱 **Mobile Responsive** - Perfect for mobile navigation
- 🎯 **Flexible Positioning** - Four corner positions (top-left, top-right, bottom-left, bottom-right)
- 🔄 **Scroll Behavior** - Smart hide/show on scroll with fade effects
- ⚡ **Performance Optimized** - Animation only runs when menu is open
- 🎛️ **Fully Customizable** - Props for size, colors, and behavior
- 📦 **TypeScript Ready** - Full type definitions included
- 🪶 **Zero Runtime Dependencies** - Only peer dependencies you likely already have

## Installation

```bash
npm install @w3rk17/circular-menu-next three @types/three next-themes
# or
yarn add @w3rk17/circular-menu-next three @types/three next-themes
```

## Quick Start

### 1. Setup Theme Provider

Wrap your app with `ThemeProvider` (using next-themes):

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Configure Tailwind

Update your `tailwind.config.js`:

```js
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@w3rk17/circular-menu-next/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of config
}
```

### 3. Import CSS

In your `app/globals.css` or root layout:

```css
@import '@w3rk17/circular-menu-next/styles.css';
```

### 4. Use the Component

```tsx
'use client'

import { CircularMenu, MenuItem } from '@w3rk17/circular-menu-next'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

export function MobileNav() {
  const { resolvedTheme } = useTheme()
  const router = useRouter()

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: null,
      onClick: () => router.push('/')
    },
    {
      id: 'about',
      label: 'About',
      icon: null,
      onClick: () => router.push('/about')
    }
  ]

  return (
    <CircularMenu
      items={menuItems}
      position="top-right"
      hideOnScroll={true}
      darkMode={resolvedTheme === 'dark'}
    />
  )
}
```

## API Reference

### CircularMenu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `MenuItem[]` | **required** | Array of menu items to display |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-left'` | Position of the menu button |
| `dotSize` | `number` | `12` | Size of the dot when closed (in pixels) |
| `expandedSize` | `number` | `42.5` | Size of the expanded circle (in rem) |
| `hideOnScroll` | `boolean` | `true` | Enable hide/show on scroll behavior |
| `triggerContent` | `React.ReactNode` | `undefined` | Custom content for the trigger button |
| `className` | `string` | `''` | Additional CSS classes |
| `darkMode` | `boolean` | `false` | Enable dark mode styling |

### MenuItem Interface

```typescript
interface MenuItem {
  id: string              // Unique identifier
  label: string           // Text label (can be empty if using icon)
  icon: React.ReactNode | null  // Custom icon/component
  onClick: () => void     // Click handler
}
```

## Advanced Usage

### With Custom Icons

```tsx
import { HomeIcon, UserIcon } from '@heroicons/react/24/outline'

const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: '',
    icon: <HomeIcon className="h-6 w-6" />,
    onClick: () => router.push('/')
  },
  {
    id: 'profile',
    label: '',
    icon: <UserIcon className="h-6 w-6" />,
    onClick: () => router.push('/profile')
  }
]
```

### With Theme Toggle

```tsx
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

export function MobileNav() {
  const { resolvedTheme, setTheme } = useTheme()
  
  const menuItems: MenuItem[] = [
    // ... other items
    {
      id: 'theme',
      label: '',
      icon: (
        <button onClick={(e) => {
          e.stopPropagation()
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
        }}>
          {resolvedTheme === 'dark' 
            ? <SunIcon className="h-6 w-6" /> 
            : <MoonIcon className="h-6 w-6" />
          }
        </button>
      ),
      onClick: () => {}
    }
  ]
  
  return <CircularMenu items={menuItems} darkMode={resolvedTheme === 'dark'} />
}
```

### Custom Styling

Override menu item styles in your CSS:

```css
.circular-menu-items button {
  padding: 1rem 1.5rem !important;
  font-size: 1.125rem !important;
}
```

Adjust z-index if needed:

```css
:root {
  --circular-menu-z-index: 10000;
  --circular-menu-items-z-index: 10002;
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Hydration mismatch | Use `'use client'` directive and check `mounted` state |
| Menu not visible | Increase `--circular-menu-z-index` in your CSS |
| Styles missing in production | Add package path to Tailwind `content` array |
| Dark mode not working | Ensure ThemeProvider is set up with `attribute="class"` |
| TypeScript errors | Install `@types/three` |

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Notes

- Three.js adds ~600KB to your bundle (gzipped)
- Animations only run when menu is open
- Component is client-side only (`'use client'`)
- Uses RequestAnimationFrame for smooth 60fps animations

## License

MIT

## Credits

Created by adam_janowitz
