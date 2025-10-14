## 2025-10-15 - Section badges, video placeholders, and favicon restore

**Problem:** Section headers still used outdated micro-labels, video placeholders lacked refined styling, architecture cards were missing media slots, the Three.js gradient component had a malformed return causing build failures, and the favicon no longer matched the white-circle branding.

**Root Cause:** Prior iterations introduced partial UI updates without replacing legacy markup, left placeholder styling untouched, truncated the JSX return in `ThreeGradientBackground.tsx`, and added a `.ico` reference overriding the desired SVG/favicon assets.

**Solution:**
1. Replaced micro-label text with sized `SvgCircle` markers, added spacing, and inserted architecture video placeholders in `src/app/page.tsx`.
2. Restyled `.video-frame` in `src/app/globals.css` to remove shadows, lighten dark-mode fill, enlarge the play icon, and render a rounded equilateral triangle SVG.
3. Restored the JSX return block in `src/three-bg-kit/ThreeGradientBackground.tsx` and removed the `.ico` favicon reference in `src/app/layout.tsx`.

**Files Modified:**
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/three-bg-kit/ThreeGradientBackground.tsx`
- `src/app/layout.tsx`

**Outcome:** Landing sections now feature consistent white circle markers with balanced spacing, architecture cards include dedicated video placeholders, the play icon and background styling align with the updated visual direction, the Three.js background compiles cleanly, and the favicon reverts to the branded white circle.

## 2025-10-14 - Integrated Three.js and CSS background system

**Problem:** The marketing site required an animated background experience that matched existing gradient branding, plus tooling to switch between WebGL and CSS implementations with configurable controls.

**Root Cause:** The project lacked a reusable Three.js integration, state management for background presets, and UI controls to manage gradient parameters while preserving the legacy CSS gradient option.

**Solution:**
1. Added a `three-bg-kit/` module with providers, shaders, and presets to render the animated gradient and expose settings.
2. Built `BackgroundAnimation` and expanded global styling to coordinate theme-specific colors, CSS fallback behavior, and favicon assets.
3. Implemented a control panel with tabs for CSS, Simple, Advanced, and Dither options, including editable colors, scaling, angle, and animation controls that update both Three.js and CSS backgrounds.

**Files Modified:**
- `package.json`
- `package-lock.json`
- `public/favicon.ico`
- `public/favicon.png`
- `public/favicon.svg`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/svg-circle.tsx`
- `src/components/background-animation.tsx`
- `src/three-bg-kit/GradientControls.tsx`
- `src/three-bg-kit/PostProcessor.tsx`
- `src/three-bg-kit/ThreeBGContext.tsx`
- `src/three-bg-kit/ThreeGradientBackground.tsx`
- `src/three-bg-kit/index.ts`
- `src/three-bg-kit/presets.ts`
- `src/three-bg-kit/shaders/ditherShader.ts`

**Outcome:** The site now supports both Three.js and CSS gradient backgrounds with full control over colors, scale, angles, and animation, providing a flexible visual experience that aligns with theme colors and preserves branding assets.

## 2025-10-13 - Implement themed landing page and wrap workflow docs

**Problem:** The new marketing site lacked theming support, focused landing content, and end-of-session documentation guidance.

**Root Cause:** The scaffolded Next.js project only contained the default template without custom components or workflows for theme management and documentation.

**Solution:**
1. Added theme infrastructure, including `ThemeProvider()` and `ThemeToggle()` components, and wired them through `src/app/layout.tsx`.
2. Replaced the default landing page with a centered `SvgCircle()` element sized to the viewport and ensured dark/light backgrounds transition smoothly.
3. Created `_docs/` directories plus wrap-up workflow documentation to standardize session endings.

**Files Modified:**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/theme-provider.tsx`
- `src/components/theme-toggle.tsx`
- `src/components/svg-circle.tsx`
- `_docs/commands/wrap.md`
- `_docs/dev_diary/devlog.md`

**Outcome:** The app now presents a centered 80% viewport circle with smooth theme toggling, and contributors have clear wrap-up instructions alongside an up-to-date development log.
