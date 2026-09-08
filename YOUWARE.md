# One Piece Portfolio — Pirate King's Domain 🏴‍☠️

A fully animated, 3D-powered portfolio website themed around One Piece. Built with React, Three.js, GSAP, and Framer Motion.

## Project Status

- **Project Type**: React + TypeScript + Three.js 3D Portfolio
- **Theme**: One Piece (anime) — Pirate King aesthetic
- **Entry Point**: `src/main.tsx`
- **Build System**: Vite 7.0.0
- **Styling**: Tailwind CSS 3.4.17 + Custom CSS animations
- **3D Engine**: Three.js via @react-three/fiber + @react-three/drei
- **Animations**: GSAP (ScrollTrigger) + Framer Motion

## Key Features

### 3D Scenes
- **Hero Section**: Full 3D ocean with animated waves, Going Merry ship floating, Devil Fruits orbiting, sea foam particles, star field, and mouse-reactive camera
- **Custom 3D ship**: Hand-modeled Going Merry with hull, deck, mast, sail, and Jolly Roger flag

### Animations
- **GSAP ScrollTrigger**: Parallax effects on all sections
- **Framer Motion**: Page transitions, hover effects, scroll reveals, 3D card flips
- **CSS Keyframe Animations**: Floating devil fruits, pirate flag wave, compass spin, shimmer text effects, ocean flow, star twinkle, smoke trails
- **Loading Screen**: Animated straw hat assembly with particle burst

### Sections
1. **Navigation**: Log Pose compass-style with animated active states, mobile hamburger menu with spring animations, side dot indicators
2. **Hero**: 3D Three.js scene (ocean + ship + particles), pirate title with golden shimmer, scroll indicator
3. **About**: Wanted poster character card with count-up bounty stats, personality trait badges, animated progress bars
4. **Skills**: 8 bounty cards with 3D flip animation revealing Devil Fruit powers, progress bars, classification system
5. **Projects**: 6 island-themed project cards with scroll parallax, tech stack badges, progress tracker
6. **Contact**: Wanted poster styled form, Den Den Mushi theme, social links with glow effects
7. **Footer**: Animated Jolly Roger, Luffy quote, swords divider

### Design System
- **Colors**: One Piece palette (Red, Gold, Ocean Blue, Cream, Parchment)
- **Fonts**: Pirata One (pirate text), Uncial Antiqua (medieval), Cinzel Decorative (display), Playfair Display (quotes), Inter (body)
- **Custom cursor**: Golden compass dot
- **Glass morphism**: Dark glass and gold glass components
- **Custom scrollbar**: Gold-to-red gradient

## Directory Structure

```
src/
├── App.tsx                    # Main app with GSAP ScrollTrigger setup
├── main.tsx                   # Entry point
├── index.css                  # Global styles, animations, utilities
├── components/
│   ├── Navigation.tsx         # Log Pose compass navigation
│   ├── Hero.tsx               # 3D Three.js ocean scene + hero content
│   ├── About.tsx              # Wanted poster + bio + stats
│   ├── Skills.tsx             # Bounty cards with 3D flip
│   ├── Projects.tsx           # Island gallery with parallax
│   ├── Contact.tsx            # Wanted poster form
│   ├── Footer.tsx             # Jolly Roger footer
│   └── LoadingScreen.tsx      # Animated loading screen
```

## Dependencies

### Runtime
- react, react-dom (18.x)
- three, @react-three/fiber (8.x), @react-three/drei (9.x)
- gsap (3.x) with ScrollTrigger
- framer-motion (11.x)
- zustand, lucide-react, clsx

### Build
- vite 7.x
- typescript 5.x
- tailwindcss 3.x
- @types/three

## Build Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
