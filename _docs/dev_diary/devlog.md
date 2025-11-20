## 2025-11-20 - Enhance custom scrollbar with fade effects and spacing

**Problem:** The custom scrollbar needed visual refinement to improve UX. It was too wide, lacked spacing from viewport edges, remained visible when not scrolling, and over-scroll behavior exposed unwanted background colors at page boundaries.

**Root Cause:** The Radix UI ScrollArea component had default styling with full-width scrollbar (w-3), no margins, always-visible opacity, and the browser's native overscroll behavior was revealing the html element's background color when scrolling past content boundaries.

**Solution:**
1. Reduced scrollbar width from `w-3` to `w-1.5` (50% reduction)
2. Added scroll event listener to detect scrolling activity
3. Implemented fade-in/fade-out animation with 300ms transition
4. Scrollbar appears on scroll start and fades out after 1 second of inactivity
5. Added `mr-2` (right margin) for 2 units of spacing from right edge
6. Added `my-2` (vertical margins) for 2 units of spacing from top and bottom
7. Set scrollbar height to `calc(100% - 1rem)` to account for vertical margins
8. Added `overscroll-behavior: none` to both html and body elements to prevent rubber-banding
9. Applied gradient background to html element as fallback to ensure consistent appearance

**Files Modified:**
- `/src/components/ui/scroll-area.tsx` - Added scroll detection state, fade animations, and spacing
- `/src/app/globals.css` - Added overscroll-behavior prevention and html background gradient

**Outcome:** The scrollbar is now more subtle and polished. It's 50% narrower, only appears during scrolling activity with smooth fade transitions, maintains proper spacing from all viewport edges (2 units), and over-scroll behavior is disabled to prevent the background color inconsistency. The overall effect is a cleaner, more professional scrolling experience that doesn't distract from content.

## 2025-11-19 - Deploy site to GitHub Pages with custom domain source.living

**Problem:** The site needed to be deployed to a live URL for public access. GitHub Pages was chosen as the hosting platform, and the custom domain `source.living` needed to be configured with proper HTTPS.

**Root Cause:** Next.js 15 requires specific configuration for static export to GitHub Pages, including handling of basePath for repository subpaths, proper asset prefixing, and special considerations for custom domains. The build initially failed due to orphaned pages referencing non-existent navigation categories, TypeScript errors in Three.js shader code, and missing image/favicon paths.

**Solution:**
1. Configured Next.js for static export with `output: 'export'` and `images.unoptimized: true`
2. Initially added basePath `/source.living` for GitHub Pages subdirectory hosting
3. Created GitHub Actions workflow (`.github/workflows/deploy.yml`) for automated builds and deployments
4. Fixed build errors by removing orphaned pages (`/installation`, `/open-source`) that referenced non-existent categories
5. Added ESLint disable comments for necessary `any` types in Three.js shader uniform access
6. Hidden gradient controls button in production by removing controls UI
7. Updated logo and favicon paths to include basePath prefix
8. Configured Spaceship DNS with 4 A records pointing to GitHub's IPs and CNAME for www subdomain
9. Added custom domain `source.living` in GitHub Pages settings
10. Removed basePath configuration once custom domain was active (no longer needed subdirectory path)
11. Updated all asset paths to remove basePath after domain switch
12. Enabled HTTPS enforcement after SSL certificate was issued
13. Added new "Solution Space" section with heading and description
14. Swapped order of forecast items per user request
15. Adjusted Solution Space section with large top margin (`pt-32`)

**Files Modified:**
- `next.config.ts` - Static export config, basePath (later removed for custom domain)
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow
- `src/app/installation/page.tsx` - Deleted (orphaned page)
- `src/app/open-source/page.tsx` - Deleted (orphaned page)
- `src/components/background-animation.tsx` - Removed gradient controls, cleaned imports
- `src/three-bg-kit/PostProcessor.tsx` - Added ESLint disable for `any` types
- `src/three-bg-kit/ThreeGradientBackground.tsx` - Added ESLint disable for shader uniforms
- `src/components/source-logo.tsx` - Updated image paths (basePath added then removed)
- `src/app/layout.tsx` - Updated favicon paths (basePath added then removed)
- `src/app/page.tsx` - Added Solution Space section, swapped forecast items, added top margin

**Outcome:** The site is now successfully deployed and accessible at https://source.living with a valid SSL certificate. The deployment pipeline automatically builds and deploys changes when pushed to the main branch. All assets load correctly, HTTPS is enforced, and the site is production-ready. The CSS gradient background is set as default, gradient controls are hidden in production, and the new Solution Space section provides a clear transition from problem to solution.

## 2025-11-19 - Add star icon at 2x2 grid intersection and improve border styling

**Problem:** The 2x2 grid of categories needed a decorative star icon at the center intersection point, and the grid lines needed better visibility with darker colors in light mode and brighter in dark mode.

**Root Cause:** The grid borders were using `border-border/40` which had low contrast. The center intersection needed a visual anchor point to enhance the design. Using transparency for colors caused overlap artifacts.

**Solution:**
1. Changed grid borders from `border-border/40` to solid colors `#CCCCCC` (light) and `#333333` (dark)
2. Added star SVG icon positioned at the bottom-right corner of the Economic cell
3. Used `translate-x-1/2 translate-y-1/2` to center it on the border intersection
4. Converted star to inline SVG for color control
5. Applied same solid colors to star fill: `fill-[#CCCCCC] dark:fill-[#333333]`
6. Star size set to `size-12` (48px)
7. Position is deterministic - anchored to borders, not percentages

**Files Modified:**
- `src/app/page.tsx` - Star SVG at grid intersection, solid border colors
- `public/icons/star.svg` - New star icon asset

**Outcome:** The 2x2 category grid now has a decorative 4-pointed star at the center intersection that matches the border colors exactly. The borders are more visible with solid colors instead of transparency, and the star position will remain correct regardless of content changes.

## 2025-11-19 - Update text colors to neutral grays and redesign theme toggle

**Problem:** Text colors had blue/purple tints instead of pure white/black, the muted foreground color needed adjustment for better readability, and the theme toggle needed a complete redesign with universal icon, proper styling, and consistent hover states.

**Root Cause:** The foreground colors were using tinted values like `rgba(236, 236, 248, 1)` (blue-white) and `rgba(32, 31, 36, 1)` (blue-black) instead of pure white/black. The theme toggle used sun/moon icons which can confuse users, and had different styling than other popup elements.

**Solution:**
1. Changed light mode `--foreground` to pure black `rgba(0, 0, 0, 1)`
2. Changed dark mode `--foreground` to pure white `rgba(255, 255, 255, 1)`
3. Updated light mode `--muted-foreground` to darker gray `rgba(90, 90, 90, 1)`
4. Updated dark mode `--muted-foreground` to brighter gray `rgba(204, 204, 204, 1)`
5. Replaced sun/moon toggle icon with universal half-white/half-black circle
6. Changed button variant from outline to ghost, removed focus ring
7. Added matching hover state `hover:bg-black/5 dark:hover:bg-white/5`
8. Left-aligned dropdown menu with `align="start"`
9. Added icons to menu items: Sun (Light), Moon (Dark), Monitor (System)
10. Styled dropdown to match research popups: rounded-lg, border-border/70, p-3, matching shadows and backgrounds
11. Updated menu items with `hover:bg-muted/50 focus:bg-muted/50 rounded-md`

**Files Modified:**
- `src/app/globals.css` - Pure white/black foreground colors, adjusted muted grays
- `src/components/theme-toggle.tsx` - Universal icon, ghost button, styled dropdown

**Outcome:** All text colors are now pure neutral grays without any color tints, improving readability and maintaining visual consistency. The theme toggle has a universally recognizable icon and matches the styling of other popup elements throughout the site.

## 2025-11-19 - Add 2x2 forecast grid layout and custom eye cursor

**Problem:** The Forecasts section needed a better layout for its 4 articles, and the hover triggers for popup panels needed a distinctive cursor to indicate interactivity.

**Root Cause:** The forecast articles were stacked vertically with `space-y-10`, which didn't make efficient use of space. The default pointer cursor didn't communicate that hovering would reveal additional content.

**Solution:**
1. Changed Forecasts section from vertical stack to 2x2 grid with `grid grid-cols-2 gap-12`
2. Extended grid width beyond container with `-mx-24` for visual emphasis
3. Increased spacing between forecast header and grid from `space-y-8` to `space-y-16`
4. Created custom eye cursor SVG with filled shapes for light and dark modes
5. Added `.cursor-eye` CSS class with URL-encoded inline SVG cursors
6. Light mode: black eye with white pupil
7. Dark mode: white eye with black pupil
8. Applied `cursor-eye` class to all popup trigger spans

**Files Modified:**
- `src/app/page.tsx` - Forecast grid layout, spacing adjustments, cursor class
- `src/app/globals.css` - Custom eye cursor definitions for light/dark modes

**Outcome:** The Forecasts section now displays in a balanced 2x2 grid that's wider than other content, creating visual hierarchy. Users see a custom eye cursor when hovering over interactive items, clearly indicating that additional content will be revealed. The cursor adapts to light/dark themes for optimal visibility.

## 2025-11-19 - Enhance homepage with Economic/Political popups, UI refinements, and component extraction

**Problem:** The homepage needed additional interactive popup panels for Economic and Political sections (matching the existing Social and Technological patterns), improved popup positioning, hover states for trigger items, dark mode color adjustments, and the navigation island needed to be extracted into a reusable component for future use.

**Root Cause:** The initial homepage implementation only included popups for Social and Technological sections. Economic and Political sections were static text. The popup positioning was based on the full width of the list item rather than the text content, and various UI elements needed polish including hover states, dark mode colors, and shadow effects.

**Solution:**
1. Added `economicIssues` data array with 5 categories (Escalating Layoffs, AI Agentification, Supply Chain Disruptions, Erosion of Purchasing Power, Inflation) and their research article links
2. Added `politicalIssues` data array with 3 categories (Inadequate Problem Solving, Political Polarization, Erosion of Trust) and their research article links
3. Updated Economic and Political sections to use the same interactive popup pattern as Social/Technological
4. Improved popup positioning: changed from `left-full` on the `<li>` to positioning relative to the `<span>` text content with `ml-4` gap
5. Added vertical alignment with `-translate-y-[19px]` so first popup item aligns with trigger text
6. Added hover background states for trigger items: `group-hover:bg-black/5 dark:group-hover:bg-white/5` with `rounded-md px-2 -mx-2 py-1`
7. Changed popup article titles from muted to full intensity: `text-foreground` (white in dark mode, black in light mode)
8. Fixed dark mode muted foreground color from blue-tinted `rgba(171, 173, 199, 1)` to neutral gray `rgba(163, 163, 163, 1)`
9. Added white glow shadow for dark mode popups: `dark:shadow-[0_10px_40px_rgba(255,255,255,0.1)]`
10. Extracted NavIsland component from main-header.tsx into separate `nav-island.tsx` file for future reuse
11. Moved SourceLogo from header to homepage above "Setting the Stage" section
12. Removed logo from header, leaving only ThemeToggle
13. Adjusted section padding: decreased top padding from `pt-32` to `pt-10`, increased logo bottom margin from `mb-8` to `mb-24`

**Files Modified:**
- `src/app/page.tsx` - Added economicIssues/politicalIssues data, updated all 4 sections with popup pattern, improved positioning/styling
- `src/app/globals.css` - Fixed dark mode muted-foreground color to neutral gray
- `src/components/main-header.tsx` - Simplified to only ThemeToggle, removed logo and navigation island code
- `src/components/nav-island.tsx` - New component extracted for future navigation use

**Outcome:** All four homepage sections (Economic, Social, Political, Technological) now have interactive hover popups with curated research links. Popups are properly positioned relative to the trigger text with smooth transitions, hover states provide visual feedback, and dark mode has improved contrast with neutral grays and white glow shadows. The navigation island component is ready for future pages. The logo is prominently displayed on the homepage above the content.

## 2025-11-19 - Create new homepage with interactive research link panels

**Problem:** The existing homepage needed to be replaced with a new design based on Figma mockups. The new design features a "Setting the Stage" section with systemic conditions across Economic, Social, Political, and Technological categories, plus a "Forecasts" section. Each item in the Social and Technological sections needed hover-activated popup panels displaying curated research article links.

**Root Cause:** The original homepage had a different content structure focused on problem sets, solutions, use cases, and architecture. The new design required a complete restructure with a 2x2 grid layout and interactive citation panels for research references.

**Solution:**
1. Renamed the existing homepage to `OLD-homepage.tsx` to preserve it
2. Created new `page.tsx` with "Setting the Stage" and "Forecasts" sections matching Figma design
3. Built data structures for Social issues (6 categories) and Technological issues (5 categories) with article links
4. Implemented hover-activated popup panels with CSS transitions that appear to the right of each item
5. Added `getDomain()` helper function to extract and display website domains under each article title
6. Styled panels with rounded corners, shadows, dark mode support (`dark:bg-zinc-900`), and hover states
7. Removed newsletter subscription form from header as it was no longer needed
8. Created `.claude/commands/wrap.md` and `.claude/commands/handoff.md` for session documentation

**Files Modified:**
- `src/app/page.tsx` - Complete rewrite with new homepage design and interactive link panels
- `src/app/OLD-homepage.tsx` - Renamed from original page.tsx
- `src/components/main-header.tsx` - Removed newsletter form, cleaned up unused imports
- `.claude/commands/wrap.md` - New file for session wrap-up workflow
- `.claude/commands/handoff.md` - New file for developer handoff template

**Outcome:** Users now see a research-focused homepage with curated links to articles about systemic social and technological issues. Hovering over items in the Social and Technological sections reveals popup panels with clickable article titles and source domains. The design is clean, accessible, and provides evidence-based context for the platform's mission. The old homepage is preserved for reference.

## 2025-10-27 - Consolidate navigation structure into multi-column dropdowns with semantic grouping

**Problem:** The navigation was spread across 5 separate top-level items (Software, Hardware, Open-Source, Installation, Timeline), making the header cluttered. Related items should be grouped together in larger dropdown menus to reduce navigation complexity and create semantic relationships between products and processes.

**Root Cause:** The original structure treated each category as independent with its own dropdown, which didn't reflect the logical relationships—Open-Source belongs conceptually with Software, Installation belongs with Hardware, and Timeline phases (R&D, GTM, Scale) need visual differentiation.

**Solution:**
1. Consolidated Software nav: Merged "Open-Source" nav item into Software dropdown as right column alongside "APPS" column, removing standalone Open-Source nav item entirely.
2. Consolidated Hardware nav: Merged "Installation" nav item into Hardware dropdown as right column alongside "HARDWARE" column, removing standalone Installation nav item entirely.
3. Restructured Timeline nav: Split into 3 semantic columns (R&D, GTM, Scale) replacing the previous single-section Timeline. Reorganized items: R&D includes "HQ Manufacturing & Lab", "AI Research Lab", "Test Demo Site"; GTM keeps existing 2 items; Scale has new items "Sales for Gov Civic Space Contracts" and "Marketing for Consumers".
4. Added clickable section titles: All section headers within dropdowns are now Link components pointing to `/software#apps`, `/software#open-source`, `/hardware#hardware`, `/hardware#installation`, `/timeline/r&d`, `/timeline/gtm`, `/timeline/scale`.
5. Implemented dynamic dropdown sizing: Dropdowns now scale based on section count—420px for single-column, 840px for 2-column (Software/Hardware), 1260px for 3-column (Timeline).
6. Enhanced Timeline dropdown with visual decoration: Added SVG timeline visualization with horizontal line spanning the dropdown width and 3 circles positioned under each column (R&D, GTM, Scale), creating a visual phase progression indicator.
7. Updated rendering logic in main-header: Added conditional checks for 3-column layout with responsive grid styling, section title link generation based on nav item type, and SVG rendering only for Timeline 3-column layout.
8. Normalized section titles to uppercase: APPS, OPEN-SOURCE, HARDWARE, INSTALLATION, R&D, GTM, Scale for visual consistency and semantic clarity.

**Files Modified:**
- `src/lib/navigation.ts` - Consolidated nav structure, removed standalone Open-Source and Installation items, restructured Timeline into 3 columns with new items, added new route paths
- `src/components/main-header.tsx` - Added dynamic width logic, 3-column grid support, clickable section titles with conditional link generation, SVG timeline decoration for Timeline dropdown

**Outcome:** Navigation is now more logically organized with 4 top-level items (Software, Hardware, Timeline, removed: Open-Source and Installation). Users see clear semantic groupings in mega menus that reflect product/process relationships. The Timeline dropdown features an innovative visual timeline decoration showing the three phases of development (R&D → GTM → Scale). Section titles are clickable enabling direct navigation to page anchors or dedicated sections. The dropdown system is now flexible enough to support any number of columns (1-3+) with proper scaling. This reduces navigation cognitive load while maintaining full feature access.

## 2025-10-27 - Implement scroll-direction-aware floating header with smooth transitions

**Problem:** The header remained visible while scrolling down, taking up screen space and interfering with content. Additionally, when the floating navigation appeared, it would cause visual clipping of the hero SVG element beneath it. Users needed a smarter header that disappears on downward scroll and reappears as a floating island on upward scroll, without any layout disruption or content clipping.

**Root Cause:** The header used `sticky` positioning which kept it in the document flow and created a stacking context that caused content clipping. The header visibility was only threshold-based (scroll depth), not direction-aware, so it remained visible regardless of scroll direction. These positioning issues created visual artifacts where hero content appeared to be cut off.

**Solution:**
1. Added scroll direction tracking using `useRef` to track previous scroll position and detect whether user is scrolling up or down without causing unnecessary re-renders.
2. Introduced `isHeaderHidden` state to manage header visibility separately from floating state, enabling three distinct states: normal (visible at top), hidden (scrolled down), and floating (scrolled up).
3. Implemented scroll direction logic: when offset exceeds 120px threshold, only set `isFloating` to true if scrolling up; set to false immediately when scrolling down.
4. Changed header positioning from `sticky` to `fixed` to remove it from document flow entirely, preventing any layout interference or clipping.
5. Applied conditional header positioning: `fixed top-0` when normal, `fixed -top-full` when hidden, `fixed top-0 h-0` when floating (shows floating nav only).
6. Updated navigation positioning: absolute within header for normal state (centered at `top-[37.5px]` with `-translate-y-1/2` for perfect vertical centering), fixed to viewport when floating.
7. Conditioned navigation rendering: always render nav but change styling—transparent border and no backdrop in normal state, blur backdrop only when floating.
8. Cleaned up by removing conflicting translate-y values that were causing centering issues.

**Files Modified:**
- `src/components/main-header.tsx` - Complete scroll direction implementation, positioning logic, and state management
- `src/app/page.tsx` - Minor padding adjustment (py-24 → py-12) for better spacing

**Outcome:** The header now intelligently disappears when scrolling down and reappears as a floating island when scrolling up, providing a modern, distraction-free scrolling experience. The fixed positioning eliminates all clipping and layout issues. Navigation is perfectly centered in the normal header state and smoothly transitions to the floating state with proper visual styling. Users get the navigation benefits without the screen real estate penalty of a persistent sticky header.

## 2025-10-26 - Enhanced header navigation UI with descriptions and visual refinements

**Problem:** The header navigation needed visual improvements including: placeholder images for dropdowns, navigation item descriptions, better visual hierarchy, improved icon placement, and proper vertical alignment. Additionally, the SOURCE logo needed to be clickable to navigate to the homepage.

**Root Cause:** The initial navigation implementation was functional but visually minimal—icon placeholders were missing, descriptions weren't present in the data structure, and visual feedback on hover was insufficient. The logo wasn't wrapped as a clickable link.

**Solution:**
1. Added optional `description` field to `NavLinkItem` interface and populated all navigation items with one-line descriptions for context.
2. Made SOURCE logo clickable by wrapping it in a `Link` component pointing to the root URL "/" with proper focus states.
3. Increased placeholder image containers from 48x48px to 64x64px and removed dashed borders for a cleaner look.
4. Expanded dropdown menu width from 320px to 420px to accommodate icon-label-description layout.
5. Changed dropdown link styling from semi-transparent background (bg-muted/70) to fully transparent with hover effect (hover:bg-muted/20).
6. Increased spacing between dropdown items from `space-y-1.5` to `space-y-3` for better visual breathing room.
7. Fixed nav vertical centering by adjusting translate-y from 6 to 4 units and ensuring proper alignment with logo.
8. Added hover effects to top-level nav items: `hover:bg-muted/30` background change with smooth transitions.
9. Increased top-level nav font weight from `text-base` to `font-semibold` for better prominence.
10. Made dropdown container fully opaque by changing from `bg-card/95` with backdrop blur to solid `bg-background`.
11. Restructured dropdown items to display icon vertically aligned with label and description in a column layout.

**Files Modified:**
- `src/components/main-header.tsx` - Navigation structure, styling, and layout refinements
- `src/lib/navigation.ts` - Added descriptions to all navigation items, updated Hardware labels and URLs

**Outcome:** The header now presents a more sophisticated, information-rich navigation experience with: clear visual hierarchy through better spacing and typography, icon placeholders ready for SVG illustrations, descriptive text helping users understand each section before visiting, improved hover states providing clear interactive feedback, and proper alignment of all elements. The SOURCE logo is now clickable for easy navigation to the homepage.

## 2025-10-23 - Data-driven navigation with category routes

**Problem:** The header mega menu items were static labels without real navigation targets, and there were no category or subpage routes for users to land on.

**Root Cause:** The menu structure lived inline inside `MainHeader()` with plain strings for submenu items, and the `src/app/` directory lacked dynamic routes for categories and detail pages.

**Solution:**
1. Moved navigation definitions into `src/lib/navigation.ts` with typed helpers for finding categories and subpages.
2. Updated `MainHeader()` to render `Link` elements styled as full-width buttons, backed by the shared navigation data.
3. Added dynamic routes under `src/app/[category]/` and `src/app/[category]/[slug]/` to list section links and provide placeholder content for each subpage.

**Files Modified:**
- `src/components/main-header.tsx`
- `src/lib/navigation.ts`
- `src/app/[category]/page.tsx`
- `src/app/[category]/[slug]/page.tsx`

**Outcome:** Mega menu items now navigate to dedicated category pages with internal section links, submenu selections open their corresponding subpages, and the header dropdown presents fully clickable, accessible link buttons.

## 2025-10-20 - Floating navigation header with scroll transitions

**Problem:** The site needed a dynamic header that transitions from a full-width bar with logo and subscribe form to a compact floating navigation island when users scroll down, with smooth animations and proper content flow underneath.

**Root Cause:** Initial implementation created duplicate nav elements and used sticky positioning that clipped scrolling content. Position transitions between percentage-based (`top-1/2`) and fixed values (`top-6`) caused snapping instead of smooth animations.

**Solution:**
1. Created `SourceLogo` component combining pictogram and wordmark SVGs with light/dark mode support via CSS invert filters.
2. Built `MainHeader` with mega menu navigation structure, newsletter subscribe form, and theme toggle.
3. Implemented scroll detection using ScrollArea viewport element to trigger floating state at 120px threshold.
4. Refactored to single nav element using fixed positioning with transform-based vertical movement for smooth transitions.
5. Applied conditional styling for rounded background, border, padding, and shadow that animate with `transition-all duration-300 ease-out`.
6. Changed header from sticky to fixed with `h-0` when floating to prevent content clipping.

**Files Modified:**
- `src/components/source-logo.tsx` (new)
- `src/components/main-header.tsx` (new)
- `src/components/ui/scroll-area.tsx`
- `src/app/layout.tsx`

**Outcome:** Header smoothly transitions between full-width bar and floating navigation island on scroll, with logo/subscribe form fading out while nav links morph into a centered rounded pill. Content scrolls freely underneath without clipping, and all animations use consistent easing for a polished user experience.

## 2025-10-17 - Gradient play icons and solution layout polish

**Problem:** Video placeholders across sections lacked consistent interactive affordances, solution lists were unstyled, and the CAST/Problem Set descriptions didn't match updated copy.

**Root Cause:** Play icons were only plain placeholders without hover states or consistent sizing, some sections reused generic lists without distinct cards, and marketing copy updates hadn't been propagated.

**Solution:**
1. Added grayscale solution cards with hover-ready play icons across Problem Set, Solutions, and Architecture video frames.
2. Centralized `solution-card` and `video-play-icon` styles in `src/app/globals.css`, including gradient fill, sizing (20% height), and hover transitions without strokes.
3. Updated `public/icons/play.svg` to a fill-only triangle and refreshed hero/problem copy in `src/app/page.tsx`.

**Files Modified:**
- `src/app/page.tsx`
- `src/app/globals.css`
- `public/icons/play.svg`

**Outcome:** All video frames now reveal a gradient play affordance on hover, solution content follows a consistent card design, and copy aligns with the decentralized SOURCE messaging.

## 2025-10-17 - Agent documentation, video styling, and description text refinements

**Problem:** The codebase lacked standardized agent tooling documentation, video placeholders had inconsistent styling across light/dark themes, and description text throughout the site needed improved typography and layout consistency.

**Root Cause:** No AGENTS.md file existed for coding tools, video frames used dark-only styling that didn't adapt well to light mode, and description paragraphs used inconsistent styling classes that were difficult to maintain.

**Solution:**
1. Created comprehensive AGENTS.md file with build commands, architecture overview, and code style guidelines for agentic coding tools.
2. Updated video frame styling to use very light gray backgrounds in light mode and darker gray in dark mode.
3. Consolidated description text styling into a single `.description-text` CSS class with larger, semi-bold typography.
4. Reduced description paragraph width by 33% in the Solutions section for better visual balance.

**Files Modified:**
- `AGENTS.md`
- `src/app/globals.css`
- `src/app/page.tsx`

**Outcome:** Agentic coding tools now have comprehensive project documentation, video placeholders have improved theme-aware styling, and description text throughout the site features consistent, prominent typography with optimized layout spacing.

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
